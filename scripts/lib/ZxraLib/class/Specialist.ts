import { Container, Player } from "@minecraft/server";
import {
  Entity,
  Terra,
  Cooldown,
  SpecialistData,
  CreateObject,
  SpecialistStamina,
  Rune,
  settings,
  Formater,
  Calc,
  SpecialistThirst,
} from "../module";

interface Specialist {
  container: Container;
  cooldown: Cooldown;
  rune: Rune;
}

class Specialist extends Entity {
  constructor(player: Player) {
    if (!player) throw new Error("Missing player");

    super(player);
    this.container = this.source.getComponent("inventory");
    this.cooldown = new Cooldown(this);
    this.rune = new Rune(this);
  }

  // Controller
  controllerCooldown(): void {
    this.cooldown.getData().forEach((e) => this.cooldown.minCd(e.name, 0.25));
  }
  controllerStamina(): void {
    const data = this.getSp(),
      max: number = data.stamina.max + data.stamina.additional + data.stamina.rune;

    if (data.stamina.current <= 10) {
      this.addEffectOne("slowness", 2, 1);
    }
    if (data.stamina.current <= 1) {
      this.cooldown.addCd("tired", 12);
    }

    const setting = Terra.world.setting || settings;
    if (this.source.isSprinting) {
      if (setting.staminaCooldown) this.cooldown.addCd("stamina_regen", setting.staminaExhaust || 3);
      this.minStamina(
        ((setting.staminaRun || 1.5) - this.status.decimalCalcStatus({ type: "stamina_recovery" }, 0, 0.01)) *
          (this.cooldown.hasCd("tired") ? 1.5 : 1)
      );

      return;
    }

    if (this.cooldown.hasCd("stamina_regen")) return;
    let recovery: number =
      ((setting.staminaRecovery || 2) + this.status.decimalCalcStatus({ type: "stamina_recovery" }, 0, 0.01)) *
      (this.cooldown.hasCd("tired") ? 0.5 : 1);
    if (data.stamina.current + recovery > max) recovery = max - data.stamina.current;

    if (recovery <= 0) return;
    this.addStamina(recovery);
  }
  controllerUI(): void {
    const { cd: cols, level, rep, stamina, thirst, money, voxn } = this.getSp();

    const cd: string[] = cols.map((e) => `${Formater.formatName(e.name)} ${e.duration.toFixed(2)}s`);
    const sts: string[] = this.status.getStatus().map((e) => {
      return `${e.name} ${e.duration}s`;
    });

    this.source.onScreenDisplay.setTitle(
      `cz:ui ${this.source.name}
(${((level.xp / Calc.specialistLevelUp(level.current)) * 100).toFixed(1)}) ${level.xp} XP ${level.current} < [SP]

§a$${money}§r§f §b${voxn} Voxn§r§f
 
§eS ${((stamina.current / Math.floor(stamina.max + stamina.additional + stamina.rune)) * 100).toFixed(
        0
      )}%§r§f §1T ${Number((thirst.current / thirst.max) * 100).toFixed(0)}§r§f
§5Rep ${rep}§r§f AP ${Terra.players.length}
${
  this.source.getBlockFromViewDirection({ maxDistance: Terra.world.setting?.whatSeeDistance || 7 })?.block?.type.id ||
  "minecraft:air"
}${cd.length > 0 ? "\n\nCooldown:\n" + cd.join("\n") : ""}${sts.length > 0 ? "\n\nStatus:\n" + sts.join("\n") : ""}`,
      { fadeInDuration: 0, fadeOutDuration: 0, stayDuration: 0 }
    );
  }

  // Data methods
  getSp(): SpecialistData {
    const data = Terra.getSpecialist(this.source.id);

    if (!data) return CreateObject.createSpecialist(this.source);
    return data;
  }
  setSp(newData: SpecialistData): void {
    if (!newData) throw new Error("Missing new data");

    Terra.setSpecialist(newData);
  }

  // Stamina methods
  getStamina(): SpecialistStamina {
    return this.getSp().stamina;
  }
  addStamina(amount: number = 1): void {
    const data = this.getSp();

    if (data.stamina.current + amount <= 0) {
      this.setStamina(0);
      return;
    }

    data.stamina.current += amount;
    this.setSp(data);
  }
  minStamina(amount: number = 1): void {
    this.addStamina(-amount);
  }
  setStamina(value: number = 1): void {
    const data = this.getSp();

    data.stamina.current = value;
    this.setSp(data);
  }
  setMaxStamina(key: "max" | "additional" | "rune", amount: number): void {
    if (!key || !amount) throw new Error("Missing key or amount");

    if (amount < 0) throw new Error("Amount cannot be negative");

    const data = this.getSp();
    data.stamina[key] += amount;
    this.setSp(data);
  }
  resetToMaxStamina(): void {
    const {
      stamina: { max, additional, rune },
    } = this.getSp();
    this.setStamina(Math.floor(max + additional + rune));
  }

  // Thirst methods
  getThirst(): SpecialistThirst {
    return this.getSp().thirst;
  }
  addThirst(amount: number = 1): void {
    const data = this.getSp();

    data.thirst.current = parseInt((data.thirst.current + amount).toFixed(3));
    this.setSp(data);
  }
  minThirst(amount: number): void {
    this.addStamina(amount);
  }
  setThirst(value: number): void {
    const data = this.getSp();

    data.thirst.current = parseInt(value.toFixed(1));
    this.setSp(data);
  }
  setToMaxThirst(): void {
    const data = this.getSp();
    this.setThirst(data.thirst.max);
  }
  setMaxThrist(key: "max" | "temp", amount: number = 0): void {
    const data = this.getSp();

    data.thirst[key] += amount;
    this.setSp(data);
  }

  // Money methods
  getMoney(): number {
    return this.getSp().money;
  }
  addMoney(amount: number = 1): void {
    const data = this.getSp();

    data.money = parseInt((data.money + amount).toFixed(2));
    this.setSp(data);
  }
  minMoney(amount: number = 1): void {
    this.addMoney(-amount);
  }
  setMoney(value: number = 0): void {
    const data = this.getSp();

    data.money = parseInt(value.toFixed(2));
    this.setSp(data);
  }
}

export { Specialist };
