import {
  Effect,
  EffectTypes,
  EntityHealthComponent,
  EntityRaycastHit,
  EntityTypeFamilyComponent,
  MolangVariableMap,
  Player,
  Entity as mcEntity,
  system,
  Vector3,
  EntityDamageCause,
} from "@minecraft/server";
import {
  Calc,
  defaultRuneStat,
  EffectCreate,
  EntityData,
  NOT_ALLOWED_ENTITY_TICK,
  NOT_VALID_ENTITY,
  Particle,
  RuneStats,
  Status,
  StatusData,
  Terra,
} from "../module";

interface Entity {
  source: mcEntity | any;
  id: string;
  family: EntityTypeFamilyComponent;
  status: Status;
}

class Entity {
  constructor(entity: any) {
    if (!entity) throw new Error("Missing Entity");

    this.source = entity;
    this.id = entity.id;
    this.family = entity.getComponent("minecraft:type_family");
    this.status = new Status(this);
  }

  // Data Methods
  getEnt(defaultValue: EntityData = { id: this.id, status: [] }): EntityData {
    return Terra.getDataEntity(this.id) || defaultValue;
  }
  setEnt(data: EntityData): void {
    if (!data) throw new Error("Missing data");
    Terra.setDataEntity(this.id, data);
  }
  clearEnt(): void {
    this.setEnt({ id: this.id, status: [] });
  }

  // Controller
  controllerStatus(): void {
    // console.warn(JSON.stringify(this.status.getData()));
    const status = this.status.getData();

    status.filter((e) => e.decay === "time").forEach((e) => this.status.minStatus(e.name, 0.25));

    this.controllerActiveStatusEffect(status);
  }
  controllerActiveStatusEffect(status: StatusData[] = this.status.getData()): void {
    status.forEach((e: StatusData) => {
      switch (e.type) {
        case "wet":
          if (!this.isOnFire()) return;
          this.source.extinguishFire();
          break;
      }
    });
  }

  // Validation Methods
  is(type: string): boolean {
    if (!type) throw new Error("Missing Type");
    return this.source.typeId.split(":")[1] === type;
  }
  isTeammate(player: Player) {
    if (!this.is("player")) throw new Error("This entity is not instance of Player");

    Terra.guild.getGuildByPlayer(player);
  }

  // Family Methods
  getFamily(): string[] {
    return this.family.getTypeFamilies();
  }
  hasFamily(name: string): boolean {
    if (!name) throw new Error("Missing Name");
    return this.family.hasTypeFamily(name);
  }

  // Checking Methods
  isOnFire(): boolean {
    return this.source.hasComponent("onfire");
  }
  isTamed(): boolean {
    return this.source.hasComponent("is_tamed");
  }

  // NPC Methods
  npc() {
    if (!this.hasFamily("npc")) throw new Error("This entity is not npc");
  }

