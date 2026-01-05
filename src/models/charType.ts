import {
  ArkGrid,
  ArkPassive,
  ArmoryAvatar,
  ArmoryCard,
  ArmoryEngraving,
  ArmoryEquipment,
  ArmoryGem,
  ArmoryProfile,
  ArmorySkill,
  Collectible,
  ColosseumInfo,
} from "./entities";

export interface CharAllData {
  ArkGrid: ArkGrid;
  ArkPassive: ArkPassive;
  ArmoryAvatar: ArmoryAvatar;
  ArmoryCard: ArmoryCard;
  ArmoryEngraving: ArmoryEngraving;
  ArmoryEquipment: ArmoryEquipment[];
  ArmoryGem: ArmoryGem;
  ArmoryProfile: ArmoryProfile;
  ArmorySkills: ArmorySkill[];
  Collectibles: Collectible[];
  ColosseumInfo: ColosseumInfo;
}

export interface CharData {
  ExpeditionLevel?: number;
  CharacterName?: string;
  GuildName?: string;
  CharacterClassName?: string;
  CharacterImage?: string;
  CharacterLevel?: number;
  CombatPower?: string;
  ItemAvgLevel?: string;
  ServerName?: string;
  Title?: string;
  TownName?: string;
  HonorPoint?: number;
}

export interface CharFormProps {
  charProfile: CharData;
  classEngraving: string;
}

export interface CharInfoProps {
  label: string;
  data: string | number;
}
