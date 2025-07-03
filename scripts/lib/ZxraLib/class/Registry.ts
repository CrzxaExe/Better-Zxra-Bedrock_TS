import { BlockCustomComponent, ItemCustomComponent } from "@minecraft/server";
import { BlockRegisterData, ItemRegisterData } from "../module";

class BlockRegister {
  static register: BlockRegisterData[] = [];

  static add(name: string, callback: BlockCustomComponent): void {
    this.register.push({ name, callback });
  }
}

class ItemRegister {
  static register: ItemRegisterData[] = [];

  static add(name: string, callback: ItemCustomComponent): void {
    this.register.push({ name, callback });
  }
}

export { BlockRegister, ItemRegister };
