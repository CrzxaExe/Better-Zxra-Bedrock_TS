export const StatusDecayEnum = {
  Time: "time",
  None: "none",
  Stack: "stack",
} as const;

export type StatusDecay = ObjectValues<typeof StatusDecayEnum>;

export const StatusTypesEnum = {
  ArtFragile: "art_fragile",
  Attack: "attack",
  FireFragile: "fire_fragile",
  Fragile: "fragile",
  None: "none",
  Silence: "silence",
  Skill: "skill",
  StaminaRecovery: "stamina_recovery",
  StaminaStuck: "stamina_stuck",
  State: "state",
  Stun: "stun",
  Wet: "wet",
} as const;

export type StatusTypes = ObjectValues<typeof StatusTypesEnum>;
