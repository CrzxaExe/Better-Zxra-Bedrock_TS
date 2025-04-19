import { Player, system, world } from "@minecraft/server";
import { Specialist, Terra, ZxraLib } from "./lib/ZxraLib/module";

// Event imports
import "./lib/event/chatSend";
import "./lib/event/playerJoinAndLeave";
import "./lib/event/skill";
import "./lib/event/worldInitialize";

// Info Version
console.warn(`
Using Better Zxra Bedrock v${ZxraLib.packVersion}
ZxraLib v${ZxraLib.version}`);

Terra.setup();

if (Terra.world.setting?.debug) console.warn(JSON.stringify(Terra.world));

// Main Ticking
function mainTick(): void {
  try {
    //  Activity tick
    if (system.currentTick % 5 === 0) {
      Terra.getActiveDimension().forEach((e) => {});

      Terra.players.forEach((player: Player) => {
        const sp = new Specialist(player);

        sp.controllerUI();
      });
    }

    // Save Intervals
    if (system.currentTick % (Terra.world.setting?.saveInterval || 400) /* 20 sec */ === 0) {
      Terra.save();
      Terra.setPlayer(world.getAllPlayers());
    }
  } catch (err: { message: string } | any) {
    console.warn("[Tick] Error on: ", err.message);
  }

  system.run(mainTick);
}

system.run(mainTick);
