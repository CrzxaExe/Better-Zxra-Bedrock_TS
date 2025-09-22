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

/**
 * Entity instance
 *
 * @constructor Entity from minecraft
 */
class Entity {
  constructor(entity: any) {
    if (!entity) throw new Error("Missing Entity");

    this.source = entity;
    this.id = entity.id;
    this.family = entity.getComponent("minecraft:type_family");
    this.status = new Status(this);
  }

  // Data Methods
  /**
   * Get entity data
   *
   * @param defaultValue Object
   * @returns EntityData
   */
  getEnt(defaultValue: EntityData = { id: this.id, status: [] }): EntityData {
    return Terra.getDataEntity(this.id) || defaultValue;
  }

  /**
   * Set entity data
   *
   * @param data EntityData;
   */
  setEnt(data: EntityData): void {
    if (!data) throw new Error("Missing data");
    Terra.setDataEntity(this.id, data);
  }

  /**
   * Clear entity data
   */
  clearEnt(): void {
    this.setEnt({ id: this.id, status: [] });
  }

  // Controller

  /**
   * Method to control entity status
   */
  controllerStatus(): void {
    const status = this.status.getData();

    status.filter((e) => e.decay === "time").forEach((e) => this.status.minStatus(e.name, 0.25));

    this.controllerActiveStatusEffect(status);
  }

  /**
   * Method to control active effect of entity status
   * @param status StatusData
   */
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

  /**
   * Check if this entity is same type
   *
   * @param type string, identifier
   * @returns boolean
   */
  is(type: string): boolean {
    if (!type) return false;
    return this.source.typeId.split(":")[1] === type;
  }

  /**
   * Check if target are teammate to this entity
   * @param player Player, target
   * @returns boolean
   */
  isTeammate(player: Player): boolean {
    if (!this.is("player")) return false;

    return Terra.guild.getGuildByPlayer(player)?.members.some((e) => e.id === (this.source.id as string)) ?? false;
  }

  // Family Methods

  /**
   * Get all family tag of this entity
   * @returns string[]
   */
  getFamily(): string[] {
    return this.family.getTypeFamilies();
  }

  /**
   * Check if this entity has family tag
   *
   * @param name string
   * @returns boolean
   */
  hasFamily(name: string): boolean {
    if (name === "") throw new Error("Invalid Name");
    return this.family.hasTypeFamily(name);
  }

  // Checking Methods

  /**
   * Check if this entity is on fire
   *
   * @returns boolean
   */
  isOnFire(): boolean {
    return this.source.hasComponent("onfire");
  }

  /**
   * Check if this entity is tamed
   * @returns boolean
   */
  isTamed(): boolean {
    return this.source.hasComponent("is_tamed");
  }

  // NPC Methods

  /**
   * Npc method, to call gui of the npc entity
   */
  npc() {
    if (!this.hasFamily("npc")) throw new Error("This entity is not npc");
  }

  // Combat Methods

  /**
   * Apply damage to this entity with calculated
   *
   * @param damage number, raw damage
   * @param options Object, contain damage couse, source entity, rune stat, and is skill or not
   * @param velocity Object, contain velocity, vertical knockback, horizontal knockback
   */
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

  /**
   * Consume entity health with calculation
   *
   * @param percentage number, between 0-1
   * @param hp EntityHealthComponent
   * @param identifier string | undefined, weapon id
   */
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

  /**
   * Set current hp this entity with new one
   *
   * @param value number
   */
  setCurrentHP(value: number): void {
    const hp: EntityHealthComponent | undefined = this.source.getComponent("health");
    if (!hp) return;

    hp.setCurrentValue(value);
  }

  /**
   * Add entity current hp with calculation
   *
   * @param amount number
   */
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
  /**
   * Add single effect to this entity
   *
   * @param name string, effect name
   * @param duration number
   * @param amplifier number, default 0
   * @param showParticles boolean, default true
   */
  addEffectOne(name: string, duration: number = 1, amplifier: number = 0, showParticles: boolean = true): void {
    if (!name) throw new Error("Missing Name of Effect");
    this.source.addEffect(EffectTypes.get(name) || name, duration * 20, { amplifier, showParticles });
  }

