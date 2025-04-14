import { Dimension, Player, system, world } from "@minecraft/server";
import { PlayerFinder, settings, WorldData } from "../module";

class Terra {
  // World data cache
  static world: WorldData = {};

  // World Property Methods
  static getWorldProperty(): WorldData | Object | undefined {
    try {
      system.run(() => {
        const result = world.getDynamicProperty("world") || JSON.stringify(settings);
        return JSON.parse(typeof result === "string" ? result : JSON.stringify(settings));
      });
    } catch (err: Error | any) {
      console.warn(err.message);
      return;
    }
  }
  static setWorldProperty(): void {
    if (!this.world) throw new Error("Invalid Terra world data");
    if (typeof this.world !== "object" && !Array.isArray(this.world)) throw new Error("World data must be object");

    try {
      system.run(() => world.setDynamicProperty("world", JSON.stringify(this.world)));
    } catch (error: { message: string } | any) {
      throw new Error("Error on save data: " + error.message);
    }
  }

  // World Data methods
  static getWorldData(): WorldData {
    return this.world;
  }
  static setWorldData(data: WorldData): void {
    this.world = data;
  }

  // World Other methods
  static getActiveDimension(): Array<Dimension> {
    const dimension: Array<Dimension> = this.players.reduce((all: Array<Dimension>, cur: Player) => {
      if ([...all.map((e) => e.id)].includes(cur.dimension.id)) {
        all.push(cur.dimension);
      }
      return all;
    }, []);

    return dimension;
  }

  // Player data cache
  static players: Array<Player> = [];

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

    const index = this.players.findIndex((e) => e.id === id);

    if (index === -1) return;

    return this.players.splice(index, 1);
  }

  static setPlayer(players: Array<Player> | undefined): void {
    if (!players) throw new Error("Missing players");

    this.players = players;
  }

  static specialist = [];
}

export { Terra };
