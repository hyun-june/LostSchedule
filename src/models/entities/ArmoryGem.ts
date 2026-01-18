export interface ArmoryGem {
  Gems: Gem;
  Effects: ArmoryGemEffect;
}

interface Gem {
  Slot: number;
  Name: string;
  Icon: string;
  Level: number;
  Grade: string;
  Tooltip: string;
}

interface ArmoryGemEffect {
  Description: string;
  Skills: GemEffect;
}

interface GemEffect {
  GemSlot: number;
  Name: string;
  Description: string[];
  Option: string;
  Icon: string;
  Tooltip: string;
}
