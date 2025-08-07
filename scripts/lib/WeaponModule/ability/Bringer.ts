import { Player } from "@minecraft/server";
import { Specialist, SpecialistWeapon, Terra } from "../../ZxraLib/module";
import { weaponData } from "../module";

class Bringer {
  static pasif1(
    user: Player,
    sp: Specialist,
    weapon: SpecialistWeapon = Terra.getSpecialist(user.id)?.weapons.find((e) => e.weapon === "bringer") ??
      weaponData.epic.bringer
  ): void {
    const pasif = weapon.pasifLvl[0].find((e) => e.name === "heal").value ?? 0.2;
    const hp = user.getComponent("health");

    sp.heal((hp?.effectiveMax || 20) * pasif);
  }
}

export { Bringer };
