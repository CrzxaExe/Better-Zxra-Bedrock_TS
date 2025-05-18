import { Player } from "@minecraft/server";
import { defaultRuneStat, Entity, RuneStats, Specialist, SpecialistData, SpecialistRune } from "../module";

interface Rune {
  sp: Specialist;
}

class Rune {
  constructor(sp: Specialist) {
    if (!sp) throw new Error("Missing Entity");

    this.sp = sp;
  }

  getRune(): SpecialistRune[] {
    return this.sp.getSp().runes;
  }
  setRune(newData: SpecialistRune[], data: SpecialistData = this.sp.getSp()): void {
    if (!newData) throw new Error("Missing new data");

    data.runes = newData;
    this.sp.setSp(data);
  }
  addRune(rune: SpecialistRune, data: SpecialistData = this.sp.getSp()): void {
    if (!rune) throw new Error("Missing rune");

    data.runes.push(rune);
    this.sp.setSp(data);
  }
  hasRune(name: string, data: SpecialistData = this.sp.getSp()): boolean {
    if (name === "") throw new Error("Missing name");

    return data.runes.some((e) => e.name === name);
  }

  equipRune(name: string, data: SpecialistData = this.sp.getSp()): void {
    if (name === "") throw new Error("Missing name");

    if (!this.hasRune(name, data)) throw new Error("Name not found");

    if (data.equippedRune.length + 1 > 3) return;
    data.equippedRune.push(name);

    this.sp.setSp(data);
  }
  hasEquipRune(name: string, data: SpecialistData = this.sp.getSp()): boolean {
    if (name === "") throw new Error("Missing name");

    return data.equippedRune.some((e) => e === name);
  }
  unequipRune(name: string, data: SpecialistData = this.sp.getSp()): void {
    if (name === "") throw new Error("Missing name");

    if (this.hasEquipRune(name, data)) return;
    const find = data.equippedRune.findIndex((e) => e === name);

    if (find === -1) return;
    data.equippedRune.splice(find, 1);
    this.sp.setSp(data);
  }

  getRuneStat(): RuneStats {
    const data = defaultRuneStat;

    this.sp.getSp().runes.forEach((e) => {});

    return data;
  }
}

export { Rune };
