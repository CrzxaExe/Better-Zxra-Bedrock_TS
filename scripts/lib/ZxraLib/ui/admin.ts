import { Player } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import { Setting, settings, Terra } from "../module";

class AdminPanel {
  static home(player: Player): void {
    new ActionFormData()
      .title("cz:admin_panel")
      .body({ translate: "cz.admin_panel.body" })
      .button({ translate: "system.change.settings" })
      .button({ translate: "system.save" })
      .button({ translate: "system.worldData.export" })
      .button({ translate: "system.worldData.import" })

      .show(player)
      .then((e) => {
        if (e.canceled) return;

        switch (e.selection) {
          case 0:
            this.settings(player);
            break;
          case 1:
            Terra.save(true);
            this.home(player);
            break;
          case 2:
            this.exportData(player);
            break;
          case 3:
            this.importData(player);
            break;
        }
      });
  }

  static settings(player: Player): void {
    const {
      // General
      debug,
      uiLevelRequirement,
      useBzbRules,
      uuidLength,
      saveInterval,
      whatSeeDistance,
      //  Features
      customChat,
      customChatPrefix,
      damageIndicator,
      deathLocation,
      guildCreateCost,
      shopMultiplier,
      starterItemMessage,
      starterItems,
      staterItem,
      xpMultiplier,
      // Stamina
      staminaAction,
      staminaCooldown,
      staminaExhaust,
      staminaHurt,
      staminaRecovery,
      staminaRun,
      // Thirst
      thirstRun,
    }: Setting = Terra.world.setting || settings;

    new ModalFormData()
      .title("cz:admin_settings")
      // General
      .label({ translate: "option.label.general" })
      .toggle({ translate: "option.debug" }, { defaultValue: debug })
      .textField(
        { translate: "option.uuidLength" },
        { translate: "type.integer" },
        { defaultValue: String(uuidLength) }
      )
      .toggle({ translate: "option.uiLevelRequirement" }, { defaultValue: uiLevelRequirement })
      .toggle({ translate: "option.useBzbRules" }, { defaultValue: useBzbRules })
      .textField(
        { translate: "option.saveInterval" },
        { translate: "type.tick" },
        { defaultValue: String(saveInterval), tooltip: "type.tick.tooltip" }
      )
      .textField(
        { translate: "option.whatSeeDistance" },
        { translate: "type.tick" },
        { defaultValue: String(whatSeeDistance) }
      )
      .divider()
      // Features
      .label({ translate: "option.label.features" })
      .toggle({ translate: "option.customChat" }, { defaultValue: customChat })
      .textField(
        { translate: "option.customChatPrefix" },
        { translate: "type.string" },
        { defaultValue: customChatPrefix }
      )
      .toggle({ translate: "option.damageIndicator" }, { defaultValue: damageIndicator })
      .toggle({ translate: "option.deathLocation" }, { defaultValue: deathLocation })
      .textField(
        { translate: "option.guildCreateCost" },
        { translate: "type.number" },
        { defaultValue: String(guildCreateCost) }
      )
      .divider()
      // Stamina
      .label({ translate: "option.label.stamina" })
      .textField(
        { translate: "option.staminaAction" },
        { translate: "type.float" },
        { defaultValue: String(staminaAction) }
      )
      .toggle({ translate: "option.staminaCooldown" }, { defaultValue: staminaCooldown })
      .textField(
        { translate: "option.staminaExhaust" },
        { translate: "type.float" },
        { defaultValue: String(staminaExhaust) }
      )
      .textField(
        { translate: "option.staminaHurt" },
        { translate: "type.float" },
        { defaultValue: String(staminaHurt) }
      )
      .textField(
        { translate: "option.staminaRecovery" },
        { translate: "type.float" },
        { defaultValue: String(staminaRecovery) }
      )
      .textField({ translate: "option.staminaRun" }, { translate: "type.float" }, { defaultValue: String(staminaRun) })
      .divider()
      // Thirst
      .label({ translate: "option.label.thirst" })

      .submitButton({ translate: "option.submit" })
      .show(player)
      .then((e) => {
        if (e.canceled) return;

        const formValues = e.formValues ?? [];
      });
  }

  static exportData(player: Player): void {
    const data = Terra.exportDataToJSON();

    new ModalFormData()
      .title("cz:admin_export")
      .textField(
        { translate: "system.export.data" },
        { translate: "type.string" },
        { defaultValue: JSON.stringify(data) }
      )
      .submitButton({ translate: "system.ok" })

      .show(player)
      .then((e) => {
        if (e.canceled) return;

        this.home(player);
      });
  }

  static importData(player: Player): void {
    new ModalFormData()
      .title("cz:admin_import")
      .textField({ translate: "system.import" }, { translate: "type.string" })
      .show(player)
      .then((e) => {
        if (e.canceled) return;
      });
  }
}

export { AdminPanel };
