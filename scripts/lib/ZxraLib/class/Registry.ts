import { BlockCustomComponent } from "@minecraft/server";
import { BlockRegisterData } from "../module";

class BlockRegister {
  static register: BlockRegisterData[] = [];

  static add(name: string, callback: BlockCustomComponent) {
    this.register.push({ name, callback });
  }
}

class ItemRegister {
  static register = [];
}

export { BlockRegister, ItemRegister };
