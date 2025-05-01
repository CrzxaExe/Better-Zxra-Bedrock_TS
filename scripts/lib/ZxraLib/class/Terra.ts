import { Dimension, Player, system, world } from "@minecraft/server";
import {
  Entity,
  EntityData,
  Guild,
  GuildData,
  Leaderboard,
  PlayerFinder,
  QuestConst,
  settings,
  Specialist,
  SpecialistData,
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
    this.world.leaderboards = this.getProperty("leaderboard", { chat: {}, deaths: {}, kills: {} });
    this.world.setting = this.getProperty("setting", settings);
    this.world.redeem = this.getProperty("redeem", []);
    this.entities = this.getProperty("entities", []);

    this.guild = new Guild();
    this.leaderboard = new Leaderboard();

    system.run(() => this.setPlayer(world.getAllPlayers()));
    this.createSpecialistCache();
  }
  static save(isEnable: boolean = true): void {
    console.warn("[System] Saving data");

    if (!isEnable) return;
    this.setProperty("guild", this.world.guilds);
    this.setProperty("leaderboard", this.world.leaderboards);
    this.setProperty("setting", this.world.setting);
    this.setProperty("redeem", this.world.redeem);
    this.setProperty("entities", this.entities);
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
  static getSpecialistCache(id: string): Specialist | undefined {
    return (
      this.specialistCache.find((e) => e.id === id) ||
      (() => {
        const player = world.getAllPlayers().find((e) => e.id === id);
        if (!player) throw new Error(`Player with id ${id} not found`);
        return new Specialist(player);
      })()
    );
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
    if (find === -1) throw new Error("Cannot found id");

    this.entities[find] = data;
  }
  static remDataEntity(id: string): EntityData[] | EntityData | undefined {
    const find = this.entities.findIndex((e) => e.id === id);

    if (find === -1) throw new Error("Cannot found id");
    return this.entities.splice(find, 1);
  }

  static leaderboard: Leaderboard;

  // Guild instance
  static guild: Guild;

  static setDataGuild(data: GuildData[]): void {
    if (!data) throw new Error("Missing data");

    this.world.guilds = data;
  }

  static quest: QuestConst[] = [];
}

export { Terra };
