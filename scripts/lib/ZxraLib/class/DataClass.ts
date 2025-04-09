import { PasifData, PasifHit, PasifHited, PasifKill, WeaponSkill } from "../module";

class Command {}
class Modifier {}
class Script {}
class SpecialItem {}

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
