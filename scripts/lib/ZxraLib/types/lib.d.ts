import {
  Block,
  CommandResult,
  CustomCommand,
  CustomCommandOrigin,
  CustomCommandResult,
  Entity,
  MolangVariableMap,
  ScriptEventSource,
  Vector3,
} from "@minecraft/server";
import { Specialist, SpecialistData } from "../module";

// Boss interface
type BossChallengeData = {
  boss: Entity | undefined;
  participants: BossChallangeParticipant[];
};
type BossChallangeParticipant = {
  player: Player;
  damage: number;
};

// Cooldown interface
type CooldownData = {
  name: string;
  duration: number;
};

// Command interface
interface CommandData {
  config: CustomCommand;
  callback: Function<CustomCommandResult>;
}

// Effect interface
interface EffectCreate {
  name: string;
  duration: number;
  amplifier: number;
  showParticles: boolean;
}

// Entity interface
type EntityData = {
  id: string;
  status: StatusData[];
} & NpcModels;

// Item interface
interface ItemSpecial {
  item: string;
  callback: Function;
}

// Leaderboard interface
interface LeaderboardData {
  chat: LbData[];
  deaths: LbData[];
  kills: LbData[];
}
type LeaderboardSystemType = "chat" | "deaths" | "kills";
type LeaderboardType = LeaderboardSystemType | "splvl" | "guildlvl" | "money" | "voxn" | "reputation";
interface LbData {
  id: string;
  name: string;
  value: number;
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
  sp: Specialist;
}
interface QuestController {
  act: QuestType;
  target: Entity | Block;
  amount: number;
}
interface QuestData {
  title: string;
  rep: number;
  task: QuestTask[];
  reward: QuestRewards[];
}
interface QuestFind {
  id: number;
  quest: QuestData;
}
interface QuestRewards {
  type: string;
  amount: number;
}
interface QuestPlayer {
  id: number;
  progress: number[];
}
interface QuestTask {
  act: string;
  target: string;
  amount: number;
}
type QuestType = "destroy" | "place" | "kill" | "get";

// Particle interface
interface Particle {
  particle: string;
  location: Vector3 | undefined;
  molang: MolangVariableMap | undefined;
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

// Pity interface
type PityPlayer = {
  id: string;
  pity: {
    unique: number;
    featured: number;
    limited: number;
  };
};

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
type RuneStats = {
  atk?: number;
  atkFlat?: number;

  critChance?: number;
  critDamage?: number;

  healingEffectivity?: number;

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
} & RuneAction;
interface RuneAction {
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
type ScriptParams = {
  cmd: string;
  id: string;
  rawMsg: string[];
  msg: string[];
  message: string;
  sourceType: ScriptEventSource;
  initiator: Entity | undefined;
  sourceBlock: Block | undefined;
  sourceEntity: Entity | undefined;
};

// Setting interface
interface Setting {
  rules?: SettingRules;
  customChat?: boolean;
  customChatPrefix?: string;
  damageIndicator?: boolean;
  deathLocation?: boolean;
  debug?: boolean;
  guildCreateCost?: number;
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
  starterItems?: SettingStarterItem[];
  thirstRun?: number;
  uiLevelRequirement?: boolean;
  useBzbRules?: boolean;
  uuidLength?: number;
  whatSeeDistance?: number;
  xpMultiplier?: number;
}
interface SettingRules {
  naturalregeneration: boolean;
  recipesunlock: boolean;
  showcoordinates: boolean;
  spawnradius: number;
}
interface SettingStarterItem {
  item: string;
  amount: number;
}

// Skill interface
interface SkillLib {
  useDuration?: number;
  sp: Specialist;
  vel?: Vector3;
  velocity?: Vector3;
  multiplier?: number;
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

// Story interface
interface StoryData {
  storyId: number;
  progress: StoryProgress[];
}
interface StoryProgress {
  name: string;
  value: number | Vector3;
}

// Weapon Skill interface
interface WeaponComponent {
  id: string;
  components: WeaponComponentData[];
  attributes: WeaponAttribute[];
}
interface WeaponComponentData {
  name: string;
  value: WeaponComponentDataValue;
}
type WeaponComponentDataValue = any[] | Vector3 | number | string | boolean;
interface WeaponSkill {
  name: string;
  callback: Function;
}
interface WeaponStat {
  name: string;
  value: number;
}
interface WeaponAttribute {
  id: string;
  type: WeaponAttributetype;
}
type WeaponAttributetype = "handle";

// World interface
type WorldData = {
  redeem: RedeemData[];
  setting: Setting;
  leaderboards?: LeaderboardData;
  guilds?: GuildData[];
};

type FullWorldData = {
  world: WorldData;
  specialist: SpecialistData[];
  story: StoryData;
  pityPlayer: PityPlayer[];
  weaponComponent: WeaponComponent[];
  bossChallenge: BossChallengeData;
  waveChallenge: {};
};

export type {
  BossChallengeData,
  BossChallangeParticipant,
  CooldownData,
  CommandData,
  EffectCreate,
  EntityData,
  FullWorldData,
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
  RedeemData,
  RedeemRewards,
  RuneAction,
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
};
