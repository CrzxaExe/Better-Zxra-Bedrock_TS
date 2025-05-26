import { Dimension, Player, system, world, Entity as mcEntity, CustomCommandRegistry } from "@minecraft/server";
import {
  BossChallengeData,
  Command,
  CommandData,
  CreateObject,
  Entity,
  EntityData,
  Guild,
  GuildData,
  Leaderboard,
  LeaderboardData,
  PityPlayer,
  PlayerFinder,
  settings,
  Specialist,
  SpecialistData,
  StoryData,
  WeaponComponent,
  WeaponComponentDataValue,
  WorldData,
} from "../module";

class Terra {
  // World data cache
  static world: WorldData = {};

  // Property Methods
  static getProperty(namespace: string = "world", def: Object = {}): any {
    let result = def;
    try {
      system.run(() => {
        result = world.getDynamicProperty(namespace) || JSON.stringify(def);
      });
    } catch (err: Error | any) {
      console.warn(err.message);
      return;
    }

    return result;
  }
  static setProperty(namespace: string = "world", data: any): void {
    if (!namespace || !data) throw new Error("Missing namespace or data");

    try {
      system.run(() => world.setDynamicProperty(namespace, JSON.stringify(data)));
    } catch (error: { message: string } | any) {
      throw new Error("Error on save data: " + error.message);
    }
  }

  static setup(): void {
    this.world.guilds = this.getProperty("guild", []);
    this.world.leaderboards = this.getProperty("leaderboard", CreateObject.createLeaderboard());
    this.world.setting = this.getProperty("setting", settings);
    this.world.redeem = this.getProperty("redeem", []);
    this.entities = this.getProperty("entities", []);
    this.pityPlayer = this.getProperty("pity", []);

    this.guild = new Guild();
    this.leaderboard = new Leaderboard();

    system.run(() => this.setPlayer(world.getAllPlayers()));
    this.createSpecialistCache();
  }
  static setupCommand(registry: CustomCommandRegistry): void {
    const cmd = Command.Cmd;

    console.warn(`[System] Load ${cmd.length} custom commands`);
    cmd.forEach((e: CommandData) => registry.registerCommand(e.config, e.callback));
  }
  static save(isEnable: boolean = true): void {
    console.warn("[System] Saving data");

    if (!isEnable) return;
    this.setProperty("guild", this.world.guilds);
    this.setProperty("leaderboard", this.world.leaderboards);
    this.setProperty("setting", this.world.setting);
    this.setProperty("redeem", this.world.redeem);
    this.setProperty("entities", this.entities);
    this.setProperty("pity", this.pityPlayer);
  }

  // World Data methods
  static getWorldData(): WorldData {
    return this.world;
  }
  static setWorldData(data: WorldData): void {
    this.world = data;
  }

  // World Other methods
  static getActiveDimension(): Dimension[] {
    const dimension: Dimension[] = this.players.reduce((all: Dimension[], cur: Player) => {
      if ([...all.map((e) => e.id)].includes(cur.dimension.id)) {
        all.push(cur.dimension);
      }
      return all;
    }, []);

    return dimension;
  }

  // Player data cache
  static players: Player[] = [];

  // Player Methods with World
  static getWorldPlayerByName(name: string): Player[] | undefined {
    if (!name) throw new Error("Missing name");

    return world.getPlayers({ name });
  }
  static getWorldPlayerById(id: string): Player | undefined {
    if (!id) throw new Error("Missing id");

    const players = world.getAllPlayers();
    return players.find((e) => e.id === id);
  }

  // Player Methods
  static getPlayer(finder: PlayerFinder | undefined): Player[] | Player | undefined {
    if (!finder) {
      return this.players;
    }

    const key = Object.keys(finder)[0] as keyof PlayerFinder;
    return this.players.find((e) => e[key] === finder[key]);
  }

  static addPlayer(player: Player | undefined): void {
    if (!player) throw new Error("Missing player");

    const find = this.players.find((e) => e.id === player.id);
    if (find) return;

    this.players.push(player);
  }

  static delPlayer(id: string | undefined): Player[] | void {
    if (!id) throw new Error("Missing id");
    const find = this.players.findIndex((e) => e.id === id);

    if (find === -1) return;
    return this.players.splice(find, 1);
  }

  static setPlayer(players: Player[] | undefined): void {
    if (!players) throw new Error("Missing players");

    this.players = players;
  }

  // Specialist data cache
  static specialist: SpecialistData[] = [];
  static specialistCache: Specialist[] = [];

  static createSpecialistCache(): void {
    this.specialistCache = this.players.map((player: Player) => new Specialist(player));
  }
  static getSpecialistCache(player: Player): Specialist {
    const sp = this.specialistCache.find((e) => e.id === player.id);

    if (!sp) {
      this.createSpecialistCache();
      return new Specialist(player);
    }

    return sp;
  }

  static addSpecialist(data: SpecialistData): void {
    if (!data) throw new Error("Missing data");
    this.specialist.push(data);
  }
  static getSpecialist(id: string): SpecialistData | undefined {
    return this.specialist.find((e) => e.id === id);
  }
  static setSpecialist(newData: SpecialistData): void {
    if (!newData) throw new Error("Missing data");

    const data = this.specialist,
      find = data.findIndex((e) => e.id === newData.id);

    if (find === -1) {
      data.push(newData);
      return;
    }
    data[find] = newData;
  }
  static remSpecialist(id: string): SpecialistData[] | SpecialistData | undefined {
    if (!id) throw new Error("Missing id");
    const find = this.specialist.findIndex((e) => e.id === id);

    if (find === -1) return;
    return this.specialist.splice(find, 1);
  }

