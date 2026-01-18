export interface ArkGrid {
  Effects: ArkGridEffect[];
  Slots: ArkGridSlot[];
}
interface ArkGridEffect {
  Name: string;
  Level: number;
  Tooltip: string;
}
interface ArkGridSlot {
  Index: number;
  Icon: string;
  Name: string;
  Point: number;
  Grade: string;
  Tooltip: string;
  Gems: ArkGridGem[];
}
interface ArkGridGem {
  Index: number;
  Icon: string;
  IsActive: boolean;
  Grade: string;
  Tooltip: string;
}
