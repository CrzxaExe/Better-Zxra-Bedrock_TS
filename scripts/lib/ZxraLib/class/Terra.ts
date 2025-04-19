import { Dimension, Player, system, world } from "@minecraft/server";
import {
  Entity,
  EntityData,
  Guild,
  GuildData,
  Leaderboard,
  PlayerFinder,
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
  static setProperty(namespace: string = "world", data: EntityData[] | WorldData): void {
    if (!namespace || !data) throw new Error("Missing namespace or data");

    try {
      system.run(() => world.setDynamicProperty(namespace, JSON.stringify(data)));
    } catch (error: { message: string } | any) {
      throw new Error("Error on save data: " + error.message);
    }
  }

  static setup(): void {
    this.world.setting = this.getProperty("setting", settings);
    this.world.redeem = this.getProperty("redeem", []);
    this.entities = this.getProperty("entities", []);
    this.leaderboard = this.getProperty("leaderboard", { chat: {}, deaths: {}, kills: {} });
    this.guild = this.getProperty("guild", []);

    system.run(() => this.setPlayer(world.getAllPlayers()));
  }
  static save(): void {
    console.warn("saving");
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
  static getPlayer(finder: PlayerFinder | undefined) {
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

  static addSpecialist(data: SpecialistData): void {
    if (!data) throw new Error("Missing data");
    this.specialist.push(data);
  }
  static getSpecialist(id: string): SpecialistData | undefined {
    return this.specialist.find((e) => e.id === id);
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

  static leaderboard = new Leaderboard(this);

  // Guild instance
  static guild = new Guild();

  static setDataGuild(data: GuildData[]): void {
    if (!data) throw new Error("Missing data");

    this.world.guilds = data;
  }
}

export { Terra };
