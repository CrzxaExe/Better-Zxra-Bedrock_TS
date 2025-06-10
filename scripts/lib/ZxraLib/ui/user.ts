import { Player } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { Terra } from "../module";

class UserPanel {
  static home(player: Player): void {
    new ActionFormData()
      .title("cz:user")
      .body({
        text: "test",
      })
      .button({ translate: "cz.shop" }, "textures/cz/icon/shop")
      .button({ translate: "cz.guild" }, "textures/cz/icon/guild")
      .button({ translate: "cz.rune" }, "textures/cz/icon/rune")
      .button({ translate: "cz.leaderboard" }, "textures/cz/icon/leaderboard")
      .button({ translate: "cz.gacha" }, "textures/cz/icon/gacha")
      .button({ translate: "cz.quest" }, "textures/cz/icon/quest")
      .button({ translate: "cz.user" }, "textures/cz/icon/user")
      .button({ translate: "cz.redeem" }, "textures/cz/icon/redeem")
      .button({ translate: "cz.wiki" }, "textures/cz/icon/wiki")
      .show(player)
      .then((e) => {
        console.warn("test");
      });
  }

  static guild(player: Player): void {
    const guild = Terra.guild.getGuildByPlayer(player);

    const ui = new ActionFormData()
      .title("cz:guild")
      .body({ text: "test" })
      .button({ translate: "cz.guild.create" })
      .button({ translate: "cz.guild.info" })
      .button({ translate: "cz.guild.join" });

    if (guild) ui.button({ translate: "cz.guild.shop" });

    ui.show(player).then((e) => {
      console.warn(e);
    });
  }
}

export { UserPanel };
