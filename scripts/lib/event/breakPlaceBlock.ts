import { PlayerBreakBlockAfterEvent, world } from "@minecraft/server";
import { Quest, Terra } from "../ZxraLib/module";

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
    sp.minStamina(Terra.world.setting?.staminaAction || 3);

    const quest = new Quest(player);

    quest.controller({ act: "destroy", target: block, amount: 1 });
  }
);
world.beforeEvents.playerBreakBlock.subscribe((e) => {});

world.afterEvents.playerPlaceBlock.subscribe((e) => {});
world.beforeEvents.playerPlaceBlock.subscribe((e) => {});
