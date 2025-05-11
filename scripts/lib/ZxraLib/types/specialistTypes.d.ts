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
  cd: CooldownData[];
  selectedWeapon: [string?, string?];
  weapons: SpecialistWeapon[];
  quest?: QuestPlayer;
  components: SpecialistComponent[];
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
  pasifLvl: [WeaponPasifStat?, WeaponPasifStat?];
  skillLvl: [WeaponSkillStat?, WeaponSkillStat?, WeaponSkillStat?, WeaponSkillStat?];
}

export { SpecialistComponent, SpecialistData, SpecialistLvl, SpecialistStamina, SpecialistThirst, SpecialistWeapon };
