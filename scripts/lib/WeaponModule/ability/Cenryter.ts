import { Player } from "@minecraft/server";
import { SpecialistWeaponPlayer, Terra } from "../../ZxraLib/module";
import { weaponData, weaponRaw } from "../module";

class Cenryter {
  static pasif(
    user: Player,
    weapon: SpecialistWeaponPlayer = Terra.getSpecialist(user.id)?.weapons.find((e) => e.weapon === "cenryter") ??
      weaponRaw.epic.cenryter
  ): number {
    return weaponData.epic.cenryter.pasifLvl[0]![weapon.pasifLvl[0]]!.find((e) => e.name === "heal_multiplier") ?? 3;
  }
}

export { Cenryter };
