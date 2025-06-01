import { StartupEvent, system, world, WorldLoadAfterEvent } from "@minecraft/server";
import { Terra } from "../ZxraLib/module";

world.afterEvents.worldLoad.subscribe(({}: WorldLoadAfterEvent) => {
  console.warn("[System] Loading players");

  Terra.setPlayer(world.getAllPlayers());
});

// Registry
system.beforeEvents.startup.subscribe(({ customCommandRegistry, blockComponentRegistry }: StartupEvent) => {
  console.warn("[System] Start loading custom features");

  Terra.setupCommand(customCommandRegistry);
  Terra.setupBlockComponent(blockComponentRegistry);
});
