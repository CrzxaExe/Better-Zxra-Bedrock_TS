import { EntityHealthComponent, Vector3, VectorXZ } from "@minecraft/server";

interface SpecialistLevelUp {
  level: number;
  xp: number;
}

class Calc {
  static specialistLevelUp(level: number): number {
    if (level < 0) throw new Error("Missing level");

    return level * 55 + 52 + (level * 2.8 + 5);
  }

  static upSpecialist(level: number, xp: number): SpecialistLevelUp {
    let neededXp = this.specialistLevelUp(level);

    while (xp >= neededXp) {
      xp -= neededXp;
      level++;
      neededXp = this.specialistLevelUp(level);
    }
    return { level, xp };
  }

  static hpLostPercentage(hp: EntityHealthComponent): number {
    return 1 - hp.currentValue / hp.effectiveMax;
  }

  static distance(targetLocation: VectorXZ, baseLocation: VectorXZ): number {
    return Math.sqrt((targetLocation.x - baseLocation.x) ** 2 + (targetLocation.z - baseLocation.z) ** 2);
  }

  static distance3(targetLocation: Vector3, baseLocation: Vector3): number {
    return Math.sqrt(
      (targetLocation.x - baseLocation.x) ** 2 +
        (targetLocation.y - baseLocation.y) ** 2 +
        (targetLocation.z - baseLocation.z) ** 2
    );
  }
}

export { Calc, SpecialistLevelUp };
