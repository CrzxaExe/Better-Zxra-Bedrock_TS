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
export { Entity } from "./class/Entity";
export { Quest } from "./class/Quest";
export { Status } from "./class/Status";
export { Terra } from "./class/Terra";

// Data export
export { damageColor } from "./data/color";
export { settings } from "./data/setting";

// Types export
export type {
  CommandData,
  EffectCreate,
  EntityData,
  ItemSpecial,
  ModifierData,
  QuestConst,
  QuestData,
  QuestRewards,
  QuestTask,
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
  StatusData,
  WeaponSkill,
  WorldData,
} from "./types/lib";
