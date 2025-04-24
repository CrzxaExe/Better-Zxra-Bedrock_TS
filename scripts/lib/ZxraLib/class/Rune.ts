import { Player } from "@minecraft/server";
import { defaultRuneStat, Entity, RuneStats, Specialist } from "../module";

interface Rune {
  sp: Specialist;
}

class Rune {
  constructor(sp: Specialist) {
    if (!sp) throw new Error("Missing Entity");

    this.sp = sp;
  }

  getRuneStat(): RuneStats {
    const data = defaultRuneStat;
    return data;
  }
}

export { Rune };
