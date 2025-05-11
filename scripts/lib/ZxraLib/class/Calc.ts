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
}

export { Calc, SpecialistLevelUp };
