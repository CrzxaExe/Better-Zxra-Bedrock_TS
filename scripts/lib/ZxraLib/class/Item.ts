import { ItemDurabilityComponent, ItemStack } from "@minecraft/server";
import { WeaponTypes } from "../module";

interface Item {
  itemStack: ItemStack;
}

/**
 * Item class, to control item behavior
 */
class Item {
  constructor(item: ItemStack) {
    if (!item) throw new Error("Missing item");
    this.itemStack = item;
  }

  /**
   * Get item durability
   *
   * @returns ItemDurabilityComponent | undefined
   */
  getDurability(): ItemDurabilityComponent | undefined {
    return this.itemStack.getComponent("durability");
  }

  /**
   * Get item tags
   *
   * @returns string[]
   */
  getTags(): string[] {
    return this.itemStack.getTags();
  }

  /**
   * Get item tier
   * @returns number
   */
  getTier(): number {
    return Math.max(
      ...this.getTags()
        .filter((e) => e.startsWith("tier_"))
        .map((e) => parseInt(e.replace("tier_", "")))
    );
  }

  /**
   * Get weapon type
   *
   * @returns string | undefined
   */
  getWeaponType(): string | undefined {
    return this.getTags().find((e) => Object.values(WeaponTypes).includes(e as WeaponTypes));
  }
}

export { Item };
