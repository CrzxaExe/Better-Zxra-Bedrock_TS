import { Player } from "@minecraft/server";
import { Specialist, Weapon } from "../../ZxraLib/module";
import { Reaper } from "../module";

Weapon.addHitPasif("reaper", (user: Player, _: unknown, { sp }: { sp: Specialist }) => {
  Reaper.reap(sp, (_: unknown, healFunction: ReaperHealFunction) => {
    healFunction?.(1);
  });
});
