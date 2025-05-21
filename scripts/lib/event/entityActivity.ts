import { EntityRemoveAfterEvent, EntitySpawnAfterEvent, world } from "@minecraft/server";
import { CreateObject, Terra } from "../ZxraLib/module";

world.afterEvents.entitySpawn.subscribe(({ cause, entity }: EntitySpawnAfterEvent) => {
  Terra.addDataEntity(CreateObject.createEntity(entity));
});

world.afterEvents.entityRemove.subscribe(({ removedEntityId, typeId }: EntityRemoveAfterEvent) => {
  Terra.remDataEntity(removedEntityId);
});