  /**
   * Add several effect to  this entity
   *
   * @param effect EffectCreate[] | EffectCreate
   * @throws when effect are not object or array of EffectCreate
   */
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

  /**
   * Remove several effect for this entity
   *
   * @param effect string[] | string, name of effect
   */
  removeEffect(effect: string[] | string): void {
    if (typeof effect === "string") {
      this.source.removeEffect(effect);
      return;
    }

    if (!Array.isArray(effect)) return;
    effect.forEach((e) => this.source.removeEffect(e));
  }

  /**
   * Check if entity has effect name
   *
   * @param effect string[] | string
   * @returns boolean[] | boolean
   */
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

  /**
   * Check if entity has bad effect
   *
   * @returns boolean
   */
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

  /**
   * Remove all debuff from entity
   */
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

  /**
   * Run several command from this entity
   *
   * @param cmd string[] | string, list of command
   * @throws when cmd is not string[] or string
   */
  runCommand(cmd: string[] | string): void {
    if (typeof cmd === "string") {
      this.source.runCommand(cmd);
      return;
    }

    if (!Array.isArray(cmd)) throw new Error("Invalid parameter: cmd must be Array<string> or string");

    cmd.forEach((e) => this.source.runCommand(e));
  }

  /**
   * Set on fire in this target for duration
   *
   * @param duration number, default 1
   */
  setOnFire(duration: number = 1): void {
    this.source.setOnFire(duration);
  }

  /**
   * Add several tags to this entity
   *
   * @param tags string[] | string
   * @throws wheb tags are not string[] or string
   */
  addTag(tags: string[] | string): void {
    system.run(() => {
      if (typeof tags === "string") {
        this.source.addTag(tags);
        return;
      }

      if (!Array.isArray(tags)) throw new Error("Invalid parameter: tags must be string[] or string");

      tags.forEach((tag: string) => this.source.addTag(tag));
    });
  }

  /**
   * Get tag with matched finder for this entity
   *
   * @param finder TagFinder
   * @returns string[]
   */
  getTag(finder: { tag: string }): string[] {
    const tags = this.source.getTags();

    if (!finder) return tags;
    return tags.filter((e: string) => finder.tag === e);
  }

  /**
   * Check if entity has tags
   *
   * @param tags string[] | string
   * @param combined boolean, default false, if true return will check this entity must have all tags
   * @returns boolean[] | boolean
   */
  hasTag(tags: string[] | string, combined: boolean | undefined = false): boolean[] | boolean {
    if (typeof tags === "string") return this.source.hasTag(tags);

    if (!Array.isArray(tags)) return false;
    const res = tags.map((e) => this.source.hasTag(e));

    return combined ? res.every((e) => e === true) : res;
  }

  /**
   * Remove several tags from this entity
   *
   * @param tags string[] | string
   * @throws when tags is not string[] or string
   */
  remTag(tags: string[] | string): void {
    system.run(() => {
      if (typeof tags === "string") {
        this.source.removeTag(tags);
        return;
      }

      if (!Array.isArray(tags)) throw new Error("Invalid paramater: tags must be string[] or string");
      tags.forEach((e: string) => this.source.removeTag(e));
    });
  }

  /**
   * Playing animation to this entity
   *
   * @param animation string, animation name
   * @param blendOutTime number, default 0.35
   * @throws when animation is empty string
   */
  playAnim(animation: string, blendOutTime: number | undefined = 0.35): void {
    if (animation === "") throw new Error("Missing animation");
    this.source.playAnimation(animation, { blendOutTime });
  }

  // Particle Methods