  // Entity data cache
  static entities: EntityData[] = [];
  static entitiCaches: Entity[] = [];

  static addDataEntity(data: EntityData): void {
    if (!data) throw new Error("Missing data");
    this.entities.push(data);
  }
  static getDataEntity(id: string): EntityData | undefined {
    return this.entities.find((e) => e.id === id);
  }
  static setDataEntity(id: string, data: EntityData): void {
    if (!id || !data) throw new Error("Missing on id or data");

    const find = this.entities.findIndex((e) => e.id === id);
    if (find === -1) {
      this.addDataEntity(data);
      return;
    }

    this.entities[find] = data;
  }
  static remDataEntity(id: string): EntityData[] | EntityData | undefined {
    const find = this.entities.findIndex((e) => e.id === id);

    if (find === -1) throw new Error("Cannot found id");
    return this.entities.splice(find, 1);
  }

  // Leaderboard Instance
  static leaderboard: Leaderboard;

  static setleaderboard(data: LeaderboardData): void {
    if (!data) throw new Error("Missing data");

    this.world.leaderboards = data;
  }

  // Guild instance
  static guild: Guild;

  static setDataGuild(data: GuildData[]): void {
    if (!data) throw new Error("Missing data");

    this.world.guilds = data;
  }
  static getListedGuild(): string[] {
    return (
      this.world.guilds?.map((e: GuildData) => {
        return `${e.name}§r§f

${e.des}

Owner   : ${e.members.filter((r) => r.role === "superadmin")[0].name || "Idk bruh"}
Member  : ${e.members.length}/${e.maxMember}`;
      }) || []
    );
  }

  static story: StoryData = {
    storyId: 0,
    progress: [],
  };

  // Pity methods
  static pityPlayer: PityPlayer[] = [];

  static getPityPlayer(player: Player): PityPlayer {
    if (!player) return CreateObject.createPity(player);
    return this.pityPlayer.find((e) => e.id === player.id) || CreateObject.createPity(player);
  }
  static setPityPlayer(player: Player, newData: PityPlayer): void {
    if (!player) throw new Error("Missing player");
    if (!newData) throw new Error("Missing new data");

    const find = this.pityPlayer.findIndex((e) => e.id === player.id);
    if (find === -1) {
      this.pityPlayer.push(newData);
      return;
    }

    this.pityPlayer[find] = newData;
  }

  // Weapon Global data cache
  static weaponComponent: WeaponComponent[] = [];

  static getPlayerWeaponComponent(id: string): WeaponComponent {
    if (id === "") throw new Error("Missing id");

    const data = this.weaponComponent.find((e) => e.id === id);

    return data || CreateObject.createWeaponComponent(id);
  }
  static setPlayerWeaponComponent(id: string, data: WeaponComponent): void {
    if (id === "") throw new Error("Missing id");
    if (!data) throw new Error("Missing data");

    const find = this.weaponComponent.findIndex((e) => e.id === id);

    if (find === -1) {
      this.weaponComponent.push(data);
      return;
    }

    this.weaponComponent.splice(find, 1, data);
  }

  static addPlayerWpnComponent(
    id: string,
    key: string,
    amount: number = 1,
    data: WeaponComponent = this.getPlayerWeaponComponent(id)
  ): void {
    if (id === "" || key === "") throw new Error("Missing id or key");

    const find = data.components.findIndex((e) => e.name === key);

    if (find === -1) {
      data.components.push({ name: key, value: amount });
    } else {
      if (typeof data.components[find].value !== "number") return;
      data.components[find].value += amount;
    }

    this.setPlayerWeaponComponent(id, data);
  }
  static setPlayerWpnComponent(
    id: string,
    key: string,
    value: WeaponComponentDataValue,
    data: WeaponComponent = this.getPlayerWeaponComponent(id)
  ): void {
    if (id === "") throw new Error("Missing id");

    const find = data.components.findIndex((e) => e.name === key);

    if (find === -1) {
      data.components.push({ name: key, value });
    } else {
      switch (typeof data.components[find].value) {
        case "string":
          if (typeof value !== "string") throw new Error("Type data component value are not match");
          data.components[find].value = value;
          break;
        case "object":
          if (typeof value !== "object") throw new Error("Type data component value are not match");
          data.components[find].value = value;
          break;
        case "number":
          if (typeof value !== "number") throw new Error("Type data component value are not match");
          data.components[find].value = value;
          break;
        case "boolean":
          if (typeof value !== "boolean") throw new Error("Type data component value are not match");
          if (typeof value !== "boolean") throw new Error("Type data value are not match");
          data.components[find].value = value;
          break;
      }
    }

    this.setPlayerWeaponComponent(id, data);
  }

  // Boss challanges cache
  static bossChallenge: BossChallengeData | undefined;

  static setBossChallenge(boss: mcEntity): void {
    if (!boss) throw new Error("Missing boss");

    this.bossChallenge = CreateObject.createBossChallenge(boss);
  }
  static resetBossChallenge(): void {
    this.bossChallenge = undefined;
  }
  static addParticipantBossChallenge(
    player: Player,
    damage: number = 1,
    data: BossChallengeData | undefined = this.bossChallenge
  ): void {
    if (!player || !data) throw new Error("Missing player or there is no data");

    const find = data.participants.findIndex((e) => e.player.id === player.id);

    if (find === -1) {
      data.participants.push({ player, damage });
    } else {
      data.participants[find].damage += damage;
    }

    this.bossChallenge = data;
  }

  // Wave challange cache
  static waveChallenge = {};
}

export { Terra };
