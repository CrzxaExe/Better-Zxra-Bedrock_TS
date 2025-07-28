const GuildRoles = {
  SUPERADMIN: "super_admin",
  ADMIN: "admin",
  MEMBER: "member",
} as const;

type GuildRole = ObjectValues<typeof GuildRoles>;

interface GuildData {
  id: string;
  name: string;
  level: GuildLevel;
  des: string;
  maxMember: number;
  approval: boolean;
  members: GuildMember[];
  applier: GuildMember[];
  token: number;
}
interface GuildLevel {
  lvl: number;
  xp: number;
}
interface GuildMember {
  id: string;
  name: string;
  role?: GuildRole;
}

type GuildShopItem = {
  item: string;
  texture: string;
  lvl: number;
  amount: number;
  token: number;
  enchant?: string;
};

export type { GuildRole, GuildRoles, GuildData, GuildLevel, GuildMember, GuildShopItem };
