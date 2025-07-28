import { ItemStack, Player } from "@minecraft/server";
import { SpecialItem, Terra, UserPanel } from "../../module";

SpecialItem.addUse("stats", (source: Player) => {
  if (!(source instanceof Player)) return;

  UserPanel.home(source);
});

SpecialItem.addUse("money_card", (source: Player) => {
  if (!(source instanceof Player)) return;

  Terra.getSpecialistCache(source).addMoney(2000);
});
