import { Player } from "@minecraft/server";
import { SkillLib, Weapon } from "../ZxraLib/module";
import { Kyle } from "../WeaponModule/module";

Weapon.registerSkill("kyles", (user: Player, lib: SkillLib) => {
  if (
    (lib.sp?.status.getStatus({ name: "zelxt_point" })[0]?.lvl || 0) >= 100 &&
    !lib.sp.status.getStatus({ name: "zelxt_mode" })[0]
  ) {
    Kyle.skillSpecial(user, lib);
  } else if (user.isSneaking) {
    if (lib.sp.status.getStatus({ name: "zelxt_mode" })[0]) {
      user.sendMessage("Skill 2");
    } else {
      Kyle.skill2(user, lib);
    }
  } else if (!user.isOnGround) {
    user.sendMessage("Skill 3");
  } else {
    if (lib.sp.status.getStatus({ name: "zelxt_mode" })[0]) {
      Kyle.skill1Up(user, lib);
    } else {
      Kyle.skill1(user, lib);
    }
  }
});
