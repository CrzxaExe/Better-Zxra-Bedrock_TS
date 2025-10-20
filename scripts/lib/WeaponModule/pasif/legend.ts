import { Player, Entity as mcEntity } from "@minecraft/server";
import { Weapon, Specialist, Terra } from "../../ZxraLib/module";
import { weaponRaw } from "../module";
import { Cervant } from "../ability/Cervant";

Weapon.addHitPasif("cervant", (_: Player, target: mcEntity, { sp }: { sp: Specialist }) => {
  const data = sp.getSp().weapons.find((e) => e.weapon === "cervant") ?? weaponRaw.legend.cervant;

  const ent = Terra.getEntityCache(target);
  const stack = Cervant.pasif1(ent, sp, data);

  ent.addDamage(data.atk + stack);
  if (stack + 1 < 5)
    ent.status.addStatus("sharp_slice", 5, { type: "stack", decay: "time", lvl: stack + 1, stack: false });
});
