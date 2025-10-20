import { BlockCustomComponent, ItemCustomComponent } from "@minecraft/server";

type BlockRegisterData = TempNameWithCallback<BlockCustomComponent>;

type ItemRegisterData = TempNameWithCallback<ItemCustomComponent>;

export type { BlockRegisterData, ItemRegisterData };
