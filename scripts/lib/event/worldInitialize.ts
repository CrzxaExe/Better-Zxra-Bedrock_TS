import { world, WorldLoadAfterEvent } from "@minecraft/server";
import { Terra } from "../ZxraLib/module";

world.afterEvents.worldLoad.subscribe(() => {
  Terra.setPlayer(world.getAllPlayers());
});
