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
class Command {
  static Cmd: Array<CommandData> = [];
  static CmdL: Array<CommandData> = [];

  static add(name: string, callback: Function) {
    this.Cmd.push({ name, callback });
  }
  static addL(name: string, callback: Function) {
    this.CmdL.push({ name, callback });
  }

  static get(name: string): CommandData | undefined {
    return this.Cmd.find((e) => e.name === name);
  }
  static getL(name: string): CommandData | undefined {
    return this.CmdL.find((e) => e.name === name);
  }
}

// Modifier class
class Modifier {
  static mod: Array<ModifierData> = [];

  static add(name: string, type: string, callback: Function) {
    this.mod.push({ name, type, callback });
  }
  static getType(type: string): ModifierData | undefined {
    return this.mod.find((e) => e.type === type);
  }
}

// Script Class
class Script {
  static data: Array<Scripts> = [];

  static add(namespace: string, callback: Function): void {
    this.data.push({ namespace, callback });
  }
  static get(namespace: string): Scripts | undefined {
    return this.data.find((e) => e.namespace === namespace);
  }
}

// Special Item class
class SpecialItem {
  static item: Array<ItemSpecial> = [];
  static use: Array<ItemSpecial> = [];
  static place: Array<ItemSpecial> = [];

  static addItem(item: string, callback: Function) {
    this.item.push({ item, callback });
  }
  static addUse(item: string, callback: Function) {
    this.use.push({ item, callback });
  }
  static addPlace(item: string, callback: Function) {
    this.place.push({ item, callback });
  }

  static getItem(item: string): ItemSpecial | undefined {
    return this.item.find((e) => e.item === item);
  }
  static getUse(item: string): ItemSpecial | undefined {
    return this.use.find((e) => e.item === item);
  }
  static getPlace(item: string): ItemSpecial | undefined {
    return this.place.find((e) => e.item === item);
  }
}

// Weapon Class
class Weapon {
  // Weapom Skill
  static Skill: Array<WeaponSkill> = [];

  static registerSkill(name: string, callback: Function): void {
    this.Skill.push({ name, callback });
  }
  static getSkill(name: string): WeaponSkill | undefined {
    return this.Skill.find((e) => e.name === name);
  }

  // Pasif
  static Pasif: PasifData = {
    hit: [],
    hited: [],
    kill: [],
  };

  static addHitPasif(name: string, callback: Function): void {
    this.Pasif.hit.push({ name, callback });
  }
  static getHitPasif(name: string): PasifHit | undefined {
    return this.Pasif.hit.find((e) => e.name === name);
  }

  static addHitedPasif(name: string, callback: Function): void {
    this.Pasif.hited.push({ name, callback });
  }
  static getHitedPasif(name: string): PasifHited | undefined {
    return this.Pasif.hited.find((e) => e.name === name);
  }

  static addKillPasif(name: string, callback: Function): void {
    this.Pasif.kill.push({ name, callback });
  }
  static getKillPasif(name: string): PasifKill | undefined {
    return this.Pasif.kill.find((e) => e.name === name);
  }
}

export { Command, Modifier, Script, SpecialItem, Weapon };
