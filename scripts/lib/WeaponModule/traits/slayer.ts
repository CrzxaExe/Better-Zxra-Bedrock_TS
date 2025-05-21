import { Player } from "@minecraft/server";
import { Calc } from "../../ZxraLib/module";

export const slayerLostHPPercentation = (player: Player): number => {
  const hp = player.getComponent("health");
  if (!hp) return 0;

  return Calc.hpLostPercentage(hp) * 1.3 + 1;
};
