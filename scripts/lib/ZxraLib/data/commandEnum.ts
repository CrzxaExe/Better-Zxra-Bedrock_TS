import { CommandEnumTypeStrict, StatusDecayEnum, StatusTypesEnum } from "../module";

export const commandEnums: CommandEnumTypeStrict = {
  "cz:statustype": [
    "art_fragile",
    "attack",
    "fire_fragile",
    "fragile",
    "none",
    "silence",
    "skill",
    "stamina_recovery",
    "stamina_stuck",
    "state",
    "stun",
    "wet",
  ],
  "cz:statusdecay": ["none", "stack", "time"],
};
