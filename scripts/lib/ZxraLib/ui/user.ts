import { CommandPermissionLevel, Player } from "@minecraft/server";
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
        switch (e.selection) {
          case 0:
            this.shop(player);
            break;
          case 1:
            this.guild(player);
            break;
          case 2:
            this.rune(player);
            break;
          case 3:
            this.leaderboard(player);
            break;
          case 6:
            this.userManagement(player);
            break;
        }
      });
  }

  static guild(player: Player): void {
    const guild = Terra.guild.getGuildByPlayer(player);

    const ui = new ActionFormData()
      .title("cz.guild")
      .body({ text: "test" })
      .button({ translate: "system.guild.create" })
      .button({ translate: "system.guild.info" })
      .button({ translate: "system.guild.join" });

    if (guild) ui.button({ translate: "system.guild.shop" });

    ui.show(player).then((e) => {
      console.warn(e);
    });
  }

  static shop(player: Player): void {
    new ActionFormData()
      .title("cz:shop")
      .body({ translate: "cz.shop.body" })
      .button({ translate: "cz.blocks" }, "textures/blocks/bookshelf")
      .button({ translate: "cz.crops" }, "textures/items/wheat")
      .button({ translate: "cz.foods" }, "textures/items/mutton_cooked")
      .button({ translate: "cz.materials" }, "textures/items/coal")
      .button({ translate: "cz.minerals" }, "textures/items/diamond_ingot")
      .button({ translate: "cz.redstone" }, "textures/items/redstone_dust")
      .button({ translate: "cz.special" }, "textures/items/diamond_ascend")

      .show(player)
      .then((e) => {
        console.warn(e);
      });
  }

  static rune(player: Player): void {
    const user = Terra.getSpecialistCache(player);

    new ActionFormData()
      .title("cz.rune")
      .body({ translate: "system.rune" })
      .button({ translate: "system.rune.equipped" })
      .button({ translate: "system.rune.list" })
      .show(player)
      .then((e) => {
        console.warn(e);
      });
  }

  static leaderboard(player: Player): void {
    new ActionFormData()
      .title("cz.leaderboard")
      .body({ translate: "system.leaderboard.body" })
      .button({ translate: "sort.chating" })
      .button({ translate: "sort.deaths" })
      .button({ translate: "sort.guild" })
      .button({ translate: "sort.kills" })
      .button({ translate: "sort.money" })
      .button({ translate: "sort.rep" })
      .button({ translate: "sort.specialist" })
      .button({ translate: "sort.voxn" })
      .show(player)
      .then((e) => {
        console.warn(e);
      });
  }

  static userManagement(player: Player): void {
    const ui = new ActionFormData()
      .title(player.name)
      .body({ translate: "cz.user.body" })
      .button({ translate: "user.reset" })
      .button({ translate: "system.transfer" })
      .button({ translate: "system.reload" });

    console.warn(player.playerPermissionLevel);

    if (player.commandPermissionLevel === CommandPermissionLevel.Admin) {
      ui.button({ translate: "user.reset.bal" });
      ui.button({ translate: "user.reset.stamina" });
      ui.button({ translate: "user.reset.temp" });
      ui.button({ translate: "user.reset.thirst" });
      ui.button({ translate: "user.reset.rep" });
      ui.button({ translate: "user.reset.dirty" });
      ui.button({ rawtext: [{ translate: "system.add" }, { text: " $5000" }] });
      ui.button({ rawtext: [{ translate: "system.add" }, { text: " 20 Voxn" }] });
      ui.button({ translate: "user.random.quest" });
    }

    ui.show(player).then((e) => {
      console.warn(e);
    });
  }
}

export { UserPanel };
