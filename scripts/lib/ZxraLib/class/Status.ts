import { Entity, NOT_ALLOWED_ENTITY_TICK, StatusData, StatusDecay, StatusFinder, StatusTypes } from "../module";

interface Status {
  entity: Entity;
}

class Status {
  constructor(entity: Entity) {
    if (!entity) throw new Error("Missing Entity");

    this.entity = entity;
  }

  getData(): StatusData[] {
    const data = this.entity.getEnt();

    return data.status;
  }
  setData(newData: StatusData[]): void {
    if (!newData) throw new Error("Missing data");
    const data = this.entity.getEnt();

    data.status = newData;

    this.entity.setEnt(data);
  }
  clearData(): void {
    this.setData([]);
  }

  getStatus(finder?: StatusFinder): StatusData[] {
    const data = this.getData();

    if (finder) {
      return data.filter((e) => {
        const key = Object.keys(finder)[0] as keyof StatusFinder;
        return e[key] === finder[key];
      });
    }

    return data;
  }
  hasStatus(finder: StatusFinder): boolean {
    return this.getData().some((e) => {
      const key = Object.keys(finder)[0] as keyof StatusFinder;
      return e[key] === finder[key];
    });
  }

  // Functional
  addStatus(
    name: string,
    duration: number = 1,
    {
      type = "none",
      decay = "time",
      stack = false,
      lvl = 1,
    }: { type: StatusTypes | string; decay: StatusDecay | string; stack: boolean; lvl: number }
  ): void {
    if (NOT_ALLOWED_ENTITY_TICK.includes(this.entity.source.name)) throw new Error("Entity not allowed");

    switch (type) {
      case "silence":
        this.entity.addTag("silence");
        break;
    }
    const data = this.getData(),
      find = data.findIndex((e) => e.name === name);

    if (find === -1) {
      data.push({ name, duration, type, lvl, decay, stack });
    } else {
      data[find].duration = Math.max(data[find].duration, duration);
      data[find].lvl = !data[find].stack ? Math.max(data[find].lvl, lvl) : data[find].lvl + lvl;
    }

    this.setData(data);
  }
  addStatusMany(status: StatusData[] | StatusData): void {
    if (!status) throw new Error("Missing status");

    if (Array.isArray(status)) {
      status.forEach(({ name, duration = 1, type = "none", lvl = 1, decay = "time", stack = false }: StatusData) =>
        this.addStatus(name, duration, { type, lvl, decay, stack })
      );
      return;
    }

    if (!(status instanceof Object)) throw new Error("Invalid parameter: status must be StatusData[] or StatusData");
    if (!status.name) throw new Error("Missing name on status");

    const { name, duration = 1, type = "none", decay = "time", lvl = 1, stack = false } = status;
    this.addStatus(name, duration, { type, lvl, decay, stack });
  }

  minStatus(name: string, duration: number = 1): void {
    if (!name) throw new Error("Missing name");

    const data = this.getData(),
      find = data.findIndex((e) => e.name === name);

    if (find === -1) throw new Error("Status not found");

    if (data[find].duration < duration) {
      this.removeStatus(name);
      return;
    }

    data[find].duration -= duration;
    this.setData(data);
  }
  minStatusLvl(name: string, lvl: number = 1): void {
    if (!name) throw new Error("Missing name");

    const data = this.getData(),
      find = data.findIndex((e) => e.name === name);

    if (find === -1) throw new Error("Status not found");

    if (data[find].lvl < lvl) {
      this.removeStatus(name);
      return;
    }

    data[find].lvl -= lvl;
    this.setData(data);
  }

  removeStatus(name: string): boolean {
    if (!name) throw new Error("Missing name");

    const data = this.getData(),
      find = data.findIndex((e) => e.name === name);

    if (find === -1) return false;

    switch (data[find].type) {
      case "silence":
        this.entity.remTag("silence");
        break;
      case "mudrock_shield":
        this.entity.source.triggerEvent("cz:shield_break");
        break;
    }

    data.splice(find, 1);
    this.setData(data);

    return true;
  }

  // Calculation methods
  normalCalcStatus(finder: StatusFinder, startingNumber: number = 0): number {
    return (
      this.getStatus(finder).reduce((all: number, cur: StatusData) => (all += cur.lvl), startingNumber) | startingNumber
    );
  }
  decimalCalcStatus(
    finder: StatusFinder,
    startingNumber: number = 1,
    perLvl: number = 0.1,
    most: boolean = false
  ): number {
    let top = startingNumber;
    const data = this.getStatus(finder);

    if (data.length < 1) return top;

    data.forEach((e) => {
      if (most) {
        top = Math.max(top, startingNumber + perLvl * e.lvl);
      } else {
        top += perLvl * e.lvl;
      }
    });

    return top;
  }
}

export { Status };
