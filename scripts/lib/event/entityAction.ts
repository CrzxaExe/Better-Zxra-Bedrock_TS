import { EntityDieAfterEvent, EntityHitBlockAfterEvent, EntityHurtAfterEvent, Player, world } from "@minecraft/server";
import { damageColor, Formater, Terra } from "../ZxraLib/module";

// Entity Killed event
world.afterEvents.entityDie.subscribe(
  ({ damageSource: { cause, damagingEntity, damagingProjectile }, deadEntity }: EntityDieAfterEvent) => {
    try {
      if (deadEntity instanceof Player) {
        if (Terra.world.setting?.deathLocation)
          deadEntity.sendMessage({
            translate: "system.youDie",
            with: [`§2${Formater.formatVector3(deadEntity.location)}§r§f`],
          });

        const sp = Terra.getSpecialistCache(deadEntity);

        sp.setToMaxThirst();
        sp.resetToMaxStamina();
      }
    } catch (error: { message: string } | any) {
      console.warn("[System] Error on Event EntityDie: " + error.message);
    }
  }
);

// Entity Hit event
world.afterEvents.entityHitEntity.subscribe(
  ({ damagingEntity, hitEntity }) => {
    console.warn(damagingEntity.typeId, hitEntity.typeId);
  },
  {
    entityTypes: ["minecraft:player"],
  }
);

// Entity Hurt event
world.afterEvents.entityHurt.subscribe(() => {}, {
  entityTypes: ["minecraft:player"],
});

world.afterEvents.entityHurt.subscribe(({ hurtEntity, damage, damageSource: { cause } }: EntityHurtAfterEvent) => {
  if (!Terra.world.setting?.damageIndicator) return;

  try {
    const indicator = hurtEntity.dimension.spawnEntity("cz:indicator", {
      ...hurtEntity.location,
    });

    indicator.nameTag = `${cause in damageColor ? damageColor[cause as keyof typeof damageColor] : ""}${damage.toFixed(
      0
    )}`;
  } catch (error: { message: string } | any) {
    if (!Terra.world.setting?.debug) return;
    console.warn("[System] Error on EventHurt: " + error.message);
  }
});

world.afterEvents.entityHitBlock.subscribe(({ hitBlock }: EntityHitBlockAfterEvent) => {
  console.warn(hitBlock.typeId);
});
