import { Container, Player } from "@minecraft/server";
import { Entity, Terra, Cooldown } from "../module";

interface Specialist {
  container: Container;
  cooldown: Cooldown;
}

class Specialist extends Entity {
  constructor(player: Player) {
    if (!player) throw new Error("Missing player");

    super(player);
    this.container = this.source.getComponent("inventory");
    this.cooldown = new Cooldown(this);
  }

  // Controller
  controllerUI(): void {
    this.source.onScreenDisplay.setTitle(
      `cz:ui ${this.source.name}

AP ${Terra.players.length}
${this.source.getBlockFromViewDirection({ maxDistance: 6 })?.block?.type.id || "minecraft:air"}`,
      { fadeInDuration: 0, fadeOutDuration: 0, stayDuration: 0 }
    );
  }
}

export { Specialist };
