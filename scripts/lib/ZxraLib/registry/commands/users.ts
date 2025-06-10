import {
  CommandPermissionLevel,
  CustomCommandOrigin,
  CustomCommandParamType,
  CustomCommandResult,
  CustomCommandStatus,
  GameMode,
  Player,
  system,
  world,
} from "@minecraft/server";
import { Command, CreateObject, Terra, UserPanel } from "../../module";

Command.add(
  {
    name: "cz:test",
    description: "cmd.test",
    permissionLevel: CommandPermissionLevel.Any,
  },
  (): CustomCommandResult => {
    try {
      world.sendMessage("Test");

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

// Gamemode
Command.add(
  {
    name: "cz:gmc",
    description: "cmd.gmc",
    permissionLevel: CommandPermissionLevel.GameDirectors,
  },
  (origin: CustomCommandOrigin): CustomCommandResult => {
    try {
      system.run(() => {
        world.sendMessage("Set to creative mode");

        if (origin.sourceEntity?.typeId !== "minecraft:player") throw new Error("Not a player");

        const plyr: Player = Terra.getPlayer({ id: origin.sourceEntity.id }) as Player;
        if (!plyr) throw new Error("Not a origin player");

        plyr.setGameMode(GameMode.Creative);
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
    name: "cz:gms",
    description: "cmd.gms",
    permissionLevel: CommandPermissionLevel.GameDirectors,
  },
  (origin: CustomCommandOrigin): CustomCommandResult => {
    try {
      system.run(() => {
        world.sendMessage("Set to surivival mode");

        if (origin.sourceEntity?.typeId !== "minecraft:player") throw new Error("Not a player");

        const plyr: Player = Terra.getPlayer({ id: origin.sourceEntity.id }) as Player;
        if (!plyr) throw new Error("Not a origin player");

        plyr.setGameMode(GameMode.Survival);
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
    name: "cz:gma",
    description: "cmd.gma",
    permissionLevel: CommandPermissionLevel.GameDirectors,
  },
  (origin: CustomCommandOrigin): CustomCommandResult => {
    try {
      system.run(() => {
        world.sendMessage("Set to adventure mode");

        if (origin.sourceEntity?.typeId !== "minecraft:player") throw new Error("Not a player");

        const plyr: Player = Terra.getPlayer({ id: origin.sourceEntity.id }) as Player;
        if (!plyr) throw new Error("Not a origin player");

        plyr.setGameMode(GameMode.Adventure);
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
    name: "cz:gmsp",
    description: "cmd.gmsp",
    permissionLevel: CommandPermissionLevel.GameDirectors,
  },
  (origin: CustomCommandOrigin): CustomCommandResult => {
    try {
      system.run(() => {
        world.sendMessage("Set to spectator mode");

        if (origin.sourceEntity?.typeId !== "minecraft:player") throw new Error("Not a player");

        const plyr: Player = Terra.getPlayer({ id: origin.sourceEntity.id }) as Player;
        if (!plyr) throw new Error("Not a origin player");

        plyr.setGameMode(GameMode.Spectator);
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

// Currency
Command.add(
  {
    name: "cz:bal",
    description: "cmd.bal",
    permissionLevel: CommandPermissionLevel.Any,
    optionalParameters: [{ name: "target", type: CustomCommandParamType.PlayerSelector }],
  },
  (origin: CustomCommandOrigin, target: Player | undefined): CustomCommandResult => {
    try {
      system.run(() => {
        if (origin.sourceEntity?.typeId !== "minecraft:player") throw new Error("Not a player");

        const plyr: Player = Terra.getPlayer({ id: target?.id || origin.sourceEntity.id }) as Player;
        if (!plyr) throw new Error("Not a origin player");

        const data = Terra.getSpecialist(plyr.id) || CreateObject.createSpecialist(plyr);
        plyr.sendMessage({ translate: "system.bal", with: [String(plyr.name), String(data.money)] });
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
    name: "cz:voxn",
    description: "cmd.voxn",
    permissionLevel: CommandPermissionLevel.Any,
    optionalParameters: [{ name: "target", type: CustomCommandParamType.PlayerSelector }],
  },
  (origin: CustomCommandOrigin, target: Player | undefined): CustomCommandResult => {
    try {
      system.run(() => {
        if (origin.sourceEntity?.typeId !== "minecraft:player") throw new Error("Not a player");

        const plyr: Player = Terra.getPlayer({ id: target?.id || origin.sourceEntity.id }) as Player;
        if (!plyr) throw new Error("Not a origin player");

        const data = Terra.getSpecialist(plyr.id) || CreateObject.createSpecialist(plyr);
        plyr.sendMessage({ translate: "system.voxn", with: [String(plyr.name), String(data.voxn)] });
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

// Top
Command.add(
  {
    name: "cz:baltop",
    description: "cmd.baltop",
    permissionLevel: CommandPermissionLevel.Any,
    optionalParameters: [{ name: "max", type: CustomCommandParamType.Integer }],
  },
  (origin: CustomCommandOrigin, max: number = 10): CustomCommandResult => {
    try {
      system.run(() => {
        if (origin.sourceEntity?.typeId !== "minecraft:player") throw new Error("Not a player");

        const plyr: Player = Terra.getPlayer({ id: origin.sourceEntity.id }) as Player;
        if (!plyr) throw new Error("Not a origin player");

        const data = Terra.specialist
          .sort((a, b) => a.money - b.money)
          .map((e, i) => {
            const py = Terra.getPlayer({ id: e.id }) as Player;

            return `${i + 1}. ${py.name} - $${e.money}`;
          });

        plyr.sendMessage(data.slice(0, max).join("\n"));
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
    name: "cz:voxntop",
    description: "cmd.voxntop",
    permissionLevel: CommandPermissionLevel.Any,
    optionalParameters: [{ name: "max", type: CustomCommandParamType.Integer }],
  },
  (origin: CustomCommandOrigin, max: number = 10): CustomCommandResult => {
    try {
      system.run(() => {
        if (origin.sourceEntity?.typeId !== "minecraft:player") throw new Error("Not a player");

        const plyr: Player = Terra.getPlayer({ id: origin.sourceEntity.id }) as Player;
        if (!plyr) throw new Error("Not a origin player");

        const data = Terra.specialist
          .sort((a, b) => a.voxn - b.voxn)
          .map((e, i) => {
            const py = Terra.getPlayer({ id: e.id }) as Player;

            return `${i + 1}. ${py.name} - $${e.voxn} Voxn`;
          });

        plyr.sendMessage(data.slice(0, max).join("\n"));
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
    name: "cz:menu",
    description: "cmd.menu",
    permissionLevel: CommandPermissionLevel.Any,
  },
  (origin: CustomCommandOrigin): CustomCommandResult => {
    try {
      system.run(() => {
        if (origin.sourceEntity?.typeId !== "minecraft:player") throw new Error("Not a player");

        const plyr: Player = Terra.getPlayer({ id: origin.sourceEntity.id }) as Player;
        if (!plyr) throw new Error("Not a origin player");

        UserPanel.home(plyr);
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
