import { Setting } from "../module";

export const settings: Setting = {
  // chat settings
  customChat: true,
  /* placeholder for custom chat prefix
      %lvl      = player level
      %msg      = message content
      %name     = player username
      %splvl    = specialist level
  */
  customChatPrefix: "%name > %msg",
  // if true, every damage applier will summon float text of damage
  damageIndicator: true,
  // if true, debuging mode will active
  debug: true,
  // interval between saving data on minecraft tick, 1s rl is 20 tick
  saveInterval: 1800, // 90 sec
  // Amount of stamina that will decrease while do some activity
  staminaAction: 5,
  // After some activity, it will stop regen the stamina after some minutes
  staminaCooldown: true,
  // Time of stamina to regen after some activity
  staminaExhaust: 3,
  // Amount of stamina loss while being hit
  staminaHurt: 4,
  // Amount of stamina while recovery
  staminaRecovery: 2,
  // Amount of stamina that decrease while running
  staminaRun: 2.5,
  // distance player seen block id
  whatSeeDistance: 7,
};
