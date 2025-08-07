import { Entity as mcEntity, Player } from "@minecraft/server";
import { Specialist, Weapon } from "../../ZxraLib/module";
import { Bringer } from "../module";

Weapon.addKillPasif("bringer", (user: Player, _: unknown, { sp }: { sp: Specialist }) => {
  Bringer.pasif1(user, sp);
});
