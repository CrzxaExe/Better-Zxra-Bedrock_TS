import { Entity as mcEntity, MolangVariableMap, Player, system } from "@minecraft/server";
import { Calc, Entity, SpecialistWeapon, Terra } from "../../ZxraLib/module";
import { weaponData } from "../module";

class Boltizer {
  static pasif2(
    user: Player,
    target: mcEntity[],
    weapon: SpecialistWeapon = Terra.getSpecialist(user.id)?.weapons.find((e) => e.weapon === "boltizer") ??
      weaponData.unique.boltizer
  ): void {
    let count: number = 0;

    target.forEach((e: mcEntity) => {
      const nextEntity: mcEntity | undefined = target[count + 1];

      const ent = new Entity(e);

      if (nextEntity) {
        const molang = new MolangVariableMap();

        molang.setVector3("variable.direction", {
          x: nextEntity.location.x - e.location.x,
          y: nextEntity.location.y - e.location.y,
          z: nextEntity.location.z - e.location.z,
        });
        molang.setFloat("variable.initial_speed", Calc.distance3(e.location, nextEntity.location) * 7);
        molang.setFloat("variable.max_age", Calc.distance3(e.location, nextEntity.location) * 0.072);

        ent.particles({ location: { ...e.location, y: e.location.y + 1 }, particle: "cz:bolt", molang });
        ent.particles({
          location: { ...nextEntity.location, y: nextEntity.location.y + 1 },
          particle: "minecraft:critical_hit_emitter",
          molang: undefined,
        });
      }

      system.runTimeout(() => {
        ent.addDamage(
          weapon.atk * (1 - count * (weapon.pasifLvl[1]?.find((e) => e.name === "chain_penalty").value ?? 0.3)),
          {
            cause: "lightning",
            damagingEntity: user,
            isSkill: false,
          }
        );
      }, 5);
      count++;
    });
  }
}

export { Boltizer };