  // Combat Methods
  addDamage(
    damage: number = 1,
    options: { cause: EntityDamageCause | string; damagingEntity: mcEntity; rune?: RuneStats; isSkill?: boolean } = {
      cause: "entityAttack",
      damagingEntity: this.source,
      rune: defaultRuneStat,
      isSkill: false,
    },
    velocity: { vel: Vector3; ver: number; hor: number } = { vel: this.source.getVelocity(), ver: 0, hor: 0 }
  ): void {
    if (damage < 0) damage = 1;
    let multiplier = 1 + (options.rune?.atk || 0) + (options.isSkill ? options.rune?.skill || 0 : 0);

    // this user rune
    let actorRune = defaultRuneStat;
    if (this.source instanceof Player) {
      actorRune = Terra.getSpecialistCache(this.source).rune.getRuneStat();
    }

    // Dodge chance
    if ((actorRune.skillDodge || 0) > 0 && options.isSkill) {
      if (Math.floor(Math.random() * 100) > 100) return;
    }

    damage += options.rune?.atkFlat || 0;
    if (options.isSkill) damage += options.rune?.skillFlat || 0 - (actorRune.skillDamageReductionFlat || 0);

    const fragility =
      {
        entityAttack: "fragile",
        fire: "fire_fragile",
        lighting: "lighting_fragile",
        magic: "art_fragile",
      }[options.cause] || "";

    if (fragility !== "") multiplier += this.status.decimalCalcStatus({ type: fragility }, 0, 0.01, true);
    if (["fire", "lighting"].includes(options.cause))
      multiplier += this.status.decimalCalcStatus({ type: "elemental_fragile" }, 0, 0.01, true);

    if (options.isSkill) damage *= 1 - (actorRune.skillDamageReduction || 0);

    damage *= multiplier;

    // Crit chance
    if ((options.rune?.critChance || 0) > 0) {
      if (Math.floor(Math.random() * 100) > 100 * (1 - (options.rune?.critChance || 0)))
        damage *= options.rune?.critDamage || 1;
    }

    this.source.applyDamage(Math.round(damage), {
      cause: options.cause as EntityDamageCause,
      damagingEntity: options.damagingEntity,
    });

    if (!velocity) return;
    this.knockback(velocity.vel, velocity.ver, velocity.hor);
  }
  consumeHp(
    percentage: number,
    hp: EntityHealthComponent | undefined = this.source.getComponent("health"),
    identifier?: "kyle" | undefined
  ) {
    if (!percentage) throw new Error("Missing percentage");
    if (percentage < 0) throw new Error("Parameter percentage must be positive");

    const hpLost: number = Calc.hpLostPercentage(hp);

    hp.setCurrentValue(hp.currentValue * percentage);

    if (!(this.source instanceof Player)) return;

    const sp = Terra.getSpecialistCache(this.source);
    const lvl = (1 - Math.max(Calc.hpLostPercentage(hp), hpLost) - Math.min(hpLost, Calc.hpLostPercentage(hp))) * 100;

    switch (identifier) {
      case "kyle":
        const stack = sp.status.getStatus({ name: "zelxt_point" })[0]?.lvl || 0;

        if (stack >= 200) return;

        sp.status.addStatus("zelxt_point", 1, {
          type: "stack",
          decay: "none",
          stack: true,
          lvl: Math.abs(stack + lvl > 200 ? 200 - stack : lvl),
        });
        break;
    }
  }
  setCurrentHP(value: number): void {
    const hp: EntityHealthComponent | undefined = this.source.getComponent("health");
    if (!hp) return;

    hp.setCurrentValue(value);
  }
  heal(amount: number): void {
    const hp: EntityHealthComponent | undefined = this.source.getComponent("health");
    if (!hp) return;

    // user rune
    let rune = defaultRuneStat;
    if (this.source instanceof Player) {
      rune = Terra.getSpecialistCache(this.source).rune.getRuneStat();
    }

    amount *= 1 + (rune.healingEffectivity || 0);

    if (hp.currentValue + amount > hp.effectiveMax) {
      hp.setCurrentValue(hp.effectiveMax);
      return;
    }
    hp.setCurrentValue(Math.round(hp.currentValue + Math.abs(amount)));
  }

  // Effect Methods
  addEffectOne(name: string, duration: number = 1, amplifier: number = 0, showParticles: boolean = true): void {
    if (!name) throw new Error("Missing Name of Effect");
    this.source.addEffect(EffectTypes.get(name) || name, duration * 20, { amplifier, showParticles });
  }
  addEffect(effect: EffectCreate[] | EffectCreate): void {
    if (Array.isArray(effect)) {
      effect.forEach(({ name, duration, amplifier, showParticles }) =>
        this.addEffectOne(name, duration, amplifier, showParticles)
      );
      return;
    }

    if (!(effect instanceof Object))
      throw new Error("Invalid parameter: effect must be EffectCreate[] or EffectCreate");
    const { name, duration, amplifier, showParticles } = effect;
    this.addEffectOne(name, duration, amplifier, showParticles);
  }
  removeEffect(effect: string[] | string): void {
    if (typeof effect === "string") {
      this.source.removeEffect(effect);
      return;
    }

    if (!Array.isArray(effect)) return;
    effect.forEach((e) => this.source.removeEffect(e));
  }
  hasEffect(effect: string[] | string): boolean[] | boolean {
    if (typeof effect === "string")
      return this.source
        .getEffects()
        .map((e: Effect) => e.typeId.replace("minecraft:", ""))
        .includes(effect);

    if (!Array.isArray(effect)) return false;
    return effect.reduce((all: boolean[], cur: string) => {
      const eff: boolean = this.source
        .getEffects()
        .map((e: Effect) => e.typeId.replace("minecraft:", ""))
        .includes(cur);
      all.push(eff);
      return all;
    }, []);
  }
  hasDebuffEffect(): boolean {
    return this.source
      .getEffects()
      ?.some((e: Effect) =>
        [
          "blindness",
          "darkness",
          "instant_damage",
          "mining_fatigue",
          "poison",
          "slowness",
          "weakness",
          "wither",
        ].includes(e.typeId)
      );
  }
  removeAllDebuff(): void {
    this.removeEffect([
      "blindness",
      "darkness",
      "instant_damage",
      "mining_fatigue",
      "poison",
      "slowness",
      "weakness",
      "wither",
    ]);
  }

