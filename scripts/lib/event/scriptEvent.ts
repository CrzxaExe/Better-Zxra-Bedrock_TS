import { ScriptEventCommandMessageAfterEvent, system } from "@minecraft/server";
import { Script } from "../ZxraLib/module";

system.afterEvents.scriptEventReceive.subscribe(
  ({ id, message, sourceType, initiator, sourceBlock, sourceEntity }: ScriptEventCommandMessageAfterEvent) => {
    try {
      if (id !== "cz") return;

      const rawMsg = message.split(" "),
        cmd = rawMsg[0],
        msg = rawMsg.slice(1);

      const script = Script.get(cmd);

      if (!script) return;

      script.callback({ cmd, rawMsg, msg, id, message, sourceType, initiator, sourceBlock, sourceEntity });
    } catch (error: { message: string } | any) {
      console.warn("[System] Error on Event ScriptEventRecieve: " + error.message);
    }
  }
);
