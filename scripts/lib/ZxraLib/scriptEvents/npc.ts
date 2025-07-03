import { Player } from "@minecraft/server";
import { Script, ScriptParams, Yuri } from "../module";

Script.add("yuri_menu", ({ initiator, sourceEntity }: ScriptParams) => {
  if (!initiator || !sourceEntity) return;
  new Yuri(initiator).ui(sourceEntity as Player);
});
