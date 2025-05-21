import { EntityHealthComponent, Player, system } from "@minecraft/server";
import { Calc, Entity, SkillLib } from "../../ZxraLib/module";
import { slayerLostHPPercentation } from "../module";

class KyleSkill {
  static skill1(user: Player, { sp, vel, velocity }: SkillLib): void {
    sp.playAnim("animation.weapon.kyles.skill1");

    sp.bind(1.6);
    sp.minStamina(8);

    const data = sp.getSp().weapons.find((e) => e.weapon === "kyles"),
      hp = user.getComponent("health"),
      hpLost = Calc.hpLostPercentage(hp as EntityHealthComponent);

    system.runTimeout(() => {
      sp.knockback(velocity || vel || user.getVelocity(), 1, 0);

      const target = sp.getEntityFromDistance(4.5);

      target.forEach((e) => {
        new Entity(e.entity).addDamage(
          Math.round(8 + (hp?.effectiveMax || 20) * 0.4 * slayerLostHPPercentation(user)),
          {
            cause: "void",
            damagingEntity: user,
            rune: sp.rune.getRuneStat(),
          }
        );
      });

      if (target.length > 0 && hp && hp.currentValue > 1) {
        hp.setCurrentValue(hp.currentValue - hp.currentValue * 0.4);
        sp.status.addStatus("zelxt_point", 1, {
          type: "stack",
          decay: "none",
          stack: true,
          lvl: (Calc.hpLostPercentage(hp) - hpLost) * 100,
        });
      }
    }, 15);
  }
}

export { KyleSkill };
