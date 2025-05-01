/*
////////////////////////////////////////////////////////////////////////////////////////////////
// ZxraLib | CrzxaExe | Minecraft Library
////////////////////////////////////////////////////////////////////////////////////////////////
*/

export const ZxraLib: { packVersion: string; version: string } = {
  packVersion: "1.4.1",
  version: "1.1.3ts",
};

// Class export
export { Calc } from "./class/Calc";
export { Chat } from "./class/Chat";
export { Cooldown } from "./class/Cooldown";
export { CreateObject } from "./class/CreateDefault";
export { Command, Modifier, Script, SpecialItem, Weapon } from "./class/DataClass";
export { Entity } from "./class/Entity";
export { Formater } from "./class/Formater";
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
export { questIndex } from "./data/quest";
export { defaultEntity, defaultRuneStat, defaultSpecialist } from "./data/raw";
export { runeList } from "./data/rune";
export { settings } from "./data/setting";

// Enums export
export { BzbEntity } from "./enum/entity";
export { StatusDecay, StatusTypes } from "./enum/status";
export { WeaponTypes } from "./enum/weaponTypes";

// Types export
export type {
  CooldownData,
  CommandData,
  EffectCreate,
  EntityData,
  GuildData,
  GuildLevel,
  GuildMember,
  GuildRole,
  ItemSpecial,
  LeaderboardData,
  ModifierData,
  QuestConst,
  QuestData,
  QuestFind,
  QuestPlayer,
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
  SpecialistStamina,
  SpecialistThirst,
  StatusData,
  StatusFinder,
  WeaponSkill,
  WorldData,
} from "./types/lib";
