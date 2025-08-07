import { StartupEvent, system, world, WorldLoadAfterEvent } from "@minecraft/server";
import { commandEnums, Terra } from "../ZxraLib/module";

world.afterEvents.worldLoad.subscribe(({}: WorldLoadAfterEvent) => {
  console.warn("[System] Loading players");

  Terra.setPlayer(world.getAllPlayers());
});

// Registry
system.beforeEvents.startup.subscribe(
  ({ customCommandRegistry, blockComponentRegistry, itemComponentRegistry }: StartupEvent) => {
    console.warn("[System] Start loading custom features");

    Terra.setupCommandEnums(customCommandRegistry, commandEnums);
    Terra.setupCommand(customCommandRegistry);
    Terra.setupBlockComponent(blockComponentRegistry);
    Terra.setupItemComponent(itemComponentRegistry);
  }
);
