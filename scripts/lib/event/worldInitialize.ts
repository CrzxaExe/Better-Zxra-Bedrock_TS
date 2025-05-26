import { StartupEvent, system, world, WorldLoadAfterEvent } from "@minecraft/server";
import { Terra } from "../ZxraLib/module";

world.afterEvents.worldLoad.subscribe(({}: WorldLoadAfterEvent) => {
  console.warn("[System] Loading players");

  Terra.setPlayer(world.getAllPlayers());
});

system.beforeEvents.startup.subscribe(({ customCommandRegistry }: StartupEvent) => {
  console.warn("[System] Start loading custom commands");

  Terra.setupCommand(customCommandRegistry);
});
