import { Player, system } from "@minecraft/server";
import { Script, ScriptParams, StatusDecay, StatusDecayEnum, StatusTypes, StatusTypesEnum, Terra } from "../module";

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

Script.add("add_status", ({ sourceEntity, rawMsg }: ScriptParams) => {
  if (!(sourceEntity instanceof Player)) return;

  const sp = Terra.getSpecialistCache(sourceEntity);
  const msg = rawMsg;

  const name: string = msg[0] ?? "";
  if (name === "") return;

  const duration: number = parseInt(msg[1]) ?? 1;
  const lvl: number = parseInt(msg[2]) ?? 1;
  const type: StatusTypes = Object.values(StatusTypesEnum).includes(msg[3] as StatusTypes)
    ? (msg[3] as StatusTypes)
    : "none";
  const stack: boolean = Boolean(msg[4]) ?? false;
  const decay: StatusDecay = Object.values(StatusDecayEnum).includes(msg[5] as StatusDecay)
    ? (msg[5] as StatusDecay)
    : "time";

  try {
    sp.status.addStatus(name, duration, { type, lvl, decay, stack });
  } catch (error: { message: string } | any) {
    console.warn("[System] Script event add_status error: " + error.message);
  }
});

Script.add("clear_status", ({ sourceEntity }: ScriptParams) => {
  if (!(sourceEntity instanceof Player)) return;

  Terra.getSpecialistCache(sourceEntity).status.clearData();
});
