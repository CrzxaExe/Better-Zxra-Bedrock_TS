import { Terra } from "./Terra";

interface Leaderboard {
  terra: Terra;
}

class Leaderboard {
  constructor(terra: Terra) {
    if (!terra) throw new Error("Missing Terra");

    this.terra = terra;
  }
}

export { Leaderboard };
