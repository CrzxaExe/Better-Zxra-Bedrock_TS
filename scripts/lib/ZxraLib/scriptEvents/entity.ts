import { Player, system } from "@minecraft/server";
import { Script, ScriptParams, Terra } from "../module";

Script.add("zelxt_revive", ({ sourceEntity }: ScriptParams) => {
  if (!(sourceEntity instanceof Player)) return;

  const sp = Terra.getSpecialistCache(sourceEntity);

  sp.playAnim("animation.weapon.kyles.revive");

  sp.bind(4.25);
  sp.setCurrentHP(1);

  system.runTimeout(() => {
    sp.status.removeStatus("zelxt_mode");
    sp.heal(500);
  }, 80);
});
