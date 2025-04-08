// Player interface
interface PlayerFinder {
  name?: string;
  id?: string;
}

// Redeem interface
interface RedeemData {
  id: string;
  key: string;
  rewards: Array<RedeemRewards>;
}
interface RedeemRewards {
  type: string;
  item?: string;
  amount: number;
}

// World interface
interface WorldData {
  redeem?: Array<RedeemData>;
}

export type { PlayerFinder, RedeemData, RedeemRewards, WorldData };
