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
export { Chat } from "./class/Chat";
export { Command, Modifier, Script, SpecialItem, Weapon } from "./class/DataClass";
export { Terra } from "./class/Terra";

// Data export
export { settings } from "./data/setting";

// Types export
export type {
  CommandData,
  ItemSpecial,
  ModifierData,
  PasifData,
  PasifHit,
  PasifHited,
  PasifKill,
  PlayerFinder,
  RedeemData,
  RedeemRewards,
  Scripts,
  Setting,
  SettingRules,
  WeaponSkill,
  WorldData,
} from "./types/lib";
