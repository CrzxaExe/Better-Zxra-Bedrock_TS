import {
  PlayerJoinAfterEvent,
  PlayerLeaveAfterEvent,
  PlayerLeaveBeforeEvent,
  PlayerSpawnAfterEvent,
  world,
} from "@minecraft/server";
import { Terra } from "../ZxraLib/module";

// Join event
world.afterEvents.playerJoin.subscribe((event: PlayerJoinAfterEvent) => {});

// Player Spawn event
world.afterEvents.playerSpawn.subscribe(({ initialSpawn, player }: PlayerSpawnAfterEvent) => {
  if (initialSpawn) {
    Terra.setPlayer(world.getAllPlayers());
    Terra.createSpecialistCache();
  }
});

// Leave event
world.afterEvents.playerLeave.subscribe((event: PlayerLeaveAfterEvent) => {
  Terra.setPlayer(world.getAllPlayers());
  Terra.createSpecialistCache();
});

// Before Leave event
world.beforeEvents.playerLeave.subscribe((event: PlayerLeaveBeforeEvent) => {
  if (Terra.players.length - 1 <= 0) {
    Terra.save();
  }
});
