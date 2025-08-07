import { Player } from "@minecraft/server";
import { SpecialistWeapon, Terra, WeaponStat } from "../../ZxraLib/module";
import { weaponData } from "../module";

type LiberatorPasif1 = {
  stack: number;
  max: number;
  multiplier: number;
};

class Liberator {
  static pasif1(
    user: Player,
    data: SpecialistWeapon | undefined = Terra.getSpecialist(user.id)?.weapons?.find((e) => e.weapon === "liberator")
  ): LiberatorPasif1 {
    const pasifData: LiberatorPasif1 = { stack: 0, max: 3, multiplier: 2 };
    const weapon = data || weaponData.unique.liberator;
    const pasif = weapon.pasifLvl[0];

    pasifData.stack = Terra.getSpecialistCache(user).status.getStatus({ name: "soul_of_death" })[0].lvl ?? 0;
    pasifData.max = pasif?.find((e) => e.name === "max_stack")?.lvl ?? 3;
    pasifData.multiplier = pasif?.find((e) => e.name === "heal_multiplier");

    return pasifData;
  }

  static pasif2(
    user: Player,
    data: SpecialistWeapon | undefined = Terra.getSpecialist(user.id)?.weapons?.find((e) => e.weapon === "liberator")
  ): number {
    const weapon = data || weaponData.unique.liberator;
    const pasif = (weapon.pasifLvl[1] as WeaponStat[]).find((e) => e.name === "heal") as WeaponStat;

    return (pasif.value ?? 0.2) as number;
  }
}

export { Liberator };
