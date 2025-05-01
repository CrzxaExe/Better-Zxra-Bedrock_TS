import { Player } from "@minecraft/server";
import { CreateObject, GuildData, GuildMember, GuildRole } from "../module";
import { Terra } from "./Terra";

class Guild {
  getData(finder?: { id?: string; name?: string }): GuildData[] {
    const data = Array.isArray(Terra.world.guilds) ? Terra.world.guilds : [];

    if (finder) {
      data.filter((e) => {
        const key = Object.keys(finder)[0] as keyof typeof finder;
        return e[key] === finder[key];
      });
    }

    return data;
  }
  getGuild(id: string): GuildData | undefined {
    return this.getData().find((e) => e.id === id);
  }
  updateData(updateData: GuildData): void {
    if (!updateData) throw new Error("Missing updateData");

    const data = this.getData(),
      find = data?.findIndex((e) => e.id == updateData.id);

    if (find === -1) throw new Error("Data not found");
    data[find] = updateData;

    Terra.setDataGuild(data);
  }
  deleteGuild(id: string): void {
    if (id.length < 1) throw new Error("Missing id");

    const data = this.getData(),
      find = data.findIndex((e) => e.id === id);

    if (find === -1) throw new Error("Data not found");
    data.splice(find, 1);
    Terra.setDataGuild(data);
  }

  // Getter
  getGuildByPlayer(player: Player): GuildData | undefined {
    return this.getData().find((e) => e.members.some((r) => r.id === player.id));
  }
  getTeammate(user: Player | GuildMember): string[] {
    const data = this.getData(),
      find = data.findIndex((e) => e.members.some((r) => r.id === user.id));

    if (find === -1) return [user.name];
    return data[find].members.map((e) => e.name);
  }

  // Guild methods
  createGuild(player: Player, name: string, des: string, approval: boolean = false): void {
    const newGuild: GuildData = {
      id: CreateObject.createUUID(Terra.world.setting?.uuidLength || 12),
      name,
      level: { lvl: 0, xp: 0 },
      des,
      approval,
      maxMember: 5,
      members: [{ id: player.id, name: player.name, role: "superadmin" }],
      applier: [],
      token: 0,
    };

    const data = this.getData() || [];
    data.push(newGuild);
    Terra.setDataGuild(data);
  }

  addMember(id: string, player: Player | GuildMember): void {
    if (id.length < 1) throw new Error("Missing id");

    const data = this.getData(),
      find = data.findIndex((e) => e.id === id);

    if (find === -1) throw new Error("Data not found");
    if (data[find].members.some((e) => e.id === player.id)) return;

    data[find].members.push({ id: player.id, name: player.name, role: "member" });
    Terra.setDataGuild(data);
  }
  updateMember(id: string, player: Player | GuildMember, role: GuildRole = "member"): void {
    if (id.length < 1) throw new Error("Missing id");

    const data = this.getData(),
      find = data.findIndex((e) => e.id === id);

    if (find === -1) throw new Error("Data not found");
    if (!data[find].members.some((e) => e.id === player.id)) throw new Error("Member not found");

    const index = data[find].members.findIndex((e) => e.id === player.id);
    data[find].members[index].role = role;
    Terra.setDataGuild(data);
  }
  removeMember(id: string, player: Player | GuildMember): void {
    if (id.length < 1) throw new Error("Missing id");

    const data = this.getData(),
      find = data.findIndex((e) => e.id === id);

    if (find === -1) throw new Error("Data not found");
    if (!data[find].members.some((e) => e.id === player.id)) throw new Error("Member not found");

    const index = data[find].members.findIndex((e) => e.id === player.id);
    data[find].members.splice(index, 1);
    Terra.setDataGuild(data);
  }

  addApply(id: string, player: Player | GuildMember): void {
    if (id.length < 1) throw new Error("Missing id");

    const data = this.getData(),
      find = data.findIndex((e) => e.id === id);

    if (find === -1) throw new Error("Data not found");
    if (data[find].applier.some((e) => e.id === player.id)) return;

    data[find].applier.push({ id: player.id, name: player.name, role: "member" });
    Terra.setDataGuild(data);
  }
  removeApply(id: string, player: Player | GuildMember): void {
    if (id.length < 1) throw new Error("Missing id");

    const data = this.getData(),
      find = data.findIndex((e) => e.id === id);

    if (find === -1) throw new Error("Data not found");
    if (!data[find].applier.some((e) => e.id === player.id)) throw new Error("Applier not found");

    const index = data[find].applier.findIndex((e) => e.id === player.id);
    data[find].applier.splice(index, 1);
    Terra.setDataGuild(data);
  }

  acceptApply(id: string, player: Player | GuildMember): void {
    if (id.length < 1) throw new Error("Missing id");

    const data = this.getData(),
      find = data.findIndex((e) => e.id === id);

    if (find === -1) throw new Error("Data not found");
    if (!data[find].applier.some((e) => e.id === player.id)) throw new Error("Applier not found");

    const index = data[find].applier.findIndex((e) => e.id === player.id);
    const user = data[find].applier.splice(index, 1)[0];

    this.addMember(id, user);
  }

  addToken(id: string, amount: number = 1): void {
    if (id.length < 1) throw new Error("Missing id");

    const data = this.getData(),
      find = data.findIndex((e) => e.id === id);

    if (find === -1) throw new Error("Data not found");
    data[find].token += amount;
    Terra.setDataGuild(data);
  }
  setToken(id: string, value: number = 1): void {
    if (id.length < 1) throw new Error("Missing id");

    const data = this.getData(),
      find = data.findIndex((e) => e.id === id);

    if (find === -1) throw new Error("Data not found");
    data[find].token = value;
    Terra.setDataGuild(data);
  }
  minToken(id: string, amount: number): void {
    this.addToken(id, -amount);
  }

  addXp(id: string, amount: number): void {
    if (id.length < 0) throw new Error("Missing id");

    const data = this.getData(),
      find = data.findIndex((e) => e.id === id);

    if (find === -1) throw new Error("Data not found");
    data[find].level.xp += amount;
    Terra.setDataGuild(data);
  }
  setXp(id: string, value: number): void {
    if (id.length < 0) throw new Error("Missing id");

    const data = this.getData(),
      find = data.findIndex((e) => e.id === id);

    if (find === -1) throw new Error("Data not found");
    data[find].level.xp = value;
    Terra.setDataGuild(data);
  }

  addLvl(id: string, amount: number): void {
    if (id.length < 0) throw new Error("Missing id");

    const data = this.getData(),
      find = data.findIndex((e) => e.id === id);

    if (find === -1) throw new Error("Data not found");
    data[find].level.lvl += amount;
    Terra.setDataGuild(data);
  }
  setLvl(id: string, value: number): void {
    if (id.length < 0) throw new Error("Missing id");

    const data = this.getData(),
      find = data.findIndex((e) => e.id === id);

    if (find === -1) throw new Error("Data not found");
    data[find].level.lvl = value;
    Terra.setDataGuild(data);
  }

  hasJoinGuild(player: Player): boolean {
    return !!this.getGuildByPlayer(player);
  }
}

export { Guild };
