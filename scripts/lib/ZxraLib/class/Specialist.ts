import { Player } from "@minecraft/server";
import { Entity } from "../module";

class Specialist extends Entity {
  constructor(player: Player) {
    if (!player) throw new Error("Missing player");

    super(player);
  }
}

export { Specialist };
