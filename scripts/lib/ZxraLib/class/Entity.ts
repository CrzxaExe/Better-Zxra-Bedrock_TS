import { Effect, EffectTypes, EntityTypeFamilyComponent, MolangVariableMap, system, Vector3 } from "@minecraft/server";
import { EffectCreate, EntityData, Particle, Status, Terra } from "../module";

interface Entity {
  source: any;
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

  // Validation Methods
  is(type: string): boolean {
    if (!type) throw new Error("Missing Type");
    return this.source.typeId.split(":")[1] === type;
  }
  isTeammate(id: string) {
    if (!this.is("player")) throw new Error("This entity is not instance of Player");
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

  // Effect Methods
  addEffectOne(name: string, duration: number = 1, amplifier: number = 0, showParticles: boolean = true): void {
    if (!name) throw new Error("Missing Name of Effect");
    this.source.addEffect(EffectTypes.get(name), duration * 20, { amplifier, showParticles });
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
    if (typeof effect === "string") return this.source.hasEffect(effect);

    if (!Array.isArray(effect)) return false;
    return effect.reduce((all: boolean[], cur: string) => {
      const eff: boolean = this.source.hasEffect(cur);
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

  // Particle Methods
  selfParticle(
    particle: string,
    location: Vector3 = this.source.location,
    molang: MolangVariableMap = new MolangVariableMap()
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
    if (!this.source.onGround) return;
    this.particles(["cz:impact_up", "cz:impact_p"]);
  }

  // Movement Methods
  knockback(velocity: Vector3, horizontal: number = 0, vertical: number = 0): void {
    if (!velocity) throw new Error("Missing velocity");

    this.source.applyKnockback(velocity.x, velocity.z, horizontal, vertical);
  }
  bind(duration: number): void {
    this.addEffect({ name: "slowness", duration, amplifier: 254, showParticles: false });
    this.selfParticle("cz:bind", { ...this.source.location, y: this.source.location.y + 2.3 });
  }

  // Refresh Methods
  refreshEntity(): void {
    this.remTag(["silent_target", "liberator_target", "silence", "lectaze_target", "fireing_zone", "catlye_ult"]);
  }
}

export { Entity };
