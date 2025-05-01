class Calc {
  static specialistLevelUp(level: number): number {
    if (level < 0) throw new Error("Missing level");

    return level * 50 + 50 + (level * 2.5 + 2);
  }
}

export { Calc };
