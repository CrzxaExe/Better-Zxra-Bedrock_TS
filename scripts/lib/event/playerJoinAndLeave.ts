import { PlayerJoinAfterEvent, PlayerLeaveAfterEvent, world } from "@minecraft/server";
import { Terra } from "../ZxraLib/module";

// Join event
world.afterEvents.playerJoin.subscribe((event: PlayerJoinAfterEvent) => {
  const { playerId } = event;

  Terra.addPlayer(Terra.getWorldPlayerById(playerId));
});

// Leave event
world.afterEvents.playerLeave.subscribe((event: PlayerLeaveAfterEvent) => {
  const { playerId } = event;

  Terra.delPlayer(playerId);
});
