import { Player } from "@minecraft/server";
import { SpecialistWeapon, Terra } from "../../ZxraLib/module";
import { weaponData } from "../module";

class Cenryter {
  static pasif(
    user: Player,
    weapon: SpecialistWeapon = Terra.getSpecialist(user.id)?.weapons.find((e) => e.weapon === "cenryter") ??
      weaponData.epic.cenryter
  ): number {
    return weapon.pasifLvl[0].find((e) => e.name === "heal_multiplier") ?? 3;
  }
}

export { Cenryter };
