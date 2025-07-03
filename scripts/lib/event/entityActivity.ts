import {
  EntityRemoveAfterEvent,
  EntitySpawnAfterEvent,
  ItemCompleteUseAfterEvent,
  ItemStartUseOnAfterEvent,
  ItemUseAfterEvent,
  world,
} from "@minecraft/server";
import { CreateObject, SpecialItem, Terra } from "../ZxraLib/module";

world.afterEvents.entitySpawn.subscribe(({ cause, entity }: EntitySpawnAfterEvent) => {
  Terra.addDataEntity(CreateObject.createEntity(entity));
});

world.afterEvents.entityRemove.subscribe(({ removedEntityId, typeId }: EntityRemoveAfterEvent) => {
  Terra.remDataEntity(removedEntityId);
});

world.afterEvents.itemStartUseOn.subscribe(({ block, blockFace, source, itemStack }: ItemStartUseOnAfterEvent) => {
  if (!itemStack || !block) return;

  const specialItem = SpecialItem.place.find((e) => e.item === itemStack.typeId.split(":")[1]);

  if (!specialItem) return;

  try {
    specialItem.callback(source, itemStack, block);
  } catch (error: { message: string } | any) {
    if (Terra.world.setting?.debug) console.warn("[System] Error on Event ItemStartUseOn: " + error.message);
  }
});

world.afterEvents.itemUse.subscribe(({ itemStack, source }: ItemUseAfterEvent) => {
  const specialItem = SpecialItem.use.find((e) => e.item === itemStack.typeId.split(":")[1]);

  if (!specialItem) return;

  try {
    specialItem.callback(source, itemStack);
  } catch (error: { message: string } | any) {
    if (Terra.world.setting?.debug) console.warn("[System] Error on Event ItemStartUseOn: " + error.message);
  }
});

world.afterEvents.itemCompleteUse.subscribe(({ itemStack, source, useDuration }: ItemCompleteUseAfterEvent) => {
  const specialItem = SpecialItem.item.find((e) => e.item === itemStack.typeId.split(":")[1]);

  if (!specialItem) return;

  try {
    specialItem.callback(source, itemStack, useDuration);
  } catch (error: { message: string } | any) {
    if (Terra.world.setting?.debug) console.warn("[System] Error on Event ItemStartUseOn: " + error.message);
  }
});
