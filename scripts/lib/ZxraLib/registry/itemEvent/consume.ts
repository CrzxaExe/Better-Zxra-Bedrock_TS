import { Player } from "@minecraft/server";
import { SpecialItem, Terra } from "../../module";

/* ////////////////////////////////////////////////////////////////////////////////////
 *   Minecraft Items
 *  //////////////////////////////////////////////////////////////////////////////////// */
SpecialItem.addItem("apple", (source: Player) => {
  if (!(source instanceof Player)) return;

  Terra.getSpecialistCache(source).addThirst(7);
});

SpecialItem.addItem("honey_bottle", (source: Player) => {
  if (!(source instanceof Player)) return;

  Terra.getSpecialistCache(source).addThirst(10);
});
SpecialItem.addItem("melon_slice", (source: Player) => {
  if (!(source instanceof Player)) return;

  Terra.getSpecialistCache(source).addThirst(4);
});

SpecialItem.addItem("potion", (source: Player) => {
  if (!(source instanceof Player)) return;

  Terra.getSpecialistCache(source).addThirst(14);
});

/* ////////////////////////////////////////////////////////////////////////////////////
 *   Vial
 *  //////////////////////////////////////////////////////////////////////////////////// */
SpecialItem.addItem("vial_water", (source: Player) => {
  if (!(source instanceof Player)) return;

  Terra.getSpecialistCache(source).addThirst(10);
});

// Atk
SpecialItem.addItem("vial_atk_0", (source: Player) => {
  if (!(source instanceof Player)) return;

  const sp = Terra.getSpecialistCache(source);
  sp.addThirst(10);
  sp.status.addStatus("attack_up", 60 * 1.2, { type: "attack", decay: "time", stack: false, lvl: 20 });
});
SpecialItem.addItem("vial_atk_1", (source: Player) => {
  if (!(source instanceof Player)) return;

  const sp = Terra.getSpecialistCache(source);
  sp.addThirst(12);
  sp.status.addStatus("attack_up", 60 * 1.8, { type: "attack", decay: "time", stack: false, lvl: 40 });
});

// Heal
SpecialItem.addItem("vial_heal_0", (source: Player) => {
  if (!(source instanceof Player)) return;

  const sp = Terra.getSpecialistCache(source);
  sp.addThirst(10);
  sp.heal(8);
});
SpecialItem.addItem("vial_heal_1", (source: Player) => {
  if (!(source instanceof Player)) return;

  const sp = Terra.getSpecialistCache(source);
  sp.addThirst(12);
  sp.heal(12);
});
SpecialItem.addItem("vial_heal_2", (source: Player) => {
  if (!(source instanceof Player)) return;

  const sp = Terra.getSpecialistCache(source);
  sp.addThirst(14);
  sp.heal(16);
});

// Stamina
SpecialItem.addItem("vial_stamina_0", (source: Player) => {
  if (!(source instanceof Player)) return;

  const sp = Terra.getSpecialistCache(source);
  sp.addThirst(10);
  sp.addStamina(30);
});
SpecialItem.addItem("vial_stamina_1", (source: Player) => {
  if (!(source instanceof Player)) return;

  const sp = Terra.getSpecialistCache(source);
  sp.addThirst(12);
  sp.addStamina(50);
});
SpecialItem.addItem("vial_stamina_2", (source: Player) => {
  if (!(source instanceof Player)) return;

  const sp = Terra.getSpecialistCache(source);
  sp.addThirst(14);
  sp.addStamina(60);
});

// Stamina Recovery
SpecialItem.addItem("vial_stamina_recovery_0", (source: Player) => {
  if (!(source instanceof Player)) return;

  const sp = Terra.getSpecialistCache(source);
  sp.addThirst(10);
  sp.status.addStatus("stamina_recovery", 60 * 0.8, { type: "stamina_recovery", decay: "time", lvl: 1, stack: false });
});

// Stamina Stuck
SpecialItem.addItem("vial_stamina_stuck_0", (source: Player) => {
  if (!(source instanceof Player)) return;

  const sp = Terra.getSpecialistCache(source);
  sp.addThirst(10);
  sp.status.addStatus("stamina_stuck", 60 * 1, { type: "stamina_stuck", decay: "time", lvl: 1, stack: false });
});
