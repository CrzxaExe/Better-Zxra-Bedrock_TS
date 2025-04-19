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
export { Cooldown } from "./class/Cooldown";
export { Command, Modifier, Script, SpecialItem, Weapon } from "./class/DataClass";
export { Entity } from "./class/Entity";
export { Gacha } from "./class/Gacha";
export { Guild } from "./class/Guild";
export { Leaderboard } from "./class/Leaderboard";
export { Quest } from "./class/Quest";
export { Rune } from "./class/Rune";
export { Specialist } from "./class/Specialist";
export { Status } from "./class/Status";
export { Terra } from "./class/Terra";

// Data export
export { damageColor } from "./data/color";
export { NOT_ALLOWED_ENTITY_TICK } from "./data/entityFilters";
export { defaultEntity, defaultRuneStat, defaultSpecialist } from "./data/raw";
export { runeList } from "./data/rune";
export { settings } from "./data/setting";

// Enums export
export { BzbEntity } from "./enum/entity";
export { StatusDecay, StatusTypes } from "./enum/status";
export { WeaponTypes } from "./enum/weaponTypes";

// Types export
export type {
  CommandData,
  EffectCreate,
  EntityData,
  GuildData,
  GuildMember,
  ItemSpecial,
  LeaderboardData,
  ModifierData,
  QuestConst,
  QuestData,
  QuestRewards,
  QuestTask,
  Particle,
  PasifData,
  PasifHit,
  PasifHited,
  PasifKill,
  PlayerFinder,
  RedeemData,
  RedeemRewards,
  RuneStats,
  Scripts,
  Setting,
  SettingRules,
  SkillLib,
  SpecialistData,
  SpecialistLvl,
  StatusData,
  StatusFinder,
  WeaponSkill,
  WorldData,
} from "./types/lib";
