type RaidKey =
  | "kazeros"
  | "armorche"
  | "mordoom"
  | "abrelshud"
  | "egir"
  | "echidna"
  | "behemoth";

type RaidDifficulty = "normal" | "hard";

interface RaidType {
  id: string;
  raidKey: RaidKey;
  difficulty: RaidDifficulty;
  title: string;
  level: number;
  gold: number;
}

export const raidData: RaidType[] = [
  {
    id: "kazeros-normal",
    raidKey: "kazeros",
    difficulty: "normal",
    title: "종막: 카제로스(노말) 1~2관문",
    level: 1710,
    gold: 40000,
  },
  {
    id: "kazeros-hard",
    raidKey: "kazeros",
    difficulty: "hard",
    title: "종막: 카제로스(하드) 1~2관문",
    level: 1730,
    gold: 52000,
  },
  {
    id: "armorche-normal",
    raidKey: "armorche",
    difficulty: "normal",
    title: "4막: 아르모체(노말) 1~2관문",
    level: 1700,
    gold: 33000,
  },
  {
    id: "armorche-hard",
    raidKey: "armorche",
    difficulty: "hard",
    title: "4막: 아르모체(하드) 1~2관문",
    level: 1720,
    gold: 42000,
  },
  {
    id: "mordoom-normal",
    raidKey: "mordoom",
    difficulty: "normal",
    title: "3막: 모르둠(노말) 1~3관문",
    level: 1680,
    gold: 21000,
  },
  {
    id: "mordoom-hard",
    raidKey: "mordoom",
    difficulty: "hard",
    title: "3막: 모르둠(하드) 1~3관문",
    level: 1700,
    gold: 27000,
  },
  {
    id: "abrelshud-normal",
    raidKey: "abrelshud",
    difficulty: "normal",
    title: "2막: 아브렐슈드(노말) 1~2관문",
    level: 1670,
    gold: 16500,
  },
  {
    id: "abrelshud-hard",
    raidKey: "abrelshud",
    difficulty: "hard",
    title: "2막: 아브렐슈드(하드) 1~2관문",
    level: 1690,
    gold: 23000,
  },
  {
    id: "egir-normal",
    raidKey: "egir",
    difficulty: "normal",
    title: "1막: 에기르(노말) 1~2관문",
    level: 1660,
    gold: 11500,
  },
  {
    id: "egir-hard",
    raidKey: "egir",
    difficulty: "hard",
    title: "1막: 에기르(하드) 1~2관문",
    level: 1680,
    gold: 18000,
  },

  {
    id: "echidna-hard",
    raidKey: "echidna",
    difficulty: "hard",
    title: "서막: 에키드나(하드) 1~2관문",
    level: 1640,
    gold: 7200,
  },
  {
    id: "behemoth-normal",
    raidKey: "behemoth",
    difficulty: "normal",
    title: "베히모스(노말) 1~2관문",
    level: 1640,
    gold: 7200,
  },
];
