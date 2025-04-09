/*
////////////////////////////////////////////////////////////////////////////////////////////////
// ZxraLib | CrzxaExe | Minecraft Library
////////////////////////////////////////////////////////////////////////////////////////////////
*/

export const ZxraLib: { packVersion: string; version: string } = {
  packVersion: "1.4.1",
  version: "1.1.2ts",
};

// Class export
export { Command, Modifier, Script, SpecialItem, Weapon } from "./class/DataClass";
export { Terra } from "./class/Terra";

export type {
  PasifData,
  PasifHit,
  PasifHited,
  PasifKill,
  PlayerFinder,
  RedeemData,
  RedeemRewards,
  Setting,
  SettingRules,
  WeaponSkill,
  WorldData,
} from "./types/lib";
