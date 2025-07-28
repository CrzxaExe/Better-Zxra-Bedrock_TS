type GachaRarity = "unique" | "epic" | "legend" | "rare";
type GachaPoll = { [K in GachaRarity]: string[] };

export const gachaPolls: { [key: string]: GachaPoll } = {
  normal: {
    unique: [
      "boltizer",
      "catlye",
      "destiny",
      "destreza",
      "endless",
      "lectaze",
      "liberator",
      "mudrock",
      "pandora",
      "quezn",
      "silent",
      "skyler",
    ],
    epic: ["berserk", "bringer", "cenryter", "crusher", "undying", "yume_staff"],
    legend: ["azyh", "cervant", "harmist_flute", "harmony", "hyrant", "lighter", "musha", "sui", "vitage"],
    rare: ["greatsword", "hammer", "katana", "reaper", "spear"],
  },
};

export const gachaFeatured: { name: string; polls: GachaPoll } = {
  name: "Hard as Oriron",
  polls: {
    unique: ["mudrock"],
    epic: ["cenryter", "undying", "yume_staff"],
    legend: ["cervant", "harmist_flute"],
    rare: ["katana"],
  },
};

export type { GachaRarity };
