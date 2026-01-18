export interface ArmoryCard {
  Cards: Card;
  Effects: CardEffect;
}

interface Card {
  Slot: number;
  Name: string;
  Icon: string;
  AwakeCount: number;
  AwakeTotal: number;
  Grade: string;
  Tooltip: string;
}

interface CardEffect {
  Index: number;
  CardSlots: number[];
  Items: Effect;
}

interface Effect {
  Name: string;
  Description: string;
}
