import { EntityHealthComponent, Vector3, VectorXZ } from "@minecraft/server";

interface SpecialistLevelUp {
  level: number;
  xp: number;
}

/**
 * Utility class to run calculation
 */
class Calc {
  /**
   * Return xp requirement to next level of specialist
   *
   * @param level number, specialist level and number must be positive
   * @returns number
   */
  static specialistLevelUp(level: number = 0): number {
    if (level < 0) throw new Error("Level must be positive");

    return level * 55 + 52 + (level * 2.8 + 5);
  }

  /**
   * Return object result of add level calculation of specialist level
   *
   * @param level number, must be positive
   * @param xp number, number must be positive
   * @returns SpecialistLevelUp = { level: number, xp: number }
   */
  static upSpecialist(level: number, xp: number): SpecialistLevelUp {
    let neededXp = this.specialistLevelUp(level);

    while (xp >= neededXp) {
      xp -= neededXp;
      level++;
      neededXp = this.specialistLevelUp(level);
    }
    return { level, xp };
  }

  /**
   * Return health percentage of entity
   *
   * @param hp EntityHealthComponent, health entity component
   * @returns number
   */
  static hpLostPercentage(hp: EntityHealthComponent): number {
    return 1 - hp.currentValue / hp.effectiveMax;
  }

  /**
   * Return distance 2D of two point
   *
   * @param targetLocation VectorXZ, from location
   * @param baseLocation VectorXZ, to location
   * @returns number, distance
   */
  static distance(targetLocation: VectorXZ, baseLocation: VectorXZ): number {
    return Math.sqrt((targetLocation.x - baseLocation.x) ** 2 + (targetLocation.z - baseLocation.z) ** 2);
  }

  /**
   * Return distance 3D of two point
   *
   * @param targetLocation Vector3, from location
   * @param baseLocation Vector3, to location
   * @returns number, distance
   */
  static distance3(targetLocation: Vector3, baseLocation: Vector3): number {
    return Math.sqrt(
      (targetLocation.x - baseLocation.x) ** 2 +
        (targetLocation.y - baseLocation.y) ** 2 +
        (targetLocation.z - baseLocation.z) ** 2
    );
  }
}

export { Calc, SpecialistLevelUp };
