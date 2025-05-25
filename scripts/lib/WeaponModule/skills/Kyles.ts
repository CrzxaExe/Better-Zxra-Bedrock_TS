import { EntityHealthComponent, Player, system } from "@minecraft/server";
import { Calc, Entity, SkillLib } from "../../ZxraLib/module";
import { slayerLostHPPercentation } from "../module";

class KyleSkill {
  static skill1(user: Player, { sp, vel, velocity }: SkillLib): void {
    sp.playAnim("animation.weapon.kyles.skill1");

    sp.bind(1.75);
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
            cause: "entityAttack",
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

  static skill1Up(user: Player, { sp, velocity, vel }: SkillLib): void {
    sp.playAnim("animation.weapon.kyles.skill1.up");

    sp.bind(2.5);
    sp.minStamina(12);

    system.runTimeout(() => {
      sp.knockback(velocity || vel || user.getVelocity(), 1.3, 0);

      system.runTimeout(() => {
        sp.knockback(velocity || vel || user.getVelocity(), 1.7, 0);
        sp.getEntityFromDistance(5).forEach((e) => {
          new Entity(e.entity).addDamage(10, {
            cause: "void",
            damagingEntity: user,
            rune: sp.rune.getRuneStat(),
          });
        });

        system.runTimeout(() => {
          sp.knockback(velocity || vel || user.getVelocity(), -3.2, 0);

          system.runTimeout(() => {
            sp.knockback(velocity || vel || user.getVelocity(), 5.5, 0);

            sp.getEntityFromDistance(5.9).forEach((e) => {
              new Entity(e.entity).addDamage(10, {
                cause: "void",
                damagingEntity: user,
                rune: sp.rune.getRuneStat(),
              });
            });
          }, 14);
        }, 4);
      }, 10);
    }, 13);
  }

  static skillSpecial(user: Player, { sp }: SkillLib): void {
    sp.playAnim("animation.weapon.kyles.transform");

    sp.bind(1.5);
    sp.minStamina(10);

    system.runTimeout(() => {
      sp.status.minStatusLvl("zelxt_point", 100);
      sp.status.addStatus("zelxt_mode", 1, {
        type: "state",
        decay: "none",
        stack: false,
        lvl: 1,
      });

      sp.addEffect([
        { name: "speed", amplifier: 1, duration: 5, showParticles: false },
        { name: "absorption", amplifier: 4, duration: 10, showParticles: false },
      ]);
    }, 20);
  }
}

export { KyleSkill };
