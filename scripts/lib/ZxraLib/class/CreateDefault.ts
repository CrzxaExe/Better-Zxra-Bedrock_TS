import { Entity, Player } from "@minecraft/server";
import { defaultEntity, defaultSpecialist, EntityData, SpecialistData } from "../module";

class CreateObject {
  static createEntity(entity: Entity): EntityData {
    if (!entity) throw new Error("Missing entity");

    const data = { ...defaultEntity, id: entity.id };
    return data;
  }

  static createSpecialist(player: Player): SpecialistData {
    if (!player) throw new Error("Missing player");

    const data: SpecialistData = { ...defaultSpecialist, id: player.id };
    return data;
  }
}

export { CreateObject };
