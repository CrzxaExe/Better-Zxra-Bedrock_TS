import {
  CommandPermissionLevel,
  CustomCommandOrigin,
  CustomCommandParamType,
  CustomCommandResult,
  CustomCommandStatus,
  Player,
  system,
  world,
} from "@minecraft/server";
import { Command, Setting, Terra } from "../ZxraLib/module";
import { ActionFormData } from "@minecraft/server-ui";

Command.add(
  {
    name: "cz:settings",
    description: "cmd.settings",
    permissionLevel: CommandPermissionLevel.GameDirectors,
    optionalParameters: [{ name: "params", type: CustomCommandParamType.String }],
  },
  (origin: CustomCommandOrigin, params: string): CustomCommandResult => {
    try {
      if (origin.sourceEntity?.typeId !== "minecraft:player") throw new Error("Not a player");

      const plyr = Terra.getPlayer({ id: origin.sourceEntity?.id }) as Player;
      if (!plyr) throw new Error("Not a origin player");

      const settings = Terra.world.setting ?? {};
      const content = Object.keys(settings)
        .sort((a, b) => a.localeCompare(b))
        .map((e) => {
          if (e === "rules") return;
          return `${e}: ${settings[e as keyof Setting]}`;
        });

      system.run(() => {
        switch (params) {
          case "open":
            new ActionFormData()
              .title("cz:settings")
              .body({ rawtext: [{ text: content.join("\n") }] })
              .button({ translate: "system.edit" })

              .show(plyr)
              .then((e) => {
                console.warn(e);
              });
            break;
          default: {
            plyr.sendMessage({ translate: "cmd.setting.params" });
          }
        }
      });

      return {
        status: CustomCommandStatus.Success,
      };
    } catch (error: any) {
      console.warn("[System] Error while run command ");
      return {
        status: CustomCommandStatus.Failure,
      };
    }
  }
);
