import { CustomCommand, CustomCommandResult } from "@minecraft/server";
import {
  CommandData,
  ItemSpecial,
  ModifierData,
  PasifData,
  PasifHit,
  PasifHited,
  PasifKill,
  Scripts,
  WeaponSkill,
} from "../module";

//  Command class

/**
 * Utility Class to store custom command function
 */
class Command {
  /**
   * Array of normal custom command to minecraft
   */
  static Cmd: Array<CommandData> = [];

  /**
   * Array of custom command
   */
  static CmdL: Array<CommandData> = [];

  /**
   * Adding normal custom command
   *
   * @param config CustomCommand, config for custom command
   * @param callback function, will execute while command has been trigger
   */
  static add(config: CustomCommand, callback: Function) {
    this.Cmd.push({ config, callback });
  }

  /**
   * Adding custom command
   *
   * @param config CustomCommand, config for custom command
   * @param callback function, will execute when command has been trigger
   */
  static addL(config: CustomCommand, callback: Function) {
    this.CmdL.push({ config, callback });
  }

  /**
   * Get normal command data by name
   *
   * @param name string, name of custom command
   * @returns CommandData | undefined
   */
  static get(name: string): CommandData | undefined {
    return this.Cmd.find((e) => e.config.name === name);
  }

  /**
   * Get command data by name
   *
   * @param name string, name of custom command
   * @returns CommandData | undefined
   */
  static getL(name: string): CommandData | undefined {
    return this.CmdL.find((e) => e.config.name === name);
  }
}

// Modifier class

/**
 * Utility class to store modifer function
 */
class Modifier {
  /**
   * Array of modifier
   */
  static mod: ModifierData[] = [];

  /**
   * Add new modifier
   *
   * @param name string, name of modifier
   * @param type string, weapon type of modifier
   * @param callback function, will be execute when modifier has been trigger
   */
  static add(name: string, type: string, callback: Function) {
    this.mod.push({ name, type, callback });
  }

  /**
   * Get modifer by type
   *
   * @param type string, name of modifier
   * @returns ModifierData | undefined
   */
  static getType(type: string): ModifierData | undefined {
    return this.mod.find((e) => e.type === type);
  }
}

// Script Class

/**
 * Utility class to store ScriptEvent
 */
class Script {
  /**
   * Array of script event
   */
  static data: Scripts[] = [];

  /**
   *
   * @param namespace string, namespace of script
   * @param callback function, will be execute when script has been trigger
   */
  static add(namespace: string, callback: Function): void {
    this.data.push({ namespace, callback });
  }

  /**
   * Get script by namespace
   *
   * @param namespace string, namespace of script
   * @returns Scripts |  undefined
   */
  static get(namespace: string): Scripts | undefined {
    return this.data.find((e) => e.namespace === namespace);
  }
}

// Special Item class

/**
 * Utility class to store special item event trigger
 */
class SpecialItem {
  /**
   * Array of special item data event for completing using item
   */
  static item: ItemSpecial[] = [];

  /**
   * Array of special item data event for use item
   */
  static use: ItemSpecial[] = [];

  /**
   * Array of special item data event for place item
   */
  static place: ItemSpecial[] = [];

  /**
   * Add completing item event
   *
   * @param item string, name of item
   * @param callback function, will be trigger when completing to use item
   */
  static addItem(item: string, callback: Function) {
    this.item.push({ item, callback });
  }

  /**
   * Add using item event
   *
   * @param item string, name of item
   * @param callback function, will be trigger when using item
   */
  static addUse(item: string, callback: Function) {
    this.use.push({ item, callback });
  }

  /**
   * Add place item event
   *
   * @param item string, name of item
   * @param callback function, will be trigger when placing item
   */
  static addPlace(item: string, callback: Function) {
    this.place.push({ item, callback });
  }

  /**
   * Get special item data of completing using item
   *
   * @param item string, name of item
   * @returns ItemSpecial
   */
  static getItem(item: string): ItemSpecial | undefined {
    return this.item.find((e) => e.item === item);
  }

  /**
   * Get special item data of using item
   *
   * @param item string, name of item
   * @returns ItemSpecial
   */
  static getUse(item: string): ItemSpecial | undefined {
    return this.use.find((e) => e.item === item);
  }

  /**
   * Get special item data of placing item
   *
   * @param item string, name of item
   * @returns ItemSpecial
   */
  static getPlace(item: string): ItemSpecial | undefined {
    return this.place.find((e) => e.item === item);
  }
}

// Weapon Class

/**
 * Utility class to store weapon skill and pasif
 */
class Weapon {
  // Weapom Skill

  /**
   * Array of skill from weapon
   */
  static Skill: WeaponSkill[] = [];

  /**
   * Register weapon skill
   *
   * @param name string, name of weapon
   * @param callback function, will be execute when weapon skill is used
   */
  static registerSkill(name: string, callback: Function): void {
    this.Skill.push({ name, callback });
  }

  /**
   * Get registered weapon skill by name
   *
   * @param name string, name of weapon
   * @returns WeaponSkill | undefined
   */
  static getSkill(name: string | undefined): WeaponSkill | undefined {
    if (name === "") return;
    return this.Skill.find((e) => e.name === name);
  }

  // Pasif

  /**
   * Array of weapon pasif data
   */
  static Pasif: PasifData = {
    hit: [],
    hited: [],
    kill: [],
  };

  /**
   * Add new hit weapon pasif
   *
   * @param name string, name of weapon
   * @param callback function, will be execute when user hit target
   */
  static addHitPasif(name: string, callback: Function): void {
    this.Pasif.hit.push({ name, callback });
  }

  /**
   * Get hit pasif weapon data
   *
   * @param name string, name of weapon
   * @returns PasifHit
   */
  static getHitPasif(name: string): PasifHit | undefined {
    return this.Pasif.hit.find((e) => e.name === name);
  }

  /**
   * Add new attacked weapon pasif
   *
   * @param name string, name of weapon
   * @param callback function, will be execute when user was attacked
   */
  static addHitedPasif(name: string, callback: Function): void {
    this.Pasif.hited.push({ name, callback });
  }

  /**
   * Get attacked pasif weapon data
   *
   * @param name string, name of weapon
   * @returns PasifHited
   */
  static getHitedPasif(name: string): PasifHited | undefined {
    return this.Pasif.hited.find((e) => e.name === name);
  }

  /**
   * Add new kill weapon pasif
   *
   * @param name string, name of weapon
   * @param callback function, will be execute when user kill target
   */
  static addKillPasif(name: string, callback: Function): void {
    this.Pasif.kill.push({ name, callback });
  }

  /**
   * Get kill pasif weapon data
   *
   * @param name string, name of weapon
   * @returns PasifKill
   */
  static getKillPasif(name: string): PasifKill | undefined {
    return this.Pasif.kill.find((e) => e.name === name);
  }
}

export { Command, Modifier, Script, SpecialItem, Weapon };
