import { CreateObject, LeaderboardData, Terra } from "../module";

class Leaderboard {
  getData(): LeaderboardData {
    return Terra.world.leaderboards || CreateObject.createLeaderboard();
  }

  setData(data: LeaderboardData): void {
    if (!data) throw new Error("Missing data");

    Terra.setleaderboard(data);
  }
}

export { Leaderboard };
