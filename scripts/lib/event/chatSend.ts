import { ChatSendBeforeEvent, DimensionLocation, world } from "@minecraft/server";
import { Chat, Terra } from "../ZxraLib/module";

world.beforeEvents.chatSend.subscribe((event: ChatSendBeforeEvent) => {
  try {
    const { sender, message, targets } = event;

    event.cancel = true;
    Terra.leaderboard.addLb("chat", sender.id, 1);

    if (targets && targets.length > 0) {
      Chat.privateMessage(sender, message, targets);
      return;
    }
    Chat.globalMessage(sender, message);
  } catch (error: { message: string } | any) {
    console.warn("[System] Error on Event ChatSend: " + error.message);
  }
});
