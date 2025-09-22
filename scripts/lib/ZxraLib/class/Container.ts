import { EnchantmentTypes, ItemStack, Player, system } from "@minecraft/server";
import { Formater } from "./Formater";

interface PlayerContainers {
  player: Player;
}

class PlayerContainers {
  constructor(player: Player) {
    this.player = player;
  }

  addItem(identifier: string, amount: number = 1, { enchant }: { enchant?: { id: string; level: number } } = {}): void {
    if (identifier === "") throw new Error("Missing identifier");

    const newItem = new ItemStack(identifier, amount);
    if (enchant && enchant.id) {
      const enchantable = newItem.getComponent("enchantable");
      const enchantType = EnchantmentTypes.get(enchant.id);
      if (!enchantType || !enchantable?.canAddEnchantment({ type: enchantType, level: enchant.level || 1 })) return;

      enchantable.addEnchantment({ type: enchantType, level: enchant.level || 1 });
    }

    const inventory = this.player.getComponent("inventory");
    if (!inventory || inventory.container.emptySlotsCount < 1) {
      this.player.dimension.spawnItem(newItem, this.player.location);
      return;
    }
    inventory.container.addItem(newItem);
  }

  countItem(identifier: string): number {
    let count = 0;

    if (identifier === "") return count;
    const inventory = this.player.getComponent("inventory");
    if (!inventory) return count;
    for (let i = 0; i < inventory.inventorySize; i++) {
      const slot = inventory.container.getSlot(i);
      if (!slot) continue;

      const item = slot.getItem();
      if (item?.typeId !== identifier) continue;

      count = +item.amount;
    }

    return count;
  }

  hasItem(identifier: string, count: number = 1): boolean {
    if (identifier === "") return false;

    return this.countItem(identifier) >= count;
  }

  minItem(identifier: string, count: number = 1): void {
    if (identifier === "") return;

    if (!this.hasItem(identifier, count)) throw new Error("Player dont have enough item");
    this.player.runCommand(`clear @s ${Formater.formatIdentifier(identifier)} 0 ${count}`);
  }
}

interface ItemContainer {
  item: ItemStack;
}
interface ItemInventory {
  item: string;
  amount: number;
}

class ItemContainer {
  constructor(item: ItemStack) {
    this.item = item;
  }

  getContainer(): ItemInventory[] {
    if (!this.item.hasTag("inventory")) return [];
    return this.item.getLore().map((e) => {
      const [amount, item] = e.split(" | ");

      return { item, amount: parseInt(amount) };
    });
  }
  setContainer(data: ItemInventory[]): void {
    system.run(() => {
      this.item.setLore(data.map((e) => `${e.amount} | ${e.item}`));
    });
  }

  // Essential methods
  addItem(items: ItemInventory | ItemInventory[]): void {
    const data = this.getContainer();
    if (Array.isArray(items)) {
      items.forEach((e) => {
        const find = data.findIndex((r) => r.item == e.item);
        if (find === -1) {
          data.push(e);
          return;
        }

        data[find].amount += e.amount;
      });
      this.setContainer(data);
      return;
    }

    if (!(items instanceof Object)) throw new Error("Items must be array or object");

    const find = data.findIndex((e) => e.item == items.item);

    if (find === -1) {
      data.push(items);
      this.setContainer(data);
      return;
    }

    data[find].amount = items.amount;
    this.setContainer(data);
  }

  removeItem(items: ItemInventory | ItemInventory[]): void {
    const data = this.getContainer();
    if (Array.isArray(items)) {
      items.forEach((e) => {
        const find = data.findIndex((r) => r.item === e.item);
        if (find === -1) return;

        if (data[find].amount < e.amount) {
          data.splice(find, 1);
          return;
        }

        data[find].amount - +e.amount;
      });
      this.setContainer(data);
      return;
    }

    if (!(items instanceof Object)) throw new Error("Items must be array or object");

    const find = data.findIndex((r) => r.item === items.item);

    if (find === -1) return;

    if (data[find].amount < items.amount) {
      data.splice(find, 1);
      this.setContainer(data);
      return;
    }

    data[find].amount -= items.amount;
    this.setContainer(data);
  }
}

class BlockContainer {}

export { BlockContainer, ItemContainer, ItemInventory, PlayerContainers };