  // Essentials Methods
  runCommand(cmd: string[] | string): void {
    if (typeof cmd === "string") {
      this.source.runCommand(cmd);
      return;
    }

    if (!Array.isArray(cmd)) throw new Error("Invalid parameter: cmd must be Array<string> or string");

    cmd.forEach((e) => this.source.runCommand(e));
  }

  setOnFire(duration: number): void {
    this.source.setOnFire(duration);
  }

  addTag(tags: string[] | string): void {
    if (!tags) throw new Error("Missing tags");
    system.run(() => {
      if (typeof tags === "string") {
        this.source.addTag(tags);
        return;
      }

      if (!Array.isArray(tags)) throw new Error("Invalid parameter: tags must be string[] or string");

      tags.forEach((tag: string) => this.source.addTag(tag));
    });
  }
  getTag(finder: { tag: string }): string[] {
    const tags = this.source.getTags();

    if (!finder) return tags;
    return tags.filter((e: string) => finder.tag === e);
  }
  hasTag(tags: string[] | string, combined: boolean = false): boolean[] | boolean {
    if (!tags) throw new Error("Missing tags");

    if (typeof tags === "string") return this.source.hasTag(tags);

    if (!Array.isArray(tags)) return false;
    const res = tags.map((e) => this.source.hasTag(e));

    return combined ? res.every((e) => e === true) : res;
  }
  remTag(tags: string[] | string): void {
    system.run(() => {
      if (!tags) return;

      if (typeof tags === "string") {
        this.source.removeTag(tags);
        return;
      }

      if (!Array.isArray(tags)) throw new Error("Invalid paramater: tags must be string[] or string");
      tags.forEach((e: string) => this.source.removeTag(e));
    });
  }

  playAnim(animation: string, blendOutTime: number = 0.35): void {
    if (animation === "") throw new Error("Missing animation");
    this.source.playAnimation(animation, { blendOutTime });
  }

  // Particle Methods
  selfParticle(
    particle: string,
    location: Vector3 | undefined = this.source.location,
    molang: MolangVariableMap | undefined = new MolangVariableMap()
  ): void {
    if (!particle) throw new Error("Missing particle");
    this.source.dimension.spawnParticle(particle, location, molang);
  }
  particles(particles: Particle[] | Particle | string[] | string): void {
    if (typeof particles === "string") {
      this.selfParticle(particles);
      return;
    }

    if (particles instanceof Object && !Array.isArray(particles)) {
      const { particle, location, molang }: Particle = particles;
      this.selfParticle(particle, location, molang);
      return;
    }

    if (!Array.isArray(particles))
      throw new Error("Invalid paramter: particles must be Particle[] or Particle or string");
    particles.forEach((e) => {
      if (typeof e === "string") {
        this.selfParticle(e);
        return;
      }

      if (!(e instanceof Object)) throw new Error("Array of particles must be Object or string");
      const { particle, location, molang }: Particle = e;
      this.selfParticle(particle, location, molang);
    });
  }
  impactParticle(): void {
    if (!this.source.isOnGround) return;
    this.particles(["cz:impact_up", "cz:impact_p"]);
  }

  // Movement Methods
  knockback(velocity: Vector3, horizontal: number = 0, vertical: number = 0): void {
    if (!velocity) throw new Error("Missing velocity");

    this.source.applyKnockback({ x: velocity.x * horizontal, z: velocity.z * horizontal }, vertical);
  }
  bind(duration: number): void {
    this.addEffect({ name: "slowness", duration, amplifier: 254, showParticles: false });
    this.selfParticle("cz:bind", { ...this.source.location, y: this.source.location.y + 2.3 });
  }

