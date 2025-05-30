import { Player } from "@minecraft/server";
import { SkillLib, Weapon } from "../ZxraLib/module";
import { KyleSkill } from "../WeaponModule/module";

Weapon.registerSkill("kyles", (user: Player, lib: SkillLib) => {
  if (
    (lib.sp?.status.getStatus({ name: "zelxt_point" })[0]?.lvl || 0) >= 100 &&
    !lib.sp.status.getStatus({ name: "zelxt_mode" })[0]
  ) {
    KyleSkill.skillSpecial(user, lib);
  } else if (user.isSneaking) {
    user.sendMessage("Skill 2");
  } else if (!user.isOnGround) {
    user.sendMessage("Skill 3");
  } else {
    if (lib.sp.status.getStatus({ name: "zelxt_mode" })[0]) {
      KyleSkill.skill1Up(user, lib);
    } else {
      KyleSkill.skill1(user, lib);
    }
  }
});
