import { Player } from "@minecraft/server";
import { CreateObject, LbData, LeaderboardData, LeaderboardSystemType, LeaderboardType, Terra } from "../module";

class Leaderboard {
  getData(): LeaderboardData {
    return Terra.world.leaderboards || CreateObject.createLeaderboard();
  }
  setData(data: LeaderboardData): void {
    if (!data) throw new Error("Missing data");

    Terra.setleaderboard(data);
  }

  // methods
  getLeaderBoard(leaderboardType: LeaderboardType): LbData[] {
    const data = this.getData();

    const obj = {
      chat: data.chat,
      deaths: data.deaths,
      kills: data.kills,

      splvl: Terra.specialist
        .map((e) => {
          let plyrResult = Terra.getPlayer({ id: e.id });
          const plyr: Player | undefined = Array.isArray(plyrResult) ? plyrResult[0] : plyrResult;
          if (!plyr) return undefined;
          return { id: e.id, name: plyr.name || "idk", value: e.level.current };
        })
        .filter((item): item is LbData => item !== undefined),
      guildlvl: (Terra.world.guilds || [])
        ?.map((e) => {
          return { id: e.id, name: e.name, value: e.level.lvl };
        })
        .filter((item): item is LbData => item !== undefined),
      money: Terra.specialist
        .map((e) => {
          let plyrResult = Terra.getPlayer({ id: e.id });
          const plyr: Player | undefined = Array.isArray(plyrResult) ? plyrResult[0] : plyrResult;
          if (!plyr) return undefined;
          return { id: e.id, name: plyr.name || "idk", value: e.money };
        })
        .filter((item): item is LbData => item !== undefined),
      reputation: Terra.specialist
        .map((e) => {
          let plyrResult = Terra.getPlayer({ id: e.id });
          const plyr: Player | undefined = Array.isArray(plyrResult) ? plyrResult[0] : plyrResult;
          if (!plyr) return undefined;
          return { id: e.id, name: plyr.name || "idk", value: e.rep };
        })
        .filter((item): item is LbData => item !== undefined),
      voxn: Terra.specialist
        .map((e) => {
          let plyrResult = Terra.getPlayer({ id: e.id });
          const plyr: Player | undefined = Array.isArray(plyrResult) ? plyrResult[0] : plyrResult;
          if (!plyr) return undefined;
          return { id: e.id, name: plyr.name || "idk", value: e.voxn };
        })
        .filter((item): item is LbData => item !== undefined),
    }[leaderboardType];

    return obj;
  }

  addLb(type: LeaderboardSystemType, id: string, amount: number = 1): void {
    if (id === "") throw new Error("Missing id");
    const data = this.getData(),
      find = data[type].findIndex((e) => e.id === id);

    if (find === -1) return;

    data[type][find].value += amount;

    this.setData(data);
  }

  resetLb(): void {
    this.setData(CreateObject.createLeaderboard());
  }
}

export { Leaderboard };
