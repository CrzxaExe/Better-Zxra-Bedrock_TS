class Formater {
  static formatName(name: string): string {
    return name
      .split("_")
      .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
      .join(" ");
  }
}

export { Formater };
