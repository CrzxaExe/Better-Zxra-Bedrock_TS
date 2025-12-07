export const CurrencyEnums = {
  Money: "money",
  Voxn: "voxn",
} as const;

export type Currency = ObjectValues<typeof CurrencyEnums>;
