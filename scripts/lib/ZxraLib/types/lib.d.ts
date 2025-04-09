// Pasif interface
interface PasifData {
  hit: Array<PasifHit>;
  hited: Array<PasifHited>;
  kill: Array<PasifKill>;
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
  rewards: Array<RedeemRewards>;
}
interface RedeemRewards {
  type: string;
  item?: string;
  amount: number;
}

// Setting interface
interface Setting {
  rules?: SettingRules;
  customChat?: boolean;
  customChatPrefix?: string;
  damageIndicator?: boolean;
  deathLocation?: boolean;
  debug?: boolean;
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
  xpMultiplier?: number;
}
interface SettingRules {
  naturalregeneration: boolean;
  recipeunlock: boolean;
  showcoordinates: boolean;
  spawnradius: number;
}

// Weapon Skill interface
interface WeaponSkill {
  name: string;
  callback: Function;
}

// World interface
interface WorldData {
  redeem?: Array<RedeemData>;
  setting?: Setting;
}

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
};
