import { GuildData } from "../module";

class Formater {
  static formatName(name: string): string {
    return name
      .split("_")
      .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
      .join(" ");
  }

  static formatGuild(guild: GuildData | undefined): string {
    let result: string = "";

    if (guild) result = `[${guild.name}]§r§f `;
    return result;
  }
}

export { Formater };
