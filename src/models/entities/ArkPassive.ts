export interface ArkPassive {
  IsArkPassive: boolean;
  Points: ArkPassivePoint[];
  Effects: ArkPassiveEffectSkill[];
}

interface ArkPassivePoint {
  Name: string;
  value: number;
  Tooltip: string;
  Description: string;
}

interface ArkPassiveEffectSkill {
  Name: string;
  Icon: string;
  Tooltip: string;
  Description: string;
}
