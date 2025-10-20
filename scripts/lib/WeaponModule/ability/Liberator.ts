import { Player, system } from "@minecraft/server";
import { CreateObject, SkillLib, SpecialistWeaponPlayer, Terra, WeaponStat } from "../../ZxraLib/module";
import { weaponData, weaponRaw } from "../module";

type LiberatorPasif1 = {
  stack: number;
  max: number;
  multiplier: number;
};

class Liberator {
  static pasif1(
    user: Player,
    data: SpecialistWeaponPlayer | undefined = Terra.getSpecialist(user.id)?.weapons?.find(
      (e) => e.weapon === "liberator"
    )
  ): LiberatorPasif1 {
    const pasifData: LiberatorPasif1 = { stack: 0, max: 3, multiplier: 2 };
    const weapon = data || weaponRaw.unique.liberator;
    const pasif = weaponData.unique.liberator.pasifLvl[0][weapon.pasifLvl[1]!]!;

    pasifData.stack = Terra.getSpecialistCache(user).status.getStatus({ name: "soul_of_death" })[0].lvl ?? 0;
    pasifData.max = pasif?.find((e) => e.name === "max_stack")?.value ?? 3;
    pasifData.multiplier = pasif?.find((e) => e.name === "heal_multiplier")!.value;

    return pasifData;
  }

  static pasif2(
    user: Player,
    data: SpecialistWeaponPlayer | undefined = Terra.getSpecialist(user.id)?.weapons?.find(
      (e) => e.weapon === "liberator"
    )
  ): number {
    const weapon = data || weaponRaw.unique.liberator;
    const pasif = (weaponData.unique.liberator.pasifLvl[1]![weapon.pasifLvl[1]!] as WeaponStat[]).find(
      (e) => e.name === "heal"
    ) as WeaponStat;

    return (pasif.value ?? 0.2) as number;
  }

  static skill1(user: Player, { sp, multiplier }: SkillLib): void {
    const data = sp.getSp().weapons.find((e) => e.weapon === "liberator") || weaponRaw.unique.liberator,
      skill = weaponData.unique.liberator.skillLvl[0][data.skillLvl[0]];

    if (!sp.cooldown.canSkill("liberator_skill1", skill.find((e) => e.name === "cooldown")!.value || 4.5)) return;
    sp.playAnim("animation.weapon.liberator.skill1");

    sp.bind(1.67);
    system.runTimeout(() => {
      sp.getEntityFromDistanceCone(4).forEach((e) => {
        const ent = Terra.getEntityCache(e);

        ent.addDamage(data.atk * (skill.find((r) => r.name === "atk_percentage")?.value ?? 1.3) * (multiplier || 1), {
          cause: "entityAttack",
          damagingEntity: user,
          rune: sp.rune.getRuneStat(),
          isSkill: true,
        });
      });

      sp.knockback(CreateObject.createVelocityPlayer(user), 0.9);
    }, 16);
  }
}

export { Liberator };
