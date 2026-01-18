export interface ArmoryProfile {
  CharacterImage: string;
  ExpeditionLevel: number;
  PvpGradeName: string;
  TownLevel: number | null;
  Title: string;
  GuildMemberGrade: string;
  GuildName: string;
  UsingSkillPoint: number;
  TotalSkillPoint: number;
  Stats: Stat;
  Tendencies: Tendency;
  CombatPower: string;
  Decorations: Decoration;
  HonorPoint: number;
  ServerName: string;
  CharacterName: string;
  CharacterLevel: number;
  CharacterClassName: string;
  ItemAvgLevel: string;
}

interface Stat {
  Type: string;
  Value: string;
  Tooltip: string[];
}

interface Tendency {
  Type: string;
  Point: number;
  MaxPoint: number;
}

interface Decoration {
  Symbol: string;
  Emblems: string[];
}
