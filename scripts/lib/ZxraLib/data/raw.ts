import { RuneStats, SpecialistData } from "../module";

export const defaultEntity = {
  id: "id",
  status: [],
};

export const defaultRuneStat: RuneStats = {
  // Improved stats for weapon only
  // Atk stat: increase all damage
  atk: 0,
  atkFlat: 0,

  // Crit stat: chance to increase dmg
  critChance: 0,
  critDamage: 1.2,

  // Healing Effectifity stat: increase heal provide
  healingEffectivity: 1,

  // Money Drop: kill will gain money
  moneyDrop: 0,

  // Skill stats: increase skill dmg, decrease incoming skill dmg and dodge skill damage
  skill: 0,
  skillDamageReduction: 0,
  skillDamageReductionFlat: 0,
  skillDodge: 0,
  skillFlat: 0,

  // Stamina Reduction: decrease stamina usage
  staminaReduction: 0,

  // Fragility
  artFragile: 0, // increase art(magic) dmg
  fireFragile: 0, // increase fire dmg
  fragile: 0, // increase physical dmg
};

export const defaultSpecialist: SpecialistData = {
  id: "",
  level: { current: 0, xp: 0 },
  stamina: { current: 100, max: 100, additional: 0, rune: 0 },
  thirst: { current: 100, max: 100, temp: 0 },
  money: 0,
  voxn: 0,
  rep: 0,
  title: "",
  titles: [],
  selectedWeapon: [],
  weapons: [],
  cd: [],
  components: [],
};
