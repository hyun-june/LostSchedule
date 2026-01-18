export interface ColosseumInfo {
  Rank: number;
  PreRank: number;
  Exp: number;
  Colosseums: Colosseum[];
}

interface Colosseum {
  ServerName: string;
  Competitive: AggregationTeamDeathMatchRank;
  TeamDeathmatch: AggregationTeamDeathMatch;
  TeamElimination: AggregationElimination;
  CoOpBattle: Aggregation;
  OneDeathmatch: AggregationOneDeathmatch;
  OneDeathmatchRank: AggregationOneDeathmatchRank;
}

interface AggregationTeamDeathMatchRank {
  Rank: number;
  RankName: string;
  RankIcon: string;
  RankLastMmr: number;
  PlayCount: number;
  VictoryCount: number;
  LoseCount: number;
  TieCount: number;
  KillCount: number;
  AceCount: number;
  DeathCount: number;
}

interface AggregationTeamDeathMatch {
  AssistCount: number;
  PlayCount: number;
  VictoryCount: number;
  LoseCount: number;
  TieCount: number;
  KillCount: number;
  AceCount: number;
  DeathCount: number;
}

interface AggregationElimination {
  FirstWinCount: number;
  SecondWinCount: number;
  ThirdWinCount: number;
  FirstPlayCount: number;
  SecondPlayCount: number;
  ThirdPlayCount: number;
  AllKillCount: number;
  PlayCount: number;
  VictoryCount: number;
  LoseCount: number;
  TieCount: number;
  KillCount: number;
  AceCount: number;
  DeathCount: number;
}

interface Aggregation {
  PlayCount: number;
  VictoryCount: number;
  LoseCount: number;
  TieCount: number;
  KillCount: number;
  AceCount: number;
  DeathCount: number;
}

interface AggregationOneDeathmatch {
  KillCount: number;
  DeathCount: number;
  AllKillCount: number;
  OutDamage: number;
  InDamage: number;
  FirstWinCount: number;
  SecondWinCount: number;
  ThirdWinCount: number;
  FirstPlayCount: number;
  SecondPlayCount: number;
  ThirdPlayCount: number;
}

interface AggregationOneDeathmatchRank {
  KillCount: number;
  DeathCount: number;
  AllKillCount: number;
  OutDamage: number;
  InDamage: number;
  FirstWinCount: number;
  SecondWinCount: number;
  ThirdWinCount: number;
  FirstPlayCount: number;
  SecondPlayCount: number;
  ThirdPlayCount: number;
}
