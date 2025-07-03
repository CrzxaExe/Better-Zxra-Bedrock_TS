import { Entity as mcEntity, Player } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { CreateObject, Entity, EntityData, npcFile, Terra, YuriConst, YuriModels } from "../../module";

interface Yuri {
  source: mcEntity;
  ent: Entity;
}

class Yuri {
  constructor(source: mcEntity) {
    if (!source) throw new Error("Missing source");
    if (source.typeId !== "cz:yuri") throw new Error("Source not Yuri Entity");

    this.source = source;
    this.ent = new Entity(source);
  }

  getData(): EntityData {
    const data: EntityData = this.ent.getEnt();

    return data.npc ? data : CreateObject.createNpcData(this.source, data);
  }

  ui(player: Player): void {
    const yuri: YuriConst = npcFile.yuri;
    const randomGreet: string = yuri.data.greet[Math.floor(Math.random() * yuri.data.greet.length)];

    new ActionFormData()
      .title(`cz:yuri_menu${String(this.source.getComponent("variant")?.value || 0)}`)
      .body({ text: randomGreet })

      .button({ translate: "yuri.action" })
      .button({ translate: "yuri.talking" })
      .button({ translate: "yuri.gift" })

      .show(player)
      .then((e) => {
        switch (e.selection) {
          case 0:
            this.actionUi(player);
            break;
        }
      });
  }

  actionUi(player: Player): void {
    new ActionFormData()
      .title(`cz:yuri_menu${this.source.getComponent("variant")?.value || 0}`)
      .body({ translate: "yuri.action.body" })
      .button({ translate: "yuri.move" })
      .button({ translate: "yuri.changeSkin" })
      .button({ translate: "yuri.scale" })
      .show(player)
      .then((e) => {
        switch (e.selection) {
          case 1:
            this.skinUi(player);
            break;
        }
      });
  }

  skinUi(player: Player): void {
    new ActionFormData()
      .title(`cz:skins`)
      .body({ translate: "yuri.ask.skin" })
      .button({ translate: "yuri.skin.normal" }, "textures/cz/art/yuri/preview/normal.png")
      .button({ translate: "yuri.skin.combat" }, "textures/cz/art/yuri/preview/combat.png")
      .button({ translate: "yuri.skin.cheerleader" }, "textures/cz/art/yuri/preview/cheerleader.png")

      .show(player);
  }
}

export { Yuri };
