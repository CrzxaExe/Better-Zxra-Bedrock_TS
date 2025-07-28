/*
////////////////////////////////////////////////////////////////////////////////////////////////
// ZxraLib | CrzxaExe | Minecraft Library
////////////////////////////////////////////////////////////////////////////////////////////////
*/

export const ZxraLib: { packVersion: string; version: string } = {
  packVersion: "1.4.1",
  version: "1.1.6ts",
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
export { damageColor, rarityColor } from "./data/color";
export { RUNE_GACHA_PRICE, WEAPON_GACHA_PRICE } from "./data/constant";
export { NOT_ALLOWED_ENTITY_TICK, NOT_VALID_ENTITY } from "./data/entityFilters";
export { gachaFeatured, gachaPolls, GachaRarity } from "./data/gacha";
export { npcFile } from "./data/npc";
export { questIndex } from "./data/quest";
export { defaultEntity, defaultPity, defaultRuneStat, defaultSpecialist } from "./data/raw";
export { runeList } from "./data/rune";
export { settings } from "./data/setting";
export { guildShop } from "./data/shop";

// Enums export
export { BzbEntity } from "./enum/entity";
export { StatusDecay, StatusDecayEnum, StatusTypes } from "./enum/status";
export { WeaponTypes } from "./enum/weaponTypes";

// Function export
export { durabilityControl } from "./function/durabilityControl";

// NPC Models export
export { Yuri } from "./npc/models/Yuri";

// Types export
export type { GuildRole, GuildRoles, GuildData, GuildLevel, GuildMember, GuildShopItem } from "./types/guild";
export type {
  BossChallengeData,
  BossChallangeParticipant,
  CooldownData,
  CommandData,
  EffectCreate,
  EntityData,
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
  ScriptParams,
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
export type { NPC, NpcModels, NpcData, YuriConst, YuriData, YuriModels } from "./types/npc";
export type { BlockRegisterData, ItemRegisterData } from "./types/registry";
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
export { GachaPanel, GuildPanel, UserPanel } from "./ui/user";

/*
 *   Imports
 */

// Script imports
import "./scriptEvents/index";

// Registry imports
import "./registry/blocks/all";
import "./registry/items/tools";
import "./registry/itemEvent/use";
