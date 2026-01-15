import { StyleSheet, Text, View } from "react-native";
import useHomeworkStore from "../store/useHomeworkStore";

const WeeklyReport = () => {
  const { checked, charGold, totalGold } = useHomeworkStore();

  const weeklyData = Object.entries(checked);
  console.log("🚀 ~ WeeklyReport ~ checked:", checked);
  // checked 활용해서 raidData에서 타이틀과 난이도 비교 true false를 통해 골드 및 더보기 가져와서 계산 UI 표기
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[{ fontSize: 30, fontWeight: "bold" }, styles.textWhite]}>
          주간 레이드
        </Text>
        <Text style={[{ fontSize: 16, fontWeight: "bold" }, styles.textWhite]}>
          2026.01.14 수
        </Text>
      </View>
      <View style={styles.inner}>
        {weeklyData?.map((item) => {
          const charNickName = item[0];
          const charRaidInfo = Object.entries(item[1] ?? {});

          return (
            <View key={charNickName}>
              <Text style={styles.innerPointText}>{charNickName}</Text>
              <View style={{ paddingLeft: 30, gap: 5 }}>
                {charRaidInfo?.map(([raid, value]) => {
                  return (
                    <View style={styles.innerItem} key={raid}>
                      <Text style={styles.innerText}>{raid}</Text>
                      <Text style={styles.innerText}>{String(value)}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          );
        })}

        <Text style={styles.innerPointText}>닉네임</Text>
        <View style={{ paddingLeft: 30, gap: 5 }}>
          <View style={styles.innerItem}>
            <Text style={styles.innerText}>레이드</Text>
            <Text style={styles.innerText}>20000G</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.innerItem}>
          <Text style={styles.innerPointText}>더보기</Text>
          <Text style={styles.innerPointText}>-20000G</Text>
        </View>
        <View style={styles.innerItem}>
          <Text style={styles.innerPointText}>TOTAL</Text>
          <Text style={styles.innerPointText}>
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
    paddingVertical: 20,
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
    padding: 30,
    gap: 10,
    flex: 1,
  },
  innerPointText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  innerText: {
    color: "white",
    fontSize: 16,
  },
  innerItem: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottom: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "white",
  },
  textWhite: {
    color: "white",
  },
});
