import { Vector3 } from "@minecraft/server";
import { GachaRarity, GuildData, rarityColor } from "../module";

/**
 * Utility class to formating something to fancy text
 */
class Formater {
  /**
   * Format name with with capitalize first char every words
   *
   * @param name string
   * @returns string
   */
  static formatName(name: string): string {
    return name
      .split(/_| /g)
      .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
      .join(" ");
  }

  /**
   * Format the guild name
   *
   * @param guild GuildData | undefined
   * @returns string
   */
  static formatGuild(guild: GuildData | undefined): string {
    let result: string = "";

    if (guild) result = `[${guild.name}§r§f] `;
    return result;
  }

  /**
   * Format entity location to fancy text
   *
   * @param location Vector3
   * @returns string
   */
  static formatVector3(location: Vector3): string {
    return `${location.x.toFixed(1)} ${location.y.toFixed(1)} ${location.z.toFixed(1)}`;
  }

  /**
   * Format indentifier name to normal name
   *
   * @param name string
   * @returns string
   */
  static formatIdentifier(name: string): string {
    return name.replace("minecraft:", "");
  }

  /**
   * Format text with rarity color
   *
   * @param name string
   * @param format GachaRarity
   * @returns string
   */
  static formatRarity(name: string, format: GachaRarity): string {
    return `${rarityColor[format]}[${name}]§r§f`;
  }
}

export { Formater };
