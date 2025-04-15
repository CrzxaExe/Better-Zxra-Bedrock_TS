import { Player, world } from "@minecraft/server";
import { Terra, settings } from "../module";

class Chat {
  static privateMessage(sender: Player, message: string, targets: Player[]): void {
    if (message === "") return;

    const format: string = "%name -> %msg";

    targets.forEach((player) =>
      player.sendMessage({ text: format.replace("%msg", message).replace("%name", sender.name) })
    );
  }

  static guildMessage(sender: Player, message: string): void {}

  static globalMessage(sender: Player, message: string): void {
    if (message === "") return;

    const format: string = Terra.world.setting?.customChatPrefix || settings.customChatPrefix || "%name > %msg";

    world.sendMessage({ text: format.replace("%msg", message).replace("%name", sender.name) });
  }
}

export { Chat };
