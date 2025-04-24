import { MolangVariableMap, Vector3 } from "@minecraft/server";
import { Specialist } from "../module";

// Cooldown interface
interface CooldownData {
  name: string;
  duration: number;
}

// Command interface
interface CommandData {
  name: string;
  callback: Function | undefined;
}

// Effect interface
interface EffectCreate {
  name: string;
  duration: number;
  amplifier: number;
  showParticles: boolean;
}

// Entity interface
interface EntityData {
  id: string;
  status: StatusData[];
}

// Guild interface
interface GuildData {
  id: string;
  name: string;
  maxMember: number;
  members: GuildMember[];
  applier: GuildMember[];
  token: number;
}
interface GuildMember {
  id: string;
  name: string;
}

// Item interface
interface ItemSpecial {
  item: string;
  callback: Function;
}

// Leaderboard interface
interface LeaderboardData {
  chat: Object;
  deaths: Object;
  kills: Object;
}

// Modifier interface
interface ModifierData {
  name: string;
  type: string;
  callback: Function;
}

// Quest interface
interface QuestConst {
  player: Player;
  sp?: any;
}
interface QuestData {
  title: string;
  rep: number;
  task: QuestTask[];
  reward: QuestRewards[];
}
interface QuestRewards {
  type: string;
  amount: number;
}
interface QuestTask {
  act: string;
  target: string;
  amount: number;
}

// Particle interface
interface Particle {
  particle: string;
  location: Vector3;
  molang: MolangVariableMap;
}

// Pasif interface
interface PasifData {
  hit: PasifHit[];
  hited: PasifHited[];
  kill: PasifKill[];
}
interface PasifHit {
  name: string;
  callback: Function;
}
interface PasifHited {
  name: string;
  callback: Function;
}
interface PasifKill {
  name: string;
  callback: Function;
}

// Player interface
interface PlayerFinder {
  name?: string;
  id?: string;
}

// Redeem interface
interface RedeemData {
  id: string;
  key: string;
  rewards: RedeemRewards[];
}
interface RedeemRewards {
  type: string;
  item?: string;
  amount: number;
}

// Rune Stats interface
interface RuneStats {
  atk?: number;
  atkFlat?: number;

  critChance?: number;
  critDamage?: number;

  healingEffectifity?: number;

  moneyDrop?: number;

  skill?: number;
  skillDamageReduction?: number;
  skillDamageReductionFlat?: number;
  skillDodge?: number;
  skillFlat?: number;

  staminaReduction?: number;

  // Fragility
  artFragile?: number;
  fireFragile?: number;
  fragile?: number;

  // Action Effect
  onAttacked?: Function;
  onCrit?: Function;
  onDodge?: Function;
  onHit?: Function;
  onKill?: Function;
}

// Script interface
interface Scripts {
  namespace: string;
  callback: Function;
}

// Setting interface
interface Setting {
  rules?: SettingRules;
  customChat?: boolean;
  customChatPrefix?: string;
  damageIndicator?: boolean;
  deathLocation?: boolean;
  debug?: boolean;
  saveInterval?: number;
  shopMultiplier?: number;
  staminaAction?: number;
  staminaCooldown?: boolean;
  staminaExhaust?: number;
  staminaHurt?: number;
  staminaRecovery?: number;
  staminaRun?: number;
  staterItem?: boolean;
  starterItemMessage?: string;
  starterItems?: string;
  thirstRun?: number;
  uiLevelRequirement?: boolean;
  useBzbRules?: boolean;
  whatSeeDistance?: number;
  xpMultiplier?: number;
}
interface SettingRules {
  naturalregeneration: boolean;
  recipeunlock: boolean;
  showcoordinates: boolean;
  spawnradius: number;
}

// Skill interface
interface SkillLib {
  useDuration?: number;
  sp?: Specialist;
}

// Specialist interface
interface SpecialistData {
  id: string;
  level: SpecialistLvl;
  stamina: SpecialistStamina;
  thirst: SpecialistThirst;
  money: number;
  voxn: number;
  rep: number;
  cd: CooldownData[];
}
interface SpecialistLvl {
  current: number;
  xp: number;
}
interface SpecialistStamina {
  current: number;
  max: number;
  additional: number;
  rune: number;
}
interface SpecialistThirst {
  current: number;
  max: number;
  temp: number;
}

// Status interface
interface StatusData {
  name: string;
  duration: number;
  lvl: number;
  type: string;
  stack: boolean;
  decay: string;
}
interface StatusFinder {
  name?: string;
  type?: StatusTypes;
  decay?: StatusDecay;
}

// Weapon Skill interface
interface WeaponSkill {
  name: string;
  callback: Function;
}

// World interface
interface WorldData {
  redeem?: RedeemData[];
  setting?: Setting;
  leaderboards?: LeaderboardData;
  guilds?: GuildData[];
}

export type {
  CooldownData,
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
  SpecialistStamina,
  SpecialistThirst,
  StatusData,
  StatusFinder,
  WeaponSkill,
  WorldData,
};
