import { Player } from "@minecraft/server";
import { SkillLib, Weapon } from "../ZxraLib/module";

Weapon.registerSkill("kyles", (user: Player, lib: SkillLib) => {
  lib.sp?.addEffectOne("strength", 2, 0);
  user.sendMessage(`${lib.useDuration}`);
});