  // Get other Entity methods
  getEntityFromDistance(maxDistance: number = 6): EntityRaycastHit[] {
    let excludeNames: string[] = [];
    if (this.source instanceof Player) excludeNames = [...Terra.guild.getTeammate(this.source)];

    return this.source.getEntitiesFromViewDirection({ maxDistance, excludeNames, excludeTypes: NOT_VALID_ENTITY });
  }
  getFirstEntityFromDistance(maxDistance: number = 6): EntityRaycastHit | undefined {
    return this.getEntityFromDistance(maxDistance)[0];
  }
  getEntityWithinRadius(radius: number = 6): mcEntity[] {
    let excludeNames: string[] = [];
    if (this.source.typeId === "minecraft:player") excludeNames = [...Terra.guild.getTeammate(this.source)];

    return this.source.dimension.getEntities({
      maxDistance: radius,
      excludeNames,
      minDistance: 0,
      location: this.source.location,
      excludeTypes: NOT_ALLOWED_ENTITY_TICK,
    });
  }

  getEntityFromDistanceCone(maxDistance: number = 6, fov: number = 60): mcEntity[] {
    const entities = this.getEntityWithinRadius(maxDistance);

    const origin = this.source.location;
    const rotationY = this.source.getRotation().y;

    const halfFovRad = (fov / 2) * (Math.PI / 180);

    const rad = (rotationY * Math.PI) / 180;
    const forward = {
      x: -Math.sin(rad),
      z: Math.cos(rad),
    };

    return entities.filter((e) => {
      if (!e.location) return false;
      const dx = e.location.x - origin.x;
      const dz = e.location.z - origin.z;

      const length = Math.sqrt(dx * dx + dz * dz);
      if (length === 0) return false;

      const dir = { x: dx / length, z: dz / length };

      const dot = forward.x * dir.x + forward.z * dir.z;

      const angle = Math.acos(dot);

      // console.warn(e.typeId, angle, halfFovRad, rotationY);
      return angle <= halfFovRad;
    });
  }

  getChainedEntityFromDistance(radius: number, maxTargetCount: number = 1, excludeId: string[] = []): mcEntity[] {
    const entity: mcEntity[] = [];
    let targetGet: number = 0;

    const firstTarget: mcEntity = this.source;

    if (!firstTarget) return entity;
    targetGet++;
    entity.push(firstTarget);

    let tempEntity: mcEntity = firstTarget;
    const tempId: string[] = [tempEntity.id, ...excludeId];

    while (targetGet < maxTargetCount) {
      const nearbyEntity: mcEntity[] = new Entity(tempEntity)
        .getEntityWithinRadius(radius)
        .filter((e) => !tempId.includes(e.id))
        .sort(
          (a, b) => Calc.distance(a.location, tempEntity.location) - Calc.distance(b.location, tempEntity.location)
        );

      if (!nearbyEntity[0]) break;

      targetGet++;
      tempId.push(nearbyEntity[0].id);
      entity.push(nearbyEntity[0]);
      tempEntity = nearbyEntity[0];
    }

    return entity;
  }

  getLocationInFront(distance: number = 6): Vector3 {
    const entity = this.getEntityFromDistance(distance);
    if (entity.length > 0) return entity[0].entity.location;

    const block = this.source.getBlockFromViewDirection({ maxDistance: distance })?.block;
    if (block) return block.location;

    const origin = this.source.location;
    const yaw = (this.source.getRotation().y * Math.PI) / 180;
    const pitch = (this.source.getRotation().x * Math.PI) / 180;

    const forward = {
      x: -Math.sin(yaw) * Math.cos(pitch),
      y: -Math.sin(pitch),
      z: Math.cos(yaw) * Math.cos(pitch),
    };

    return {
      x: origin.x + forward.x * distance,
      y: origin.y + forward.y * distance,
      z: origin.z + forward.z * distance,
    };
  }

  // Refresh Methods
  refreshEntity(): void {
    this.remTag(["silent_target", "liberator_target", "silence", "lectaze_target", "fireing_zone", "catlye_ult"]);
  }

  // 3D Particle
  spawnParticle(namespace: string, event: string, location: Vector3 = this.source.location): void {
    const particle = this.source.dimension.spawnEntity(namespace, location);

    particle.triggerEvent(event);
  }
}

export { Entity };
