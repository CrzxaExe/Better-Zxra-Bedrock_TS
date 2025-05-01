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

  static createUUID(length: number = 10): string {
    const chars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

    let result: string = "";
    for (let i = 0; i <= length; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
    return result;
  }
}

export { CreateObject };
