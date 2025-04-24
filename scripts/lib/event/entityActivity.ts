import { world } from "@minecraft/server";

world.afterEvents.entitySpawn.subscribe(() => {});

world.afterEvents.entityRemove.subscribe(() => {});
