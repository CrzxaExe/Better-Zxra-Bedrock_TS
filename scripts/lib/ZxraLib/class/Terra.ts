import { Player, world } from "@minecraft/server";
import { PlayerFinder, WorldData } from "../module";

class Terra {
  // World data cache
  static world: WorldData = {};

  // World Property Methods
  static getWorldProperty(): WorldData | Object | undefined {
    const result = world.getDynamicProperty("world") || "{}";
    return JSON.parse(typeof result === "string" ? result : "{}");
  }
  static setWorldProperty(): void {
    if (!this.world) throw new Error("Invalid Terra world data");
    if (typeof this.world !== "object" && !Array.isArray(this.world)) throw new Error("World data must be object");

    try {
      world.setDynamicProperty("world", JSON.stringify(this.world));
    } catch (error: { message: string } | any) {
      throw new Error("Error on save data: " + error.message);
    }
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
