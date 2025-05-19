import { Entity, Player } from "@minecraft/server";
import {
  defaultEntity,
  defaultPity,
  defaultSpecialist,
  EntityData,
  LeaderboardData,
  PityPlayer,
  SpecialistData,
  Terra,
  WeaponComponent,
} from "../module";

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

  static createUUID(length: number = Terra.world.setting?.uuidLength || 12): string {
    const chars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

    let result: string = "";
    for (let i = 0; i <= length; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
    return result;
  }

  static createPity(player: Player): PityPlayer {
    const data = { ...defaultPity, id: player.id };

    return data;
  }

  static createLeaderboard(): LeaderboardData {
    return { chat: [], deaths: [], kills: [] };
  }

  static createWeaponComponent(id: string): WeaponComponent {
    return { id, components: [], attributes: [] };
  }
}

export { CreateObject };
