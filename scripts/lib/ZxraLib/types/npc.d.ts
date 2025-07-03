type NPC = Prettify<{
  data: NpcData;
  models: NpcModels;
}>;
type NpcConst = {
  npc?: YuriConst;
};

type NpcModels = YuriModels;
type NpcData = YuriData;

type YuriConst = {
  data: YuriData;
  models: YuriModels;
};
interface YuriData {
  greet: string[];
}
type YuriModels = {};

export { NPC, NpcData, NpcModels, YuriConst, YuriData, YuriModels };
