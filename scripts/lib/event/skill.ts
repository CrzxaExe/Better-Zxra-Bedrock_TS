import { ItemReleaseUseAfterEvent, world } from "@minecraft/server";

import "../weapon/unique";
import { Specialist, Weapon } from "../ZxraLib/module";

world.afterEvents.itemReleaseUse.subscribe(async ({ itemStack, source, useDuration }: ItemReleaseUseAfterEvent) => {
  try {
    const skill = Weapon.getSkill(itemStack?.typeId.split(":")[1]);

    if (!skill) return;
    skill.callback(source, {
      sp: new Specialist(source),
      useDuration: useDuration / 20,
    });
  } catch (error: { message: string } | any) {
    console.warn(error.message);
  }
});
