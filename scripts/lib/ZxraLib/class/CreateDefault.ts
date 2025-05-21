import { Entity, Player, Vector3 } from "@minecraft/server";
import {
  BossChallengeData,
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

  static createBossChallenge(entity: Entity): BossChallengeData {
    return { boss: entity, participants: [] };
  }

  static createVelocityPlayer(player: Player, vel: Vector3 = player.getVelocity()): Vector3 {
    if (!player) throw new Error("Missing player");

    const rot = player.getRotation();
    rot.y = ((rot.y + 45) * Math.PI) / 180;

    const velocity = {
      x: (Math.cos(rot.y) - Math.sin(rot.y)) * 1,
      y: 0,
      z: (Math.sin(rot.y) + Math.cos(rot.y)) * 1,
    };

    return velocity;
  }
}

export { CreateObject };
