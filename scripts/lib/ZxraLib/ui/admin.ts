import { Player } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import { Terra } from "../module";

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
          case 1:
            Terra.save(true);
            this.home(player);
            break;
          case 2:
            this.exportData(player);
            break;
        }
      });
  }

  static exportData(player: Player): void {
    const data = {
      world: Terra.world,
      specialist: Terra.specialist,
      story: Terra.story,
      pityPlayer: Terra.pityPlayer,
      weaponComponent: Terra.weaponComponent,
      bossChallenge: Terra.bossChallenge,
      waveChallenge: Terra.waveChallenge,
    };

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
}

export { AdminPanel };
