import { ChatSendAfterEvent, ChatSendBeforeEvent, world } from "@minecraft/server";
import { Chat } from "../ZxraLib/module";

world.beforeEvents.chatSend.subscribe((event: ChatSendBeforeEvent) => {
  const { sender, message, targets } = event;

  event.cancel = true;
  Chat.globalMessage(sender, message);
});
