import { CommandPermissionLevel, Player } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import { Quest, Specialist, Terra } from "../module";

class UserPanel {
  static home(player: Player): void {
    new ActionFormData()
      .title("cz:user")
      .body({ rawtext: [{ translate: "system.profileMenu.body" }, { text: "\n\n\n\n\n\n\n\n\n\n\n\n\n" }] })
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
          case 4:
            this.gacha(player);
            break;
          case 5:
            this.quest(player);
            break;
          case 6:
            this.userProfile(player);
            break;
          case 7:
            this.redeem(player);
            break;
          case 8:
            this.wiki(player);
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
    const sp = Terra.getSpecialistCache(player);

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

  static userProfile(player: Player, target: Player = player): void {
    const data = Terra.getSpecialist(target.id);
    const runes = [];
    const weapon = [];

    const guild = Terra.guild.getGuildByPlayer(target);

    for (let i = 1; i <= 3; i++) runes.push(data?.equippedRune[i] || "None");
    for (let i = 1; i <= 2; i++) weapon.push(data?.selectedWeapon[i] || "None");

    const ui = new ActionFormData().title("cz:user").body({
      rawtext: [
        { text: `${target.name} [${data?.title || "§8No title§r§f"}]\n\n` },
        {
          text: `SP Level ${(data?.level.current || 0).toFixed(0)} | §2${(data?.level.xp || 0).toFixed(
            2
          )} XP§f\nPlayer Level ${target.level}\n`,
        },
        { text: "\n" },
        { text: `Guild: [${guild ? guild.name : "§8None"}]§r§f\n` },
        { text: `§a$${(data?.money || 0).toFixed(2)}\n` },
        { text: `§b§lVoxn ${(data?.voxn || 0).toFixed(0)}§r§f\n` },
        { text: `§5Reputation ${data?.rep || 0}\n` },
        { text: "\n" },
        {
          text: `§eStamina ${(data?.stamina.current || 100).toFixed(1)}/${(
            (data?.stamina.max || 100) +
            (data?.stamina.additional || 0) +
            (data?.stamina.rune || 0)
          ).toFixed(1)}${data?.stamina.additional ? " (+" + data.stamina.additional + " Add)" : ""}${
            data?.stamina.rune ? " (+" + data.stamina.rune + " Rune)" : ""
          }\n`,
        },
        {
          text: `§1Thirst ${(data?.thirst.current || 100).toFixed(2)}/${(
            (data?.thirst.max || 100) + (data?.thirst.temp || 0)
          ).toFixed(2)}${data?.thirst.temp ? " (+" + data.thirst.temp + " Temporary)" : ""}§r§f\n`,
        },
        { text: "\n" },
        { text: `Runes: [${runes.join(", ")}]\n` },
        { text: `Weapon: [${weapon.join(", ")}]` },
      ],
    });

    if (target.id === player.id) ui.button({ translate: "system.settings" }, "textures/cz/icon/settings");

    if (Terra.guild.getGuildByPlayer(target))
      ui.button({ translate: "system.guild.invite" }, "textures/cz/icon/guild_add");
    ui.show(player).then((e) => {
      switch (e.selection) {
        case 0:
          this.userManagement(player);
      }
    });
  }
  static userManagement(player: Player, sp: Specialist = Terra.getSpecialistCache(player)): void {
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
      switch (e.selection) {
        case 3:
          sp.setMoney(0);
          break;
        case 4:
          sp.setStamina(100);
          sp.setMaxStamina("max", 100);
          sp.setMaxStamina("additional", 0);
          sp.setMaxStamina("rune", 0);
          break;
      }
    });
  }

  static gacha(player: Player): void {
    const ui = new ActionFormData()
      .title({ translate: "cz.gacha" })
      .body({ translate: "cz.gacha.body" })
      .button({ translate: "gacha.weapon" })
      .button({ translate: "gacha.rune" })
      .button({ translate: "gacha.exchange" })

      .show(player)
      .then((e) => {
        console.warn("test");
      });
  }

  static quest(player: Player): void {
    const quest = new Quest(player);

    const data = quest.getPlayerQuest();
    if (data.id < 1) {
      player.sendMessage({ translate: "quest.nope" });
      return;
    }

    const questInfo = quest.getQuest(data.id);

    if (!questInfo) {
      player.sendMessage({ translate: "quest.nope" });
      return;
    }

    new ActionFormData()
      .title("cz:quest")
      .body({
        rawtext: [
          { translate: `${questInfo.title}` },
          { text: "\n \n" },
          { translate: `${questInfo.title + ".des"}` },
          { text: `\n${quest.rawAct(questInfo)}\n\n` },
          { translate: "system.reward" },
          { text: `${quest.rawReward(questInfo)}` },
        ],
      })
      .button({ translate: "cz.back" })

      .show(player);
  }

  static redeem(player: Player): void {
    new ModalFormData()
      .title("cz:redeem")
      .textField({ translate: "input.code" }, { translate: "type.string" }, { tooltip: "system.info.code" })

      .show(player)
      .then((e) => {
        const [code] = e.formValues && typeof e.formValues[0] === "string" ? e.formValues[0] : "";

        console.warn(code);
      });
  }

  static wiki(player: Player): void {
    new ActionFormData()
      .title("cz:wiki")
      .body({ translate: "cz.wiki.body" })
      .button({ translate: "wiki.about" })

      .show(player)
      .then((e) => {
        console.warn("test");
      });
  }
}

export { UserPanel };
