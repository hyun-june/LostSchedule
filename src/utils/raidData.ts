interface RaidGroup {
  raidKey: string;
  title: string;
  phases: number;
  stages: RaidStages[];
}

interface RaidStages {
  difficulty: "normal" | "hard" | "the first" | "nightmare";
  level: number;
  gold: number;
  more: number;
}

export const raidData: RaidGroup[] = [
  {
    raidKey: "Serca",
    title: "세르카",
    phases: 2,
    stages: [
      { difficulty: "nightmare", level: 1740, gold: 54000, more: 17280 },
      { difficulty: "hard", level: 1730, gold: 44000, more: 14080 },
      { difficulty: "normal", level: 1710, gold: 35000, more: 11200 },
    ],
  },
  {
    raidKey: "kazeros",
    title: "종막: 카제로스",
    phases: 2,
    stages: [
      { difficulty: "normal", level: 1710, gold: 40000, more: 12800 },
      { difficulty: "hard", level: 1730, gold: 52000, more: 16640 },
    ],
  },
  {
    raidKey: "armorche",
    title: "4막: 아르모체",
    phases: 2,
    stages: [
      { difficulty: "normal", level: 1700, gold: 33000, more: 10560 },
      { difficulty: "hard", level: 1720, gold: 42000, more: 13440 },
    ],
  },
  {
    raidKey: "mordoom",
    title: "3막: 모르둠",
    phases: 3,
    stages: [
      { difficulty: "normal", level: 1680, gold: 21000, more: 7010 },
      { difficulty: "hard", level: 1700, gold: 27000, more: 8350 },
    ],
  },
  {
    raidKey: "abrelshud",
    title: "2막: 아브렐슈드",
    phases: 2,
    stages: [
      { difficulty: "normal", level: 1670, gold: 16500, more: 5540 },
      { difficulty: "hard", level: 1690, gold: 23000, more: 7500 },
    ],
  },
  {
    raidKey: "egir",
    title: "1막: 에기르",
    phases: 2,
    stages: [
      { difficulty: "normal", level: 1660, gold: 11500, more: 2530 },
      { difficulty: "hard", level: 1680, gold: 18000, more: 5970 },
    ],
  },
  {
    raidKey: "echidna",
    title: "서막: 에키드나",
    phases: 2,
    stages: [{ difficulty: "hard", level: 1640, gold: 7200, more: 2350 }],
  },
  {
    raidKey: "behemoth",
    title: "베히모스",
    phases: 2,
    stages: [{ difficulty: "normal", level: 1640, gold: 7200, more: 2350 }],
  },
];
