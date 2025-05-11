import { ItemDurabilityComponent, ItemStack } from "@minecraft/server";
import { WeaponTypes } from "../module";

interface Item {
  itemStack: ItemStack;
}

class Item {
  constructor(item: ItemStack) {
    if (!item) throw new Error("Missing item");

    this.itemStack = item;
  }

  getDurability(): ItemDurabilityComponent | undefined {
    return this.itemStack.getComponent("durability");
  }

  getTags(): string[] {
    return this.itemStack.getTags();
  }

  getTier(): number {
    return Math.max(
      ...this.getTags()
        .filter((e) => e.startsWith("tier_"))
        .map((e) => parseInt(e.replace("tier_", "")))
    );
  }

  getWeaponType(): string | undefined {
    return this.getTags().find((e) => Object.values(WeaponTypes).includes(e as WeaponTypes));
  }
}

export { Item };
