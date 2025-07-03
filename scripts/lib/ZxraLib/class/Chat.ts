import { Player, world } from "@minecraft/server";
import { Formater, Terra, settings } from "../module";

class Chat {
  static privateMessage(sender: Player, message: string, targets: Player[]): void {
    if (message === "") return;

    const format: string = "%name -> %msg";

    targets.forEach((player: Player) =>
      player.sendMessage({ text: format.replace("%msg", message).replace("%name", sender.name) })
    );
  }

  static guildMessage(sender: Player, message: string): void {
    const guild = Terra.guild.getGuildByPlayer(sender);

    const format: string = "%guild%-> %name > %msg";

    if (!guild) {
      sender.sendMessage({ translate: "system.notHave.guild" });
      return;
    }

    guild.members.forEach((e) => {
      const player = Terra.getWorldPlayerById(e.id);
      if (!player) return;
      player.sendMessage({
        text: format
          .replace("%guild", Formater.formatGuild(guild))
          .replace("%name", sender.name)
          .replace("%msg", message),
      });
    });
  }

  static globalMessage(sender: Player, message: string): void {
    if (message === "") return;

    const format: string = Terra.world.setting?.customChatPrefix || settings.customChatPrefix || "%name > %msg";
    const sp = Terra.getSpecialistCache(sender),
      data = sp.getSp();

    const gamemode: string = {
      Adventure: "AD",
      Creative: "CE",
      Survival: "SE",
      Spectator: "SP",
    }[sender.getGameMode()];

    world.sendMessage({
      text: format
        .replace("%msg", message)
        .replace("%name", sender.name)
        .replace("%lvl", String(sender.level))
        .replace("%title", data.title !== "" ? data.title : "")
        .replace("%guild", Formater.formatGuild(Terra.guild.getGuildByPlayer(sender)))
        .replace("%splvl", String(data.level.current))
        .replace("%gm", gamemode),
    });
  }
}

export { Chat };
