export interface ArmorySkill {
  Name: string;
  Icon: string;
  Level: number;
  Type: string;
  SkillType: number;
  Tripods: SkillTripod[];
  Rune: SkillRune;
  Tooltip: string;
}

interface SkillTripod {
  Tier: number;
  Slot: number;
  Name: string;
  Icon: string;
  IsSelected: boolean;
  Tooltip: string;
}

interface SkillRune {
  Name: string;
  Icon: string;
  Grade: string;
  Tooltip: string;
}
