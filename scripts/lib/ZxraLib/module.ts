/*
////////////////////////////////////////////////////////////////////////////////////////////////
// ZxraLib | CrzxaExe | Minecraft Library
////////////////////////////////////////////////////////////////////////////////////////////////
*/

export const ZxraLib: { packVersion: string; version: string } = {
  packVersion: "1.4.1",
  version: "1.1.5ts",
};

// Class export
export { Calc, SpecialistLevelUp } from "./class/Calc";
export { Chat } from "./class/Chat";
export { BlockContainer, ItemContainer, ItemInventory, PlayerContainers } from "./class/Container";
export { Cooldown } from "./class/Cooldown";
export { CreateObject } from "./class/CreateDefault";
export { Command, Modifier, Script, SpecialItem, Weapon } from "./class/DataClass";
export { Entity } from "./class/Entity";
export { Formater } from "./class/Formater";
export { Gacha } from "./class/Gacha";
export { Guild } from "./class/Guild";
export { Item } from "./class/Item";
export { Leaderboard } from "./class/Leaderboard";
export { Quest } from "./class/Quest";
export { BlockRegister, ItemRegister } from "./class/Registry";
export { Rune } from "./class/Rune";
export { Specialist } from "./class/Specialist";
export { Status } from "./class/Status";
export { Terra } from "./class/Terra";

// Data export
export { damageColor } from "./data/color";
export { NOT_ALLOWED_ENTITY_TICK, NOT_VALID_ENTITY } from "./data/entityFilters";
export { questIndex } from "./data/quest";
export { defaultEntity, defaultPity, defaultRuneStat, defaultSpecialist } from "./data/raw";
export { runeList } from "./data/rune";
export { settings } from "./data/setting";

// Enums export
export { BzbEntity } from "./enum/entity";
export { StatusDecay, StatusTypes } from "./enum/status";
export { WeaponTypes } from "./enum/weaponTypes";

// Types export
export type {
  BossChallengeData,
  BossChallangeParticipant,
  CooldownData,
  CommandData,
  EffectCreate,
  EntityData,
  GuildData,
  GuildLevel,
  GuildMember,
  GuildRole,
  ItemSpecial,
  LbData,
  LeaderboardData,
  LeaderboardSystemType,
  LeaderboardType,
  ModifierData,
  QuestConst,
  QuestController,
  QuestData,
  QuestFind,
  QuestPlayer,
  QuestRewards,
  QuestTask,
  QuestType,
  Particle,
  PasifData,
  PasifHit,
  PasifHited,
  PasifKill,
  PityPlayer,
  PlayerFinder,
  RuneAction,
  RedeemData,
  RedeemRewards,
  RuneStats,
  Scripts,
  Setting,
  SettingRules,
  SettingStarterItem,
  SkillLib,
  StatusData,
  StatusFinder,
  StoryData,
  StoryProgress,
  WeaponAttribute,
  WeaponAttributetype,
  WeaponComponent,
  WeaponComponentData,
  WeaponComponentDataValue,
  WeaponSkill,
  WeaponStat,
  WorldData,
} from "./types/lib";
export type { BlockRegisterData } from "./types/registry";
export type {
  SpecialistComponent,
  SpecialistData,
  SpecialistLvl,
  SpecialistRune,
  SpecialistStamina,
  SpecialistThirst,
  SpecialistWeapon,
} from "./types/specialistTypes";

// UI exports
export { UserPanel } from "./ui/user";

import "./registry/blocks/all";
