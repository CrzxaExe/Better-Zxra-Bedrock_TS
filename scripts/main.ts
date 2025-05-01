import { Dimension, Player, system, world } from "@minecraft/server";
import { Entity, NOT_ALLOWED_ENTITY_TICK, Specialist, Terra, ZxraLib } from "./lib/ZxraLib/module";

// Event imports
import "./lib/event/chatSend";
import "./lib/event/entityAction";
import "./lib/event/entityActivity";
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
      Terra.players.forEach((player: Player) => {
        const sp = new Specialist(player);

        sp.controllerActionBar();
        sp.controllerStamina();
        sp.controllerThirst();
        sp.controllerUI();
        sp.controllerCooldown();
      });

      Terra.getActiveDimension().forEach((dimension: Dimension) => {
        dimension.getEntities({ excludeTypes: NOT_ALLOWED_ENTITY_TICK }).forEach((e) => {
          new Entity(e).controllerStatus();
        });
      });
    }

    // Save Intervals
    if (system.currentTick % (Terra.world.setting?.saveInterval || 400) /* 20 sec */ === 0) {
      Terra.save(false);
      Terra.setPlayer(world.getAllPlayers());
    }
  } catch (err: { message: string } | any) {
    console.warn("[Tick] Error on: ", err.message);
  }

  system.run(mainTick);
}

system.run(mainTick);
