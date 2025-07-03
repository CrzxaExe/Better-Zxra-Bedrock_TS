import { Entity, Player } from "@minecraft/server";
import { durabilityControl, ItemRegister } from "../../module";

ItemRegister.add("cz:durability", {
  onMineBlock(event) {
    const { source }: { source: Entity | Player } = event;

    durabilityControl(source, 1);
  },
  onHitEntity(event) {
    const { attackingEntity }: { attackingEntity: Entity | Player } = event;

    durabilityControl(attackingEntity, 2);
  },
});