  /**
   * Spawn particle to this entity
   *
   * @param particle string, particle name
   * @param location Vector3
   * @param molang MolangVariableMap
   */
  selfParticle(
    particle: string,
    location: Vector3 | undefined = this.source.location,
    molang: MolangVariableMap | undefined = new MolangVariableMap()
  ): void {
    if (!particle) throw new Error("Missing particle");
    this.source.dimension.spawnParticle(particle, location, molang);
  }

  /**
   * Spawn several particle to this entity
   *
   * @param particles Particle[] | Particle | string[] | string
   * @throws when particles is not array of object, array of string, object or string
   */
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

  /**
   * Spawn impact particle on this entity
   */
  impactParticle(): void {
    if (!this.source.isOnGround) return;
    this.particles(["cz:impact_up", "cz:impact_p"]);
  }

  // Movement Methods

  /**
   * Apply knockback to this entity
   * @param velocity Vector3
   * @param horizontal number, default 0
   * @param vertical number, default 0
   */
  knockback(velocity: Vector3, horizontal: number | undefined = 0, vertical: number | undefined = 0): void {
    this.source.applyKnockback({ x: velocity.x * horizontal, z: velocity.z * horizontal }, vertical);
  }

  /**
   * Set entity to unable to move for a sec
   * @param duration number, default 1
   */
  bind(duration: number | undefined = 1): void {
    this.addEffect({ name: "slowness", duration, amplifier: 254, showParticles: false });
    this.selfParticle("cz:bind", { ...this.source.location, y: this.source.location.y + 2.3 });
  }

  // Get other Entity methods

  /**
   * Get all entity from this entity view
   * @param maxDistance number, default 6
   * @returns EntityRaycastHit[]
   */
  getEntityFromDistance(maxDistance: number | undefined = 6): EntityRaycastHit[] {
    let excludeNames: string[] = [];
    if (this.source instanceof Player) excludeNames = [...Terra.guild.getTeammate(this.source)];

    return this.source.getEntitiesFromViewDirection({ maxDistance, excludeNames, excludeTypes: NOT_VALID_ENTITY });
  }

  /**
   * Get one entity from this entity view
   * @param maxDistance number, default 6
   * @returns EntityRaycastHit | undefined
   */
  getFirstEntityFromDistance(maxDistance: number | undefined = 6): EntityRaycastHit | undefined {
    return this.getEntityFromDistance(maxDistance)[0];
  }

  /**
   * Get all entity surround this entity
   *
   * @param radius number, default 6
   * @returns Minecraft Entity[]
   */
  getEntityWithinRadius(radius: number | undefined = 6): mcEntity[] {
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

  /**
   * Get all entity inside of FOV of this entity
   *
   * @param maxDistance number, default 6
   * @param fov number, default 60, the degree from this entity
   * @returns Minecraft Entity[]
   */
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

      return angle <= halfFovRad;
    });
  }

  /**
   * Get some closer entity from this entity view distance
   *
   * @param radius number, default 3, radius for each jump
   * @param maxTargetCount number, default 1
   * @param excludeId string[], entity id, that will not be included
   * @returns Minecraft Entity[]
   */
  getChainedEntityFromDistance(
    radius: number | undefined = 3,
    maxTargetCount: number | undefined = 1,
    excludeId: string[] = []
  ): mcEntity[] {
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

  /**
   * Get location of this entity view
   *
   * @param distance number, default 6
   * @returns
   */
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

  /**
   * Refresh this entity
   */
  refreshEntity(): void {
    this.remTag(["silent_target", "liberator_target", "silence", "lectaze_target", "fireing_zone", "catlye_ult"]);
  }

  // 3D Particle

  /**
   * Spawn entity particel on this entity location
   *
   * @param namespace string, name of particle
   * @param event string, event of particle
   * @param location Vector3, default this entity location
   */
  spawnParticle(namespace: string, event: string, location: Vector3 | undefined = this.source.location): void {
    const particle = this.source.dimension.spawnEntity(namespace, location);

    particle.triggerEvent(event);
  }
}

export { Entity };
