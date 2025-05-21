import { CooldownData } from "../module";
import { Specialist } from "./Specialist";

interface Cooldown {
  sp: Specialist;
}

class Cooldown {
  constructor(player: Specialist) {
    if (!player) throw new Error("Missing player");

    this.sp = player;
  }

  // Data methods
  getData(): CooldownData[] {
    return this.sp.getSp().cd || [];
  }
  setData(newData: CooldownData[]): void {
    if (!newData) throw new Error("Missing new data");

    const data = this.sp.getSp();
    data.cd = newData;
    this.sp.setSp(data);
  }

  // Functional methods
  addCd(name: string, duration: number = 1): void {
    if (!name) throw new Error("Missing name");

    const data = this.getData(),
      find = data.findIndex((e) => e.name === name);

    if (find === -1) {
      data.push({ name, duration });
    } else {
      data[find].duration = Math.max(data[find].duration, duration);
    }
    this.setData(data);
  }
  minCd(name: string, duration: number = 1): void {
    if (!name) throw new Error("Missing name");

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
  remCd(name: string): void {
    if (!name) throw new Error("Missing name");

    const data = this.getData(),
      find = data.findIndex((e) => e.name === name);

    if (find === -1) return;
    data.splice(find, 1);
    this.setData(data);
  }

  // Check methods
  getCdByName(name: string): CooldownData | undefined {
    if (!name) throw new Error("Missing name");

    return this.getData().find((e) => e.name === name);
  }
  hasCd(name: string): boolean {
    if (!name) throw new Error("Missing name");
    return this.getData().some((e) => e.name === name);
  }
  canSkill(name: string, duration: number): boolean {
    if (name === "") throw new Error("Missing name");
    if (duration < 0) throw new Error("Parameter duration must be positive");
    if (this.hasCd(name) || this.hasCd("on_skill")) {
      this.sp.source.onScreenDisplay.setActionBar({ translate: "system.onCooldown" });
      return false;
    }
    this.addCd(name, duration);
    return true;
  }
  setIsSkill(duration: number): void {
    if (duration < 0) throw new Error("Parameter duration must be positive");

    this.addCd("on_skill", duration);
  }
}

export { Cooldown };
