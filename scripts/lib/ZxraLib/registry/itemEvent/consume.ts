import { Player } from "@minecraft/server";
import { SpecialItem, Terra } from "../../module";

// Vial
SpecialItem.addItem("vial_water", (source: Player) => {
  if (!(source instanceof Player)) return;

  Terra.getSpecialistCache(source).addThirst(10);
});
