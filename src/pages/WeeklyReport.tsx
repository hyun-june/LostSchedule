import { ScrollView, StyleSheet, Text, View } from "react-native";
import useHomeworkStore from "../store/useHomeworkStore";
import { raidData } from "./../utils/raidData";
import { DIFFICULTY_LABEL } from "../utils/difficultyLabel";

const WeeklyReport = () => {
  const { checked, charGold, totalGold } = useHomeworkStore();

  const weeklyData = Object.entries(checked || {});

  const calcRaidReward = (raidName, raidInfo) => {
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

  const summaryData = weeklyData?.map(([charName, raids]) => {
    const charRaidInfo = Object.entries(raids ?? {});

    const total = charRaidInfo.reduce(
      (acc, [raidName, raidInfo]) => {
        const reward = calcRaidReward(raidName, raidInfo);
        acc.gold += reward.gold;
        acc.more += reward.more;
        return acc;
      },
      { gold: 0, more: 0 }
    );

    return {
      charName,
      charRaidInfo,
      charTotalGold: total.gold,
      charTotalMore: total.more,
    };
  });

  const totalMoreGold = summaryData?.reduce((acc, char) => {
    acc += char.charTotalMore;
    return acc;
  }, 0);

  // const today = new Date();
  // const dayOfWeek = today.getDay();
  // const wednesday = 3;

  // const lastWednesday = today.setDate(
  //   today.getDate() - ((dayOfWeek + 7 - wednesday) % 7 || 7)
  // );
  // console.log(
  //   "🚀 ~ WeeklyReport ~ lastWednesday:",
  //   lastWednesday.toLocaleString()
  // );

  // const formattedDate = `${today.getFullYear()}년 ${
  //   today.getMonth() + 1
  // }월 ${today.getDate()}일`;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[{ fontSize: 24, fontWeight: "bold" }, styles.textWhite]}>
          주간 레이드
        </Text>
        <Text style={[{ fontSize: 12, fontWeight: "bold" }, styles.textWhite]}>
          2026.01.14 수
        </Text>
      </View>
      <ScrollView style={styles.inner}>
        {summaryData?.map(
          ({ charName, charRaidInfo, charTotalGold, charTotalMore }) => (
            <View key={charName}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 8,
                }}
              >
                <Text style={styles.innerPointText}>{charName}</Text>
                <Text style={styles.innerPointText}>
                  {(charTotalGold - charTotalMore).toLocaleString()}G
                </Text>
              </View>
              <ScrollView style={{ paddingLeft: 10 }}>
                {charRaidInfo.map(([raidName, raidInfo]) => {
                  const reward = calcRaidReward(raidName, raidInfo);
                  return (
                    <View style={styles.innerItem} key={raidName}>
                      <Text style={{ color: "#CCCCCC" }}>
                        {raidName}({DIFFICULTY_LABEL[raidInfo.difficulty]})
                      </Text>
                      <Text style={{ textAlign: "right", color: "#CCCCCC" }}>
                        {(reward.gold - reward.more).toLocaleString()}G
                      </Text>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          )
        )}
      </ScrollView>
      <View style={styles.bottom}>
        <View style={styles.innerItem}>
          <Text
            style={[styles.innerPointText, { color: "#FF7F7F", fontSize: 18 }]}
          >
            더보기
          </Text>
          <Text
            style={[styles.innerPointText, { color: "#FF7F7F", fontSize: 18 }]}
          >
            -{totalMoreGold?.toLocaleString()}G
          </Text>
        </View>
        <View style={styles.innerItem}>
          <Text
            style={[styles.innerPointText, { color: "yellow", fontSize: 18 }]}
          >
            TOTAL
          </Text>
          <Text
            style={[styles.innerPointText, { color: "yellow", fontSize: 18 }]}
          >
            {totalGold?.toLocaleString()}G
          </Text>
        </View>
      </View>
    </View>
  );
};

export default WeeklyReport;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "white",
    flex: 1,
    padding: 10,
    margin: 5,
  },
  header: {
    borderBottomWidth: 1,
    borderColor: "white",
    justifyContent: "center",
    gap: 5,
    alignItems: "center",
    paddingBottom: 15,
  },
  inner: {
    padding: 10,
    flex: 1,
  },
  innerPointText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  innerText: {
    color: "white",
    fontSize: 14,
  },
  innerItem: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottom: {
    paddingHorizontal: 10,
    marginTop: 5,
    paddingTop: 5,
    borderTopWidth: 1,
    borderColor: "white",
  },
  textWhite: {
    color: "white",
  },
});
