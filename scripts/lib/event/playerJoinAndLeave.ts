import { PlayerJoinAfterEvent, PlayerLeaveAfterEvent, world } from "@minecraft/server";
import { Terra } from "../ZxraLib/module";

// Join event
world.afterEvents.playerJoin.subscribe((event: PlayerJoinAfterEvent) => {
  Terra.setPlayer(world.getAllPlayers());
});

// Leave event
world.afterEvents.playerLeave.subscribe((event: PlayerLeaveAfterEvent) => {
  Terra.setPlayer(world.getAllPlayers());
});
