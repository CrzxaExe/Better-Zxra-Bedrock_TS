import { EntityDieAfterEvent, EntityHitBlockAfterEvent, EntityHurtAfterEvent, Player, world } from "@minecraft/server";
import { damageColor, Terra } from "../ZxraLib/module";

// Entity Killed event
world.afterEvents.entityDie.subscribe(
  ({ damageSource: { cause, damagingEntity, damagingProjectile }, deadEntity }: EntityDieAfterEvent) => {
    if (deadEntity instanceof Player) {
    }
  }
);

// Entity Hit event
world.afterEvents.entityHitEntity.subscribe(() => {}, {
  entityTypes: ["minecraft:player"],
});

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
    console.warn(error);
  }
});

world.afterEvents.entityHitBlock.subscribe(({ hitBlock }: EntityHitBlockAfterEvent) => {
  console.warn(hitBlock.typeId);
});
