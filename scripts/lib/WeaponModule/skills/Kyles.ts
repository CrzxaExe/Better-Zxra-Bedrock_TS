import { Player, system } from "@minecraft/server";
import { Entity, SkillLib } from "../../ZxraLib/module";
import { slayerLostHPPercentation, uniqueWeaponData } from "../module";

class KyleSkill {
  static skill1(user: Player, { sp, vel, velocity }: SkillLib): void {
    const data = sp.getSp().weapons.find((e) => e.weapon === "kyles") || uniqueWeaponData.kyles,
      skill = data.skillLvl[0],
      hp = user.getComponent("health");

    if (!sp.cooldown.canSkill("kyle_skill1", skill.find((e) => e.name === "cooldown").value || 5)) return;
    sp.playAnim("animation.weapon.kyles.skill1");

    sp.bind(1.75);
    sp.minStamina(skill.find((e) => e.name === "stamina").value || 8);

    system.runTimeout(() => {
      sp.knockback(velocity || vel || user.getVelocity(), 1, 0);

      const target = sp.getEntityFromDistance(4.5);

      target.forEach((e) => {
        new Entity(e.entity).addDamage(
          Math.round(
            data.atk * skill.find((e) => e.name === "atk_percentage").value +
              (hp?.effectiveMax || 20) *
                skill.find((e) => e.name === "health_percentage").value *
                slayerLostHPPercentation(user)
          ),
          {
            cause: "entityAttack",
            damagingEntity: user,
            rune: sp.rune.getRuneStat(),
          }
        );
      });

      if (target.length > 0 && hp && hp.currentValue > 1) sp.consumeHp(0.4, hp, "kyle");
    }, 15);
  }

  static skill1Up(user: Player, { sp, velocity, vel }: SkillLib): void {
    const data = sp.getSp().weapons.find((e) => e.weapon === "kyles") || uniqueWeaponData.kyles,
      pasif = data.pasifLvl[0].find((e) => e.name === "zelxt_mode_multiplier").value,
      skill = data.skillLvl[0],
      hp = user.getComponent("health");

    if (!sp.cooldown.canSkill("kyle_skill1", skill.find((e) => e.name === "zelxt_cooldown").value || 4.5)) return;
    sp.playAnim("animation.weapon.kyles.skill1.up");

    sp.bind(2.5);
    sp.minStamina(skill.find((e) => e.name === "zelxt_stamina").value || 12);

    system.runTimeout(() => {
      sp.knockback(velocity || vel || user.getVelocity(), 1.3, 0);

      system.runTimeout(() => {
        sp.knockback(velocity || vel || user.getVelocity(), 1.7, 0);
        sp.source.triggerEvent("cz:immune_300ms");

        const first = sp.getEntityFromDistance(5);
        first.forEach((e) => {
          if (!e.entity) return;
          new Entity(e.entity).addDamage(
            data.atk * skill.find((e) => e.name === "zelxt_atk_percentage").value +
              (hp?.effectiveMax || 20) *
                skill.find((e) => e.name === "zelxt_health_percentage").value *
                slayerLostHPPercentation(user) *
                pasif,
            {
              cause: "void",
              damagingEntity: user,
              rune: sp.rune.getRuneStat(),
            }
          );
        });

        system.runTimeout(() => {
          sp.knockback(velocity || vel || user.getVelocity(), -3.2, 0);

          system.runTimeout(() => {
            sp.knockback(velocity || vel || user.getVelocity(), 5.5, 0);
            sp.source.triggerEvent("cz:immune_300ms");

            const second = sp.getEntityFromDistance(5.9);
            second.forEach((e) => {
              if (!e.entity) return;
              new Entity(e.entity).addDamage(
                data.atk * skill.find((e) => e.name === "zelxt_atk_percentage").value +
                  (hp?.effectiveMax || 20) *
                    skill.find((e) => e.name === "zelxt_health_percentage").value *
                    slayerLostHPPercentation(user) *
                    pasif,
                {
                  cause: "void",
                  damagingEntity: user,
                  rune: sp.rune.getRuneStat(),
                }
              );
            });

            if (first.length > 0 || second.length > 0) sp.consumeHp(0.5, hp, "kyle");
          }, 14);
        }, 4);
      }, 10);
    }, 13);
  }

  static skillSpecial(user: Player, { sp }: SkillLib): void {
    sp.playAnim("animation.weapon.kyles.transform");

    sp.bind(1.5);
    sp.minStamina(10);

    const data = sp.getSp().weapons.find((e) => e.weapon === "kyles") || uniqueWeaponData.kyles,
      skill = data.skillLvl[3],
      hp = user.getComponent("health");

    system.runTimeout(() => {
      sp.status.minStatusLvl("zelxt_point", 100);
      sp.status.addStatus("zelxt_mode", 1, {
        type: "state",
        decay: "none",
        stack: false,
        lvl: 1,
      });

      sp.heal((hp?.effectiveMax || 20) * skill?.find((e) => e.name === "health_recover").value);

      sp.addEffect([
        { name: "speed", amplifier: 1, duration: 5, showParticles: false },
        { name: "absorption", amplifier: 4, duration: 10, showParticles: false },
      ]);
    }, 20);
  }
}

export { KyleSkill };
