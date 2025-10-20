type NPC = {
  data: NpcData;
  models: NpcModels;
};
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
type YuriModels = {
  skins?: [];
  components?: [];
};

export { NPC, NpcConst, NpcData, NpcModels, YuriConst, YuriData, YuriModels };
