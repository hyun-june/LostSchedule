export interface ArmoryEngraving {
  Engravings: Engraving;
  Effects: EngravingEffect;
  ArkPassiveEffects: ArkPassiveEffects;
}

interface Engraving {
  Slot: number;
  Name: string;
  Icon: string;
  Tooltip: string;
}

interface EngravingEffect {
  Icon: string;
  Name: string;
  Description: string;
}
interface ArkPassiveEffects {
  AbilityStoneLevel: number | null;
  Grade: string;
  Level: number;
  Name: string;
  Description: string;
}
