import { Entity as mcEntity } from "@minecraft/server";
import { Specialist } from "../../ZxraLib/module";

class Reaper {
  static reap(sp: Specialist, heal: number = 1, callback: Function): void {
    const area = sp.getEntityFromDistanceCone(3, 60);

    const rune = sp.rune.getRuneStat();

    area.forEach((e: mcEntity) => {
      try {
        callback?.(e);
        sp.heal(heal * (rune.healingEffectivity || 1));
      } catch (error: { message: string } | any) {
        console.warn("[System] Error on trait Reaper: " + error.message);
      }
    });
  }
}

export { Reaper };
