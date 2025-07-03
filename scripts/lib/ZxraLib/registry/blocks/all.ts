import { Block, Dimension, Player } from "@minecraft/server";
import { BlockRegister, durabilityControl } from "../../module";

BlockRegister.add("cz:chair", {
  onPlayerInteract({ player, block, dimension }) {
    if (!player) return;

    const sit = dimension.spawnEntity("cz:seat", {
      x: block.location.x + 0.5,
      y: block.location.y + 0.52,
      z: block.location.z + 0.5,
    });

    sit.runCommand(`ride ${player.name} start_riding @s`);
  },
});

BlockRegister.add("cz:generator", {
  onPlayerInteract({ block }) {},
});

BlockRegister.add("cz:ore_xp", {
  onPlayerBreak(event) {
    const { block, player, dimension } = event;
    if (!player) return;

    let drop: number = 4;

    switch (block?.typeId.split(":")[1]) {
      case "dexterite_ore":
      case "chlorophyte_ore":
        drop = 6;
        break;
      case "ender_ore":
        drop = 8;
        break;
    }

    const itemStack = player.getComponent("inventory")?.container.getSlot(player.selectedSlotIndex)?.getItem();
    if (!itemStack) return;

    const enchantable = itemStack.getComponent("minecraft:enchantable");
    const silkTouch = enchantable?.getEnchantment("silk_touch");
    if (silkTouch) return;

    for (let i = 0; i < drop; i++) {
      dimension.spawnEntity("minecraft:xp_orb", block.location);
    }

    durabilityControl(player, 1);
  },
});
