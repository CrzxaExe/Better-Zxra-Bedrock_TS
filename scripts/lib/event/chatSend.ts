import { ChatSendAfterEvent, ChatSendBeforeEvent, world } from "@minecraft/server";
import { Chat } from "../ZxraLib/module";

world.beforeEvents.chatSend.subscribe((event: ChatSendBeforeEvent) => {
  try {
    const { sender, message, targets } = event;

    event.cancel = true;

    if (targets && targets.length > 0) {
      Chat.privateMessage(sender, message, targets);
      return;
    }
    Chat.globalMessage(sender, message);
  } catch (error: { message: string } | any) {
    console.warn("[System] Error on Event ChatSend: " + error.message);
  }
});
