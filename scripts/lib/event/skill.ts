import { ItemReleaseUseAfterEvent, world } from "@minecraft/server";

import "../weapon/unique";
import { CreateObject, Terra, Weapon } from "../ZxraLib/module";

world.afterEvents.itemReleaseUse.subscribe(async ({ itemStack, source, useDuration }: ItemReleaseUseAfterEvent) => {
  try {
    const skill = Weapon.getSkill(itemStack?.typeId.split(":")[1]);

    const sp = Terra.getSpecialistCache(source),
      vel = source.getVelocity();

    sp.cooldown.addCd("stamina_regen", Terra.world.setting?.staminaAction || 3);

    if (!skill) return;
    skill.callback(source, {
      sp,
      vel,
      velocity: CreateObject.createVelocityPlayer(source, vel),
      useDuration: useDuration / 20,
    });
  } catch (error: { message: string } | any) {
    console.warn("[System] Error on Event ItemReleaseuse" + error.message);
  }
});
