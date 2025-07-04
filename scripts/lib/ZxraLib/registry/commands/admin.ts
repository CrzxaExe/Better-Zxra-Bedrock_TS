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
import { Command, Setting, Terra } from "../../module";
import { ActionFormData } from "@minecraft/server-ui";

// Settings
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

// Voxn
Command.add(
  {
    name: "cz:addvoxn",
    description: "cmd.addvoxn",
    permissionLevel: CommandPermissionLevel.GameDirectors,
    mandatoryParameters: [
      { name: "target", type: CustomCommandParamType.PlayerSelector },
      { name: "value", type: CustomCommandParamType.Integer },
    ],
  },
  (origin: CustomCommandOrigin, target: Player | undefined, value: number): CustomCommandResult => {
    try {
      system.run(() => {
        if (!target) throw new Error("Target not found");
        if ((target.typeId || origin.sourceEntity?.typeId) !== "minecraft:player") throw new Error("Not a player");

        const plyr: Player = Terra.getPlayer({ id: target?.id || origin.sourceEntity?.id }) as Player;
        if (!plyr) throw new Error("Not a origin player");

        const sp = Terra.getSpecialistCache(plyr);

        sp.addVoxn(value);
        plyr.sendMessage({ translate: "system.addvoxn", with: [String(plyr.name), String(value)] });
      });

      return {
        status: CustomCommandStatus.Success,
      };
    } catch (error: any) {
      console.warn("[System] Error while run command " + error.message);
      return {
        status: CustomCommandStatus.Failure,
      };
    }
  }
);
Command.add(
  {
    name: "cz:minvoxn",
    description: "cmd.minvoxn",
    permissionLevel: CommandPermissionLevel.GameDirectors,
    mandatoryParameters: [
      { name: "target", type: CustomCommandParamType.PlayerSelector },
      { name: "value", type: CustomCommandParamType.Integer },
    ],
  },
  (origin: CustomCommandOrigin, target: Player | undefined, value: number): CustomCommandResult => {
    try {
      system.run(() => {
        if (!target) throw new Error("Target not found");
        if ((target.typeId || origin.sourceEntity?.typeId) !== "minecraft:player") throw new Error("Not a player");

        const plyr: Player = Terra.getPlayer({ id: target?.id || origin.sourceEntity?.id }) as Player;
        if (!plyr) throw new Error("Not a origin player");

        const sp = Terra.getSpecialistCache(plyr);

        sp.minVoxn(value);
        plyr.sendMessage({ translate: "system.minvoxn", with: [String(plyr.name), String(value)] });
      });

      return {
        status: CustomCommandStatus.Success,
      };
    } catch (error: any) {
      console.warn("[System] Error while run command " + error.message);
      return {
        status: CustomCommandStatus.Failure,
      };
    }
  }
);
Command.add(
  {
    name: "cz:setvoxn",
    description: "cmd.setvoxn",
    permissionLevel: CommandPermissionLevel.GameDirectors,
    mandatoryParameters: [
      { name: "target", type: CustomCommandParamType.PlayerSelector },
      { name: "value", type: CustomCommandParamType.Integer },
    ],
  },
  (origin: CustomCommandOrigin, target: Player | undefined, value: number): CustomCommandResult => {
    try {
      system.run(() => {
        if (!target) throw new Error("Target not found");
        if ((target.typeId || origin.sourceEntity?.typeId) !== "minecraft:player") throw new Error("Not a player");

        const plyr: Player = Terra.getPlayer({ id: target?.id || origin.sourceEntity?.id }) as Player;
        if (!plyr) throw new Error("Not a origin player");

        const sp = Terra.getSpecialistCache(plyr);

        sp.setVoxn(value);
        plyr.sendMessage({ translate: "system.setvoxn", with: [String(plyr.name), String(value)] });
      });

      return {
        status: CustomCommandStatus.Success,
      };
    } catch (error: any) {
      console.warn("[System] Error while run command " + error.message);
      return {
        status: CustomCommandStatus.Failure,
      };
    }
  }
);

// Money
Command.add(
  {
    name: "cz:addbal",
    description: "cmd.addbal",
    permissionLevel: CommandPermissionLevel.GameDirectors,
    mandatoryParameters: [
      { name: "target", type: CustomCommandParamType.PlayerSelector },
      { name: "value", type: CustomCommandParamType.Float },
    ],
  },
  (origin: CustomCommandOrigin, target: Player | undefined, value: number): CustomCommandResult => {
    try {
      system.run(() => {
        if (!target) throw new Error("Target not found");
        if ((target.typeId || origin.sourceEntity?.typeId) !== "minecraft:player") throw new Error("Not a player");

        const plyr: Player = Terra.getPlayer({ id: target?.id || origin.sourceEntity?.id }) as Player;
        if (!plyr) throw new Error("Not a origin player");

        const sp = Terra.getSpecialistCache(plyr);

        sp.addMoney(value);
        plyr.sendMessage({ translate: "system.addbal", with: [String(plyr.name), String(value)] });
      });

      return {
        status: CustomCommandStatus.Success,
      };
    } catch (error: any) {
      console.warn("[System] Error while run command " + error.message);
      return {
        status: CustomCommandStatus.Failure,
      };
    }
  }
);
Command.add(
  {
    name: "cz:minbal",
    description: "cmd.minbal",
    permissionLevel: CommandPermissionLevel.GameDirectors,
    mandatoryParameters: [
      { name: "target", type: CustomCommandParamType.PlayerSelector },
      { name: "value", type: CustomCommandParamType.Float },
    ],
  },
  (origin: CustomCommandOrigin, target: Player | undefined, value: number): CustomCommandResult => {
    try {
      system.run(() => {
        if (!target) throw new Error("Target not found");
        if ((target.typeId || origin.sourceEntity?.typeId) !== "minecraft:player") throw new Error("Not a player");

        const plyr: Player = Terra.getPlayer({ id: target?.id || origin.sourceEntity?.id }) as Player;
        if (!plyr) throw new Error("Not a origin player");

        const sp = Terra.getSpecialistCache(plyr);

        sp.minMoney(value);
        plyr.sendMessage({ translate: "system.minbal", with: [String(plyr.name), String(value)] });
      });

      return {
        status: CustomCommandStatus.Success,
      };
    } catch (error: any) {
      console.warn("[System] Error while run command " + error.message);
      return {
        status: CustomCommandStatus.Failure,
      };
    }
  }
);
Command.add(
  {
    name: "cz:setbal",
    description: "cmd.setbal",
    permissionLevel: CommandPermissionLevel.GameDirectors,
    mandatoryParameters: [
      { name: "target", type: CustomCommandParamType.PlayerSelector },
      { name: "value", type: CustomCommandParamType.Float },
    ],
  },
  (origin: CustomCommandOrigin, target: Player | undefined, value: number): CustomCommandResult => {
    try {
      system.run(() => {
        if (!target) throw new Error("Target not found");
        if ((target.typeId || origin.sourceEntity?.typeId) !== "minecraft:player") throw new Error("Not a player");

        const plyr: Player = Terra.getPlayer({ id: target?.id || origin.sourceEntity?.id }) as Player;
        if (!plyr) throw new Error("Not a origin player");

        const sp = Terra.getSpecialistCache(plyr);

        sp.setMoney(value);
        plyr.sendMessage({ translate: "system.setbal", with: [String(plyr.name), String(value)] });
      });

      return {
        status: CustomCommandStatus.Success,
      };
    } catch (error: any) {
      console.warn("[System] Error while run command " + error.message);
      return {
        status: CustomCommandStatus.Failure,
      };
    }
  }
);
