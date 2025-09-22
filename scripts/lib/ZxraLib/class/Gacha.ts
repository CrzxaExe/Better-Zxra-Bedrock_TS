import { Player } from "@minecraft/server";
import { gachaFeatured, gachaPolls, GachaRarity, PityPlayer, runeList, Terra } from "../module";

/**
 * Utility class to handle gacha
 */
class Gacha {
  /**
   * Adding pity to user
   *
   * @param player Player
   * @param key string, key of banner
   * @param amount number, default 0
   * @param pityData PityPlayer, default get to Terra.pityPlayer
   */
  static addPityUser(
    player: Player,
    key: "featured" | "unique" | "limited",
    amount: number | undefined = 0,
    pityData: PityPlayer | undefined = Terra.getPityPlayer(player)
  ): void {
    if (amount <= 0) return;
    pityData.pity[key] += amount;

    Terra.setPityPlayer(player, pityData);
  }

  /**
   * Set pity of player
   *
   * @param player Player
   * @param key string, key of banner
   * @param amount number, default 0
   * @param pityData PityPlayer, default get to Terra.pityPlayer
   */
  static setPityUser(
    player: Player,
    key: "featured" | "unique" | "limited",
    value: number = 0,
    pityData: PityPlayer = Terra.getPityPlayer(player)
  ): void {
    if (value < 0) return;
    pityData.pity[key] = value;

    Terra.setPityPlayer(player, pityData);
  }

  // Gacha main

  /**
   * Get random rune
   *
   * @returns string
   */
  static rune(): string {
    const available = Object.keys(runeList);

    return available[Math.floor(Math.random() * available.length)];
  }

  /**
   * Get random weapon
   *
   * @param player Player
   * @returns { rarity: GachaRarity, weapon: string }
   */
  static weapon(player: Player): { rarity: GachaRarity; weapon: string } {
    const data = Terra.getPityPlayer(player);

    const { featured, limited, unique } = data.pity;
    const chance = Math.floor(Math.random() * 100) + unique;

    const rarity: { [k: string]: number } = {
      unique: 92,
      epic: 75,
      legend: 35,
      rare: 0,
    };

    const resultRarity =
      Object.keys(rarity).find((e: string) => {
        if (rarity[e] < chance) return;

        return e;
      }) ?? "rare";

    chance >= rarity.unique ? this.setPityUser(player, "unique", 0) : this.addPityUser(player, "unique", 0.5);

    const featuredChance = Math.floor(Math.random() * 96) + featured;

    const weapon =
      featuredChance >= 96
        ? gachaFeatured.polls[resultRarity as GachaRarity][
            Math.floor(Math.random() * gachaFeatured.polls[resultRarity as GachaRarity].length)
          ]
        : gachaPolls.normal[resultRarity as GachaRarity][
            Math.floor(Math.random() * gachaPolls.normal[resultRarity as GachaRarity].length)
          ];

    return { rarity: resultRarity as GachaRarity, weapon };
  }
}

export { Gacha };
