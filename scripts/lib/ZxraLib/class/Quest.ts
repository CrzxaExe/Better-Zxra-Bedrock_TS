import { Player } from "@minecraft/server";
import {
  Formater,
  QuestConst,
  QuestController,
  QuestData,
  QuestFind,
  questIndex,
  QuestPlayer,
  QuestRewards,
  QuestTask,
  Terra,
} from "../module";

interface Quest {
  in: QuestConst;
}

/**
 * Quest player class, control player quest
 */
class Quest {
  constructor(player: Player) {
    this.in = {
      player,
      sp: Terra.getSpecialistCache(player),
    };
  }

  // Controller

  /**
   *  Quest controller method
   *
   * @param param { act: QuestType, target: Entity | Block, amount: number }
   */
  controller({ act, target, amount = 1 }: QuestController): void {
    const data = this.getPlayerQuest();

    if (data.id === -1) return;
    const quest = this.getQuest(data.id);

    quest?.task.forEach((e, i) => {
      if (e.act !== act) return;

      const name: string = target.typeId.split(":")[1];

      if (e.target !== name) return;
      if (data.progress[i] + amount > e.amount) return;
      this.updatePlayerQuest(i);

      this.in.player.onScreenDisplay.setActionBar(`${Formater.formatName(name)}: ${data.progress[i + 1]}/${e.amount}`);
    });
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
    data.quest!.progress[index] += amount;
    this.in.sp.setSp(data);

    this.questReward(data.quest!);
  }
  setPlayerQuest(quest: QuestData): void {
    const data = this.in.sp.getSp();

    data.quest = {
      id: this.getQuestIndex(quest),
      progress: Array(quest.task.length),
    };
    this.in.sp.setSp(data);
  }
  setRandom(): void {
    const availableQuest = questIndex.filter((e) => e.rep <= this.in.sp.getRep());

    if (availableQuest.length < 1) {
      this.in.player.sendMessage({ translate: "system.rep.up" });
      return;
    }

    const quest = availableQuest[Math.floor(Math.random() * availableQuest.length)];

    this.setPlayerQuest(quest);
  }

  isQuestClear(data: QuestPlayer = this.getPlayerQuest()): boolean {
    if (data.id === -1) return false;
    const quest = this.getQuest(data.id);

    return quest ? data.progress.every((e, i) => e >= quest.task[i].amount) : false;
  }
  questReward(data: QuestPlayer): void {
    if (data.id === -1) return;
    if (!this.isQuestClear(data)) return;

    const quest = this.getQuest(data.id),
      guild = Terra.guild.getGuildByPlayer(this.in.player);

    quest?.reward.forEach(({ type, amount }: QuestRewards) => {
      const [name, item] = type.split("/");

      switch (name) {
        case "cash":
          if (guild) amount * -1.3;
          this.in.sp.addMoney(amount);
          break;
        case "token":
          if (!guild) return;
          Terra.guild.addToken(guild.id);
          break;
        case "voxn":
          if (guild) amount *= 1.5;
          this.in.sp.addVoxn(amount);
          break;
        case "item":
          this.in.sp.inventory.addItem(item, amount);
          break;
      }
    });
  }

  // Get raw
  rawReward(quest: QuestData): string {
    const result: string[] = [];

    const isJoinGuild: boolean = Terra.guild.hasJoinGuild(this.in.player);

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
  rawAct(quest: QuestData, playerQuest: QuestPlayer = this.getPlayerQuest()): string {
    const result: string[] = [];

    quest.task.forEach(({ act, amount, target }: QuestTask, i: number) => {
      const name = Formater.formatName(target);

      result.push(`- ${Formater.formatName(act)} ${name} ${playerQuest.progress[i]}/${amount}`);
    });

    return result.join("\n");
  }
}

export { Quest };
