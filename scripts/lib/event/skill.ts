import { ItemReleaseUseAfterEvent, world } from "@minecraft/server";

import "../weapon/unique";
import { Terra, Weapon } from "../ZxraLib/module";

world.afterEvents.itemReleaseUse.subscribe(async ({ itemStack, source, useDuration }: ItemReleaseUseAfterEvent) => {
  try {
    const skill = Weapon.getSkill(itemStack?.typeId.split(":")[1]);

    if (!skill) return;
    skill.callback(source, {
      sp: Terra.getSpecialistCache(source),
      useDuration: useDuration / 20,
    });
  } catch (error: { message: string } | any) {
    console.warn("[System] Error on Event ItemReleaseuse" + error.message);
  }
});
