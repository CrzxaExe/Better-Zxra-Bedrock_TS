import { Player } from "@minecraft/server";
import { Entity } from "../module";

export const runeList = {
  gold_coin: {
    // 1
    moneyDrop: 0.1,
    atk: 0.18,
  },

  silence_amulet: {
    // 2
    atk: 0.08,
    onHit(player: Player, target: any) {
      new Entity(target).status.addStatus("silence_amulet", 3, {
        type: "silence",
        decay: "time",
        lvl: 1,
        stack: false,
      });
    },
  },

  fire_emblem: {
    // 3
    fireFragile: 0.24,
    atk: 0.08,
  },

  sharpness: {
    // 4
    atkFlat: 3,
  },
};
