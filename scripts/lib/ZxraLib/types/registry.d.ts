import { BlockCustomComponent, ItemCustomComponent } from "@minecraft/server";

interface BlockRegisterData {
  name: string;
  callback: BlockCustomComponent;
}

interface ItemRegisterData {
  name: string;
  callback: ItemCustomComponent;
}

export type { BlockRegisterData, ItemRegisterData };
