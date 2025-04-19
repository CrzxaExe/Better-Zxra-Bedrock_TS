import { Player } from "@minecraft/server";
import { GuildData, GuildMember } from "../module";
import { Terra } from "./Terra";

class Guild {
  getData(finder?: { id?: string; name?: string }): GuildData[] {
    const data = Array.isArray(Terra.guild) ? Terra.guild : [];

    if (finder) {
      data.filter((e) => {
        const key = Object.keys(finder)[0] as keyof typeof finder;
        return e[key] === finder[key];
      });
    }

    return data;
  }
  updateData(updateData: GuildData): void {
    if (!updateData) throw new Error("Missing updateData");

    const data = this.getData(),
      find = data?.findIndex((e) => e.id == updateData.id);

    if (find === -1) throw new Error("Data not found");
    data[find] = updateData;

    Terra.setDataGuild(data);
  }

  // Getter
  getTeammate(user: Player | GuildMember): string[] {
    const data = this.getData(),
      find = data.findIndex((e) => e.members.some((r) => r.id === user.id));

    if (find === -1) return [user.name];

    return data[find].members.map((e) => e.name);
  }
}

export { Guild };
