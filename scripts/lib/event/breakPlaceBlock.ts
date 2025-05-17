import { PlayerBreakBlockAfterEvent, world } from "@minecraft/server";
import { Terra } from "../ZxraLib/module";

world.afterEvents.playerBreakBlock.subscribe(
  ({
    block,
    brokenBlockPermutation,
    dimension,
    player,
    itemStackAfterBreak,
    itemStackBeforeBreak,
  }: PlayerBreakBlockAfterEvent) => {
    const sp = Terra.getSpecialistCache(player);

    sp.minThirst(0.6);
  }
);
world.beforeEvents.playerBreakBlock.subscribe((e) => {});

world.afterEvents.playerPlaceBlock.subscribe((e) => {});
world.beforeEvents.playerPlaceBlock.subscribe((e) => {});
