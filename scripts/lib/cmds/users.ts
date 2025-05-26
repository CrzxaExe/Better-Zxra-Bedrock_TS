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
import { Command, CreateObject, Terra } from "../ZxraLib/module";

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

        plyr.setGameMode(GameMode.creative);
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

        plyr.setGameMode(GameMode.survival);
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

        plyr.setGameMode(GameMode.adventure);
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

        plyr.setGameMode(GameMode.spectator);
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
    name: "cz:bal",
    description: "cmd.bal",
    permissionLevel: CommandPermissionLevel.Any,
  },
  (origin: CustomCommandOrigin): CustomCommandResult => {
    try {
      system.run(() => {
        if (origin.sourceEntity?.typeId !== "minecraft:player") throw new Error("Not a player");

        const plyr: Player = Terra.getPlayer({ id: origin.sourceEntity.id }) as Player;
        if (!plyr) throw new Error("Not a origin player");

        const data = Terra.getSpecialist(plyr.id) || CreateObject.createSpecialist(plyr);
        plyr.sendMessage({ translate: "system.bal", with: [String(data.money)] });
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
