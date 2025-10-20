import { Entity, Specialist, SpecialistWeaponPlayer } from "../../ZxraLib/module";
import { weaponData, weaponRaw } from "../module";

class Destiny {
  static pasif1(
    target: Entity,
    sp: Specialist,
    wpnData: SpecialistWeaponPlayer = sp.getSp().weapons.find((e) => e.weapon === "destiny") ?? weaponRaw.unique.destiny
  ): void {
    const pasif =
      weaponData.unique.destiny.pasifLvl[1]![wpnData.pasifLvl[1]!].find((e) => e.name === "silence_duration")?.value ??
      3;

    target.status.addStatus("fears", pasif, { type: "silence", decay: "time", lvl: 1, stack: false });
  }

  static pasif2(
    target: Entity,
    sp: Specialist,
    wpnData: SpecialistWeaponPlayer = sp.getSp().weapons.find((e) => e.weapon === "destiny") ?? weaponRaw.unique.destiny
  ): number {
    const isSilenced: boolean = target.status.hasStatus({ type: "silence" });

    const pasif =
      weaponData.unique.destiny.pasifLvl[1]![wpnData.pasifLvl[1]!].find((e) => e.name === "atk_increase")?.value ?? 1.5;

    return isSilenced ? pasif : 1;
  }
}

export { Destiny };
