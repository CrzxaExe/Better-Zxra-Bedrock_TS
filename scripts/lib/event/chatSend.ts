import { ChatSendAfterEvent, world } from "@minecraft/server";

world.beforeEvents.chatSend.subscribe((event: ChatSendAfterEvent) => {
  const { sender, message, targets } = event;

  console.warn(sender, message, targets);
});
