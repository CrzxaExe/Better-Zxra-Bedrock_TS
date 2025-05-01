import { Player } from "@minecraft/server";
import {
  Formater,
  QuestConst,
  QuestData,
  QuestFind,
  questIndex,
  QuestPlayer,
  QuestRewards,
  Specialist,
  Terra,
} from "../module";

interface Quest {
  in: QuestConst;
}

class Quest {
  constructor(player: Player) {
    if (!player) throw new Error("Missing player");

    this.in = {
      player,
      sp: new Specialist(player),
    };
  }

  // Quest method
  getQuest(index: number): QuestData | undefined {
    if (index < 0) return;
    return questIndex[index];
  }
  getQuestIndex(quest: QuestData): number {
    return questIndex.findIndex((e) => e.title === quest.title);
  }
  getQuestByTitle(name: string): QuestFind | undefined {
    const data = questIndex.findIndex((e) => e.title === name);
    if (!data) return;
    return { id: data, quest: questIndex[data] };
  }

  getPlayerQuest(): QuestPlayer {
    return this.in.sp.getSp().quest || { id: -1, progress: [] };
  }
  clearPlayerQuest(): void {
    const data = this.in.sp.getSp();
    data.quest = undefined;
    this.in.sp.setSp(data);
  }
  updatePlayerQuest(index: number, amount: number = 1): void {
    if (index < 0) throw new Error("Index must positive");

    const data = this.in.sp.getSp();
    data.quest.progress[index] += amount;
    this.in.sp.setSp(data);
  }
  setPlayerQuest(quest: QuestData): void {
    const data = this.in.sp.getSp();

    data.quest = {
      id: this.getQuestIndex(quest),
      progress: Array(quest.task.length),
    };
    this.in.sp.setSp(data);
  }

  // Get raw
  rawReward(quest: QuestData, player: Player): string {
    let result: string[] = [];

    const isJoinGuild: boolean = Terra.guild.hasJoinGuild(player);

    quest.reward.forEach(({ type, amount }: QuestRewards) => {
      const [name, item] = type.split("/");

      switch (name) {
        case "cash":
          if (isJoinGuild) amount *= 1.3;
          result.push(`$${amount}`);
          break;
        case "token":
          if (!isJoinGuild) break;
          result.push(`${amount} Token Guild`);
          break;
        case "voxn":
          if (isJoinGuild) amount *= 1.5;
          result.push(`${amount} Voxn`);
          break;
        case "item":
          result.push(`${amount} x ${Formater.formatName(item)}`);
          break;
      }
    });

    return result.join("\n");
  }
}

export { Quest };
