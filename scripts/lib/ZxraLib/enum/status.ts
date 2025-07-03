export const StatusDecayEnum = {
  Time: "time",
  None: "none",
  Stack: "stack",
} as const;

export type StatusDecay = ObjectValues<typeof StatusDecayEnum>;

export enum StatusTypes {
  ArtFragile = "art_fragile",
  Attack = "attack",
  FireFragile = "fire_fragile",
  Fragile = "fragile",
  None = "none",
  Silence = "silence",
  Skill = "skill",
  StaminaRecovery = "stamina_recovery",
  StaminaStuck = "stamina_stuck",
  State = "state",
  Stun = "stun",
}
