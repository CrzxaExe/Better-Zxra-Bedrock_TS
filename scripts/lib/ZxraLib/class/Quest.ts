import { Player } from "@minecraft/server";
import { QuestConst, QuestData } from "../module";

interface Quest {
  in: QuestConst;
}

class Quest {
  constructor(player: Player) {
    if (!player) throw new Error("Missing player");

    this.in = {
      player,
    };
  }

  // Quest method
  getQuest(index: number): QuestData | undefined {
    return;
  }
}

export { Quest };
