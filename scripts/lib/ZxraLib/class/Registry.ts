import { BlockCustomComponent, ItemCustomComponent } from "@minecraft/server";
import { BlockRegisterData, ItemRegisterData } from "../module";

/**
 * Utility class to store block registers
 */
class BlockRegister {
  /**
   * Array of register data
   */
  static register: BlockRegisterData[] = [];

  /**
   * Add new register
   *
   * @param name name of block
   * @param callback function when block register are triggers
   */
  static add(name: string, callback: BlockCustomComponent): void {
    this.register.push({ name, callback });
  }
}

/**
 * Utility class to store item registers
 */
class ItemRegister {
  /**
   * Array of registers data
   */
  static register: ItemRegisterData[] = [];

  /**
   * Add new registers
   *
   * @param name bame of item
   * @param callback function when item registers are triggers
   */
  static add(name: string, callback: ItemCustomComponent): void {
    this.register.push({ name, callback });
  }
}

export { BlockRegister, ItemRegister };
