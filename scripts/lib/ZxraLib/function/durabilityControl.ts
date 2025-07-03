import { Entity, EquipmentSlot, GameMode, Player } from "@minecraft/server";

export const durabilityControl = (source: Entity | Player, amount: number = 1) => {
  if (!(source instanceof Entity)) return;

  const equippable = source.getComponent("minecraft:equippable");
  if (!equippable) return;

  const mainhand = equippable.getEquipmentSlot(EquipmentSlot.Mainhand);
  if (!mainhand.hasItem()) return;
  if (source instanceof Player && source.getGameMode() === GameMode.Creative) return;

  const itemStack = mainhand.getItem(),
    durability = itemStack?.getComponent("minecraft:durability");
  if (!durability || !itemStack) return;

  const enchantable = itemStack.getComponent("minecraft:enchantable"),
    unbreakingLevel = enchantable?.getEnchantment("unbreaking")?.level;

  const damageChance = durability.getDamageChance(unbreakingLevel) / 100;

  if (Math.random() > damageChance) return;

  const shouldBreak = durability.damage === durability.maxDurability;

  if (shouldBreak) {
    mainhand.setItem(undefined);
    if (source instanceof Player) source.playSound("random.break");
  } else {
    durability.damage += amount;
    mainhand.setItem(itemStack);
  }
};
