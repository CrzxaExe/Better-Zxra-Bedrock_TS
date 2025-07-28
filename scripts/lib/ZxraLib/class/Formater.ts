import { Vector3 } from "@minecraft/server";
import { GachaRarity, GuildData, rarityColor } from "../module";

class Formater {
  static formatName(name: string): string {
    return name
      .split(/_| /g)
      .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
      .join(" ");
  }

  static formatGuild(guild: GuildData | undefined): string {
    let result: string = "";

    if (guild) result = `[${guild.name}§r§f] `;
    return result;
  }

  static formatVector3(location: Vector3): string {
    return `${location.x.toFixed(1)} ${location.y.toFixed(1)} ${location.z.toFixed(1)}`;
  }

  static formatIdentifier(name: string): string {
    return name.replace("minecraft:", "");
  }

  static formatRarity(name: string, format: GachaRarity): string {
    return `${rarityColor[format]}[${name}]§r§f`;
  }
}

export { Formater };
