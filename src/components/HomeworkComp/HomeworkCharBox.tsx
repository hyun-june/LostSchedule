import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import GoldIcon from "../GoldIcon";
import { raidData } from "./../../utils/raidData";

const HomeworkCharBox = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [moreActive, setMoreActive] = useState<Record<string, boolean>>({});
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    Record<string, string>
  >(
    Object.fromEntries(
      raidData.map((raid) => [raid.raidKey, raid.stages[0].difficulty])
    )
  );
  const raidDatas = raidData;
  // console.log("🚀 ~ HomeworkCharBox ~ raidDatas:", raidDatas);
  // const level = 1720;

  const DIFFICULTY_LABEL = {
    normal: "노말",
    hard: "하드",
    nightmare: "나메",
  };

  // const filterRaid = raidDatas
  //   .filter((raid) => raid.level < level)
  //   .sort((a, b) => b.level - a.level);

  const handleMore = (raid) => {
    setMoreActive((prev) => ({
      ...prev,
      [raid.raidKey]: !prev[raid.raidKey],
    }));
  };

  const toggleCheck = (id: string) => {
    setChecked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.charHead}>
        <Image
          style={styles.char}
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrBaC4yps_AgnQ3QfZqHFP5cinHlhKxCBhSg&s",
          }}
        ></Image>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flex: 1,
            paddingRight: 5,
          }}
        >
          <View>
            <Text style={styles.text}>LV.1720 발키리</Text>
            <Text style={styles.text}>열두글자열두글자열두글자</Text>
          </View>
          <View>
            <Text style={styles.text}>120,000</Text>
          </View>
        </View>
      </View>
      <ScrollView style={styles.raid}>
        {raidData.map((raid) => {
          const stage = raid.stages.find(
            (s) => s.difficulty === selectedDifficulty[raid.raidKey]
          );
          const checkKey = `${raid.raidKey}-${stage?.difficulty}`;

          const goldValue = moreActive[raid.raidKey]
            ? (stage?.gold ?? 0) - (stage?.more ?? 0)
            : stage?.gold ?? 0;

          return (
            <Pressable
              key={raid.raidKey}
              style={styles.raidInner}
              onPress={() => toggleCheck(checkKey)}
            >
              {/* 체크박스 */}
              <View style={{ marginRight: 3 }}>
                <Checkbox
                  value={!!checked[checkKey]}
                  onValueChange={(value) =>
                    setChecked((prev) => ({
                      ...prev,
                      [checkKey]: value,
                    }))
                  }
                  color={"gray"}
                />
              </View>
              {/* 제목 */}
              <View style={{ flex: 5, flexDirection: "row", gap: 5 }}>
                <Text style={styles.raidInnerText}>
                  {raid.title}({DIFFICULTY_LABEL[stage?.difficulty]})
                </Text>
                <Text style={styles.raidInnerText}>
                  {/* 1~{raid.phases}관문 */}
                  {/* • {selectedStage?.level} 레벨 이상 */}
                </Text>
              </View>
              {/* 골드 */}
              <View style={styles.goldIcon}>
                <Text style={styles.raidInnerText}>
                  {goldValue?.toLocaleString()}
                </Text>
                <GoldIcon />
              </View>
              {/* 난이도 선택 */}
              <View style={{ flexDirection: "row" }}>
                {raid.stages.map((stage) => (
                  <Pressable
                    key={stage.difficulty}
                    style={[
                      styles.diffButton,
                      selectedDifficulty[raid.raidKey] === stage.difficulty &&
                        styles.diffActive,
                    ]}
                    onPress={() =>
                      setSelectedDifficulty((prev) => ({
                        ...prev,
                        [raid.raidKey]: stage.difficulty,
                      }))
                    }
                  >
                    <Text style={styles.raidInnerText}>
                      {DIFFICULTY_LABEL[stage.difficulty]}
                    </Text>
                  </Pressable>
                ))}
              </View>
              {/* 더보기 */}
              <Pressable style={styles.moreBtn}>
                <Text
                  style={[
                    styles.raidInnerText,
                    moreActive[raid.raidKey] && styles.textActive,
                  ]}
                  onPress={() => {
                    handleMore(raid);
                  }}
                >
                  더보기
                </Text>
              </Pressable>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default HomeworkCharBox;

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  charHead: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  char: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 25,
  },
  raid: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    flex: 1,
    padding: 5,
    marginVertical: 5,
    gap: 5,
    height: 200,
  },
  raidInner: {
    borderWidth: 1,
    borderColor: "white",
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "white",
  },
  raidInnerText: {
    fontSize: 12,
    color: "white",
  },
  goldIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  moreBtn: {
    borderColor: "white",
    borderWidth: 1,
    padding: 2,
  },
  textActive: {
    color: "gray",
  },
  diffButton: {
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#444",
    marginRight: 5,
    backgroundColor: "#1c1c1e",
  },

  diffActive: {
    backgroundColor: "#ffc300",
    borderColor: "#ffc300",
  },
});
