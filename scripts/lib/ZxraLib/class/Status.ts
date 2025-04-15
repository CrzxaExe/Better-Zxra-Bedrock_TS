import { Entity } from "../module";

interface Status {
  entity: Entity;
}

class Status {
  constructor(entity: Entity) {
    if (!entity) throw new Error("Missing Entity");

    this.entity = entity;
  }
}

export { Status };
