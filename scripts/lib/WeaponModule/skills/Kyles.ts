import { Player } from "@minecraft/server";
import { CreateObject, SkillLib } from "../../ZxraLib/module";

class KyleSkill {
  static skill1(user: Player, { sp }: SkillLib): void {
    sp.playAnim("animation.weapon.kyles.skill1");

    sp.bind(1.6);
    sp.minStamina(8);

    const data = sp.getSp().weapons.find((e) => e.weapon === "kyles");
  }
}

export { KyleSkill };
