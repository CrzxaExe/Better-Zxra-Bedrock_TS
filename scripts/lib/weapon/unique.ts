import { Player } from "@minecraft/server";
import { SkillLib, Weapon } from "../ZxraLib/module";

Weapon.registerSkill("kyles", (user: Player, lib: SkillLib) => {
  user.sendMessage(`${lib.useDuration}`);

  if ((lib.sp?.status.getStatus({ name: "zelxt_point" })[0]?.lvl || 0) >= 100) {
    user.sendMessage("Skill Special");
  } else if (user.isSneaking) {
    user.sendMessage("Skill 2");
  } else if (!user.isOnGround) {
    user.sendMessage("Skill 3");
  } else {
    user.sendMessage("Skill 1");
  }
});
