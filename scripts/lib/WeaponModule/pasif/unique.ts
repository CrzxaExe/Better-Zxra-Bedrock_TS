import { EntityHealthComponent, Entity as mcEntity, MolangVariableMap, Player } from "@minecraft/server";
import { Calc, Entity, Specialist, Terra, Weapon } from "../../ZxraLib/module";
import { Boltizer, Liberator, Reaper, weaponData } from "../module";

// Liberator
Weapon.addHitPasif("liberator", (user: Player, _: unknown, { sp }: { sp: Specialist }) => {
  const stack = sp.status.getStatus({ name: "soul_of_death" })[0]?.lvl ?? 0;
  const weapon =
    Terra.getSpecialist(user.id)?.weapons.find((e) => e.weapon === "liberator") ?? weaponData.unique.liberator;
  const pasif2 = Liberator.pasif2(user)!;

  const healAmount = 1 + stack;

  Reaper.reap(sp, (entity: mcEntity, healFunction: ReaperHealFunction) => {
    const ent = new Entity(entity);

    ent.particles({
      particle: "cz:gray_slash",
      location: entity.location,
      molang: new MolangVariableMap(),
    });

    if (entity.typeId !== "cz:angel") {
      healFunction?.(healAmount);
      ent.addDamage(weapon.atk, { cause: "entityAttack", damagingEntity: user, isSkill: false });
      return;
    }

    ent.heal((entity.getComponent("health")?.defaultValue || 28) * pasif2);
    healFunction?.(healAmount + 4);
  });
});
Weapon.addKillPasif("liberator", (user: Player, _: unknown, { sp }: { sp: Specialist }) => {
  const data = sp.getSp().weapons.find((e) => e.weapon === "liberator") ?? weaponData.unique.liberator;

  const maxStack = data.pasifLvl[0].find((e) => e.name === "max_stack")?.value ?? 3;

  let stack = sp.status.getStatus({ name: "soul_of_death" })[0]?.lvl ?? 0;
  if (stack >= maxStack) return;

  stack++;
  sp.status.addStatus("soul_of_death", 1, { type: "stack", decay: "none", lvl: 1, stack: true });
});

// Kyle
Weapon.addHitPasif("kyles", (user: Player, target: mcEntity, { sp }: { sp: Specialist }) => {
  const hp = user.getComponent("health") as EntityHealthComponent;
  const hpPercentage: number = Calc.hpLostPercentage(hp);

  const rune = sp.rune.getRuneStat();

  new Entity(target).addDamage((hp.defaultValue ?? 20) * hpPercentage, {
    cause: "entityAttack",
    damagingEntity: user,
    isSkill: false,
    rune,
  });
});

// Boltizer
Weapon.addHitPasif("boltizer", (user: Player, target: mcEntity, { damage }: { damage: number }) => {
  const weapon =
    Terra.getSpecialist(user.id)?.weapons.find((e) => e.weapon === "boltizer") ?? weaponData.unique.boltizer;

  Boltizer.pasif2(
    user,
    new Entity(target).getChainedEntityFromDistance(
      3,
      weapon.pasifLvl[1]?.find((e) => e.name === "chain_length").value ?? 2,
      [user.id]
    ),
    weapon
  );
});
