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
import { Command, Terra } from "../ZxraLib/module";
import { ActionFormData } from "@minecraft/server-ui";

Command.add(
  {
    name: "cz:settings",
    description: "cmd.settings",
    permissionLevel: CommandPermissionLevel.GameDirectors,
    mandatoryParameters: [{ name: "params", type: CustomCommandParamType.String }],
  },
  (origin: CustomCommandOrigin, params: string): CustomCommandResult => {
    try {
      if (origin.sourceEntity?.typeId !== "minecraft:player") throw new Error("Not a player");

      const plyr = Terra.getPlayer({ id: origin.sourceEntity?.id }) as Player;
      if (!plyr) throw new Error("Not a origin player");

      system.run(() => {
        switch (params) {
          case "open":
            new ActionFormData()
              .title("cz:settings")
              .body({ rawtext: [{ text: JSON.stringify(Terra.world.setting) }] })
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
