import { BlockRegister } from "../../module";

BlockRegister.add("cz:chair", {
  onPlayerInteract({ player, block, dimension }) {
    if (!player) return;

    const sit = dimension.spawnEntity("cz:seat", {
      x: block.location.x + 0.5,
      y: block.location.y + 0.52,
      z: block.location.z + 0.5,
    });

    sit.runCommand(`ride ${player.name} start_riding @s`);
  },
});

BlockRegister.add("cz:generator", {
  onPlayerInteract({ block }) {},
});
