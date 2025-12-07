import { CooldownData } from "../module";
import { Specialist } from "./Specialist";

interface Cooldown {
  sp: Specialist;
}

/**
 * Object cooldown data for specialist
 */
class Cooldown {
  constructor(player: Specialist) {
    this.sp = player;
  }

  // Data methods

  /**
   * Get all cooldown data of player
   *
   * @returns CooldownData[]
   */
  getData(): CooldownData[] {
    return this.sp.getSp().cd || [];
  }

  /**
   * Set current cooldown data of player
   *
   * @param newData
   */
  setData(newData: CooldownData[]): void {
    const data = this.sp.getSp();
    data.cd = newData;
    this.sp.setSp(data);
  }

  // Functional methods

  /**
   * Adding or increasing cooldown from player
   *
   * @param name name of cooldown
   * @param duration duration of cooldown, can negative
   * @throws when name is empty string
   */
  addCd(name: string, duration: number = 1): void {
    if (name === "") throw new Error("Invalid name");

    const data = this.getData(),
      find = data.findIndex((e) => e.name === name);

    if (find === -1) {
      data.push({ name, duration });
    } else {
      data[find].duration = Math.max(data[find].duration, duration);
    }
    this.setData(data);
  }

  /**
   * Subtract cooldown duration from player
   *
   * @param name
   * @param duration duration of cooldown to be subtract, only positive number
   * @throws when name is empty string
   */
  minCd(name: string, duration: number = 1): void {
    if (name === "") throw new Error("Invalid name");

    const data = this.getData(),
      find = data.findIndex((e) => e.name === name);

    if (find === -1) return;
    if (data[find].duration < duration) {
      data.splice(find, 1);
    } else {
      data[find].duration -= duration;
    }
    this.setData(data);
  }

  /**
   * Remove cooldown from player
   *
   * @param name name of cooldown
   * @throws when name is empty string
   */
  remCd(name: string): void {
    if (name === "") throw new Error("Invalid name");

    const data = this.getData(),
      find = data.findIndex((e) => e.name === name);

    if (find === -1) return;
    data.splice(find, 1);
    this.setData(data);
  }

  // Check methods

  /**
   * Get cooldown by name from player
   *
   * @param name name of cooldown
   * @returns CooldownData | undefined
   * @throws when name is empty string
   */
  getCdByName(name: string): CooldownData | undefined {
    if (name === "") throw new Error("Invalid name");
    return this.getData().find((e) => e.name === name);
  }

  /**
   * Check if player has cooldown with matching name
   *
   * @param name name of cooldown
   * @returns boolean
   * @throws when name is empty string
   */
  hasCd(name: string): boolean {
    if (name === "") throw new Error("Invalid name");
    return this.getData().some((e) => e.name === name);
  }

  /**
   * Check if player can using skill, if true it has been set to add its cooldown
   *
   * @param name name of cooldown
   * @param duration  duration of cooldown
   * @returns boolean
   * @throws when namen is empty string
   */
  canSkill(name: string, duration: number): boolean {
    if (name === "") throw new Error("Invalid name");
    if (duration < 0) duration = 1;
    if (this.hasCd(name) || this.hasCd("on_skill")) {
      this.sp.source.onScreenDisplay.setActionBar({ translate: "system.onCooldown" });
      return false;
    }
    this.addCd(name, duration);
    return true;
  }

  /**
   * Set if player has already use skill now
   *
   * @param duration duration of on skill
   */
  setIsSkill(duration: number): void {
    if (duration < 0) duration = 1;

    this.addCd("on_skill", duration);
  }
}

export { Cooldown };
