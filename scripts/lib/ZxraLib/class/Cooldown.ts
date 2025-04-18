import { Specialist } from "./Specialist";

interface Cooldown {
  source: Specialist;
}

class Cooldown {
  constructor(player: Specialist) {
    if (!player) throw new Error("Missing player");

    this.source = player;
  }
}

export { Cooldown };
