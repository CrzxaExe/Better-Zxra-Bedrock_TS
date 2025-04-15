import { system } from "@minecraft/server";
import { Terra, ZxraLib } from "./lib/ZxraLib/module";

// Event imports
import "./lib/event/chatSend";
import "./lib/event/playerJoinAndLeave";
import "./lib/event/worldInitialize";

// Info Version
console.warn(`
Using Better Zxra Bedrock v${ZxraLib.packVersion}
ZxraLib v${ZxraLib.version}`);

Terra.setup();

if (Terra.world.setting?.debug) console.warn(JSON.stringify(Terra.world));

// Main Ticking
// system.runInterval(() => {
//   console.warn(JSON.stringify(Terra.players));
// }, 10);
