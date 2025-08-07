import { Entity as mcEntity } from "@minecraft/server";
import { Specialist } from "../../ZxraLib/module";

class Reaper {
  static reap(sp: Specialist, callback: Function): void {
    const area = sp.getEntityFromDistanceCone(4);

    const rune = sp.rune.getRuneStat();

    area.forEach((e: mcEntity) => {
      try {
        callback?.(e, (finalHealAmount: number): void => {
          sp.heal(finalHealAmount * (rune.healingEffectivity || 1));
        });
      } catch (error: { message: string } | any) {
        console.warn("[System] Error on trait Reaper: " + error.message);
      }
    });
  }
}

export { Reaper };
