import { RuneStats } from "./lib";

// Specialist interface
interface SpecialistData {
  id: string;
  level: SpecialistLvl;
  stamina: SpecialistStamina;
  thirst: SpecialistThirst;
  money: number;
  voxn: number;
  rep: number;
  title: string;
  titles: string[];
  equippedRune: string[];
  runes: SpecialistRune[];
  cd: CooldownData[];
  selectedWeapon: [string?, string?];
  weapons: SpecialistWeapon[];
  quest?: QuestPlayer;
  components: SpecialistComponent[];
}
interface SpecialistRune {
  name: string;
  lvl: number;
  stats: RuneStats;
}
interface SpecialistComponent {
  name: string;
  value: Vector3 | number | string;
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
interface SpecialistWeapon {
  weapon: string;
  atk: number;
  pasifLvl: [WeaponStat[], WeaponStat[]?];
  skillLvl: [WeaponStat[], WeaponStat[]?, WeaponStat[]?, WeaponStat[]?];
}

export {
  SpecialistComponent,
  SpecialistData,
  SpecialistLvl,
  SpecialistRune,
  SpecialistStamina,
  SpecialistThirst,
  SpecialistWeapon,
};
