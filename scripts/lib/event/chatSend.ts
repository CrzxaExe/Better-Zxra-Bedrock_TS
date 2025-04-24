import { ChatSendAfterEvent, ChatSendBeforeEvent, world } from "@minecraft/server";
import { Chat } from "../ZxraLib/module";

world.beforeEvents.chatSend.subscribe((event: ChatSendBeforeEvent) => {
  const { sender, message, targets } = event;

  event.cancel = true;

  if (targets && targets.length > 0) {
    Chat.privateMessage(sender, message, targets);
    return;
  }
  Chat.globalMessage(sender, message);
});
