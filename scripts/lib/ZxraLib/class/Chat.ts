import { Player, world } from "@minecraft/server";
import { Specialist, Terra, settings } from "../module";

class Chat {
  static privateMessage(sender: Player, message: string, targets: Player[]): void {
    if (message === "") return;

    const format: string = "%name -> %msg";

    targets.forEach((player: Player) =>
      player.sendMessage({ text: format.replace("%msg", message).replace("%name", sender.name) })
    );
  }

  static guildMessage(sender: Player, message: string): void {}

  static globalMessage(sender: Player, message: string): void {
    if (message === "") return;

    const format: string = Terra.world.setting?.customChatPrefix || settings.customChatPrefix || "%name > %msg";
    const sp = new Specialist(sender),
      data = sp.getSp();

    world.sendMessage({
      text: format
        .replace("%msg", message)
        .replace("%name", sender.name)
        .replace("%lvl", String(sender.level))
        .replace("%splvl", String(data.level.current)),
    });
  }
}

export { Chat };
