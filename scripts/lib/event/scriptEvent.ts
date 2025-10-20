import { Entity, ScriptEventCommandMessageAfterEvent, system } from "@minecraft/server";
import { Parser, Script, ScriptParams } from "../ZxraLib/module";

system.afterEvents.scriptEventReceive.subscribe(
  ({ id, message, sourceType, initiator, sourceBlock, sourceEntity }: ScriptEventCommandMessageAfterEvent) => {
    try {
      if (!id.startsWith("cz")) return;

      const rawMsg = (Parser.stringArray(message) ?? []) as string[],
        cmd = rawMsg[0],
        msg = rawMsg.slice(1);

      const script = Script.get(id.replace("cz:", ""));
      const init: Entity | undefined =
        initiator || sourceEntity?.getEntitiesFromViewDirection({ maxDistance: 5 })[0]?.entity;

      if (!script) return;

      script.callback({
        cmd,
        rawMsg,
        msg,
        id,
        message,
        sourceType,
        initiator: init,
        sourceBlock,
        sourceEntity,
      } as ScriptParams);
    } catch (error: { message: string } | any) {
      console.warn("[System] Error on Event ScriptEventRecieve: " + error.message);
    }
  }
);
