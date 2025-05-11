import { world, WorldLoadAfterEvent } from "@minecraft/server";
import { Terra } from "../ZxraLib/module";

world.afterEvents.worldLoad.subscribe(() => {
  console.warn("[System] Load players");

  Terra.setPlayer(world.getAllPlayers());
});
