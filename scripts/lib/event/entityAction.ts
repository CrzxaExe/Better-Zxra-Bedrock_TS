import { EntityDieAfterEvent, world } from "@minecraft/server";

// Entity Killed event
world.afterEvents.entityDie.subscribe(
  ({ damageSource: { cause, damagingEntity, damagingProjectile }, deadEntity }: EntityDieAfterEvent) => {}
);

// Entity Hit event
world.afterEvents.entityHitEntity.subscribe(() => {});

// Entity Hurt event
world.afterEvents.entityHurt.subscribe(() => {});
