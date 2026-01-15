import { raidData } from "./raidData";

interface calcRaidInfoProps {
  difficulty: string;
  gold: number;
  more: number;
}

export const calcRaidReward = (
  raidName: string,
  raidInfo: calcRaidInfoProps
) => {
  const raid = raidData.find((item) => item.title === raidName);
  if (!raid) return { gold: 0, more: 0 };

  const stage = raid.stages.find(
    (stage) => stage.difficulty === raidInfo.difficulty
  );
  if (!stage) return { gold: 0, more: 0 };

  return {
    gold: raidInfo.gold ? stage.gold : 0,
    more: raidInfo.more ? stage.more : 0,
  };
};
