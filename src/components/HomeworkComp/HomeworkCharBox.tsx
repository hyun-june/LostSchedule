import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import Checkbox from "expo-checkbox";
import { useEffect, useState } from "react";
import GoldIcon from "../GoldIcon";
import { raidData } from "./../../utils/raidData";
import useHomeworkStore from "../../store/useHomeworkStore";

const HomeworkCharBox = ({ ...props }) => {
  const { char } = props;
  if (!char) return null;
  const { CharacterImage, CharacterClassName, CharacterName, ItemAvgLevel } =
    char;
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [moreActive, setMoreActive] = useState<Record<string, boolean>>({});
  const [goldSelect, setGoldSelect] = useState<Record<string, boolean>>({});
  const { setCharGold } = useHomeworkStore();

  const raidDifficulty = Object.fromEntries(
    raidData.map((raid) => [raid.raidKey, raid.stages[0].difficulty])
  );

  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Record<string, string>>(raidDifficulty);

  const totalGoldForChar = raidData.reduce((sum, raid) => {
    const stage = raid.stages.find(
      (s) => s.difficulty === selectedDifficulty[raid.raidKey]
    );

    if (!stage) return sum;

    // const checkKey = `${raid.raidKey}-${stage.difficulty}`;

    // 이 캐릭터에서 체크 안했으면 스킵
    // if (!checked[checkKey]) return sum;

    // 선택된 실제 골드 값
    const goldValue = moreActive[raid.raidKey]
      ? (stage.gold ?? 0) - (stage.more ?? 0)
      : stage.gold ?? 0;

    // 골드 받기 선택 안하면 0 처리
    if (!goldSelect[raid.raidKey]) return sum;

    return sum + goldValue;
  }, 0);

  useEffect(() => {
    setCharGold(CharacterName, totalGoldForChar);
  }, [totalGoldForChar]);

  const DIFFICULTY_LABEL = {
    normal: "노말",
    hard: "하드",
    nightmare: "나메",
  };

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

  const selectGold = (raid) => {
    setGoldSelect((prev) => {
      const isSelected = prev[raid.raidKey];
      const selectedCount = Object.values(prev).filter((v) => v).length;

      if (isSelected) {
        return { ...prev, [raid.raidKey]: false };
      }

      if (selectedCount >= 3) {
        alert("골드는 최대 3개 레이드까지만 받을 수 있어요!");
        return prev;
      }

      return { ...prev, [raid.raidKey]: true };
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.charHead}>
        <View style={styles.charImageBox}>
          <Image
            style={styles.charImage}
            source={{
              uri: CharacterImage,
            }}
          />
        </View>

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
            <Text style={styles.text}>
              {`Lv. ${ItemAvgLevel}`} {CharacterClassName}
            </Text>
            <Text style={styles.text}>{CharacterName}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
            <Text style={styles.text}>{totalGoldForChar.toLocaleString()}</Text>
            <GoldIcon />
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
              <View
                style={{
                  flex: 1,
                  gap: 3,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  {/* 제목 */}
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.raidHeadText}>
                      {raid.title}({DIFFICULTY_LABEL[stage?.difficulty]})
                    </Text>
                  </View>
                  {/* 골드 */}
                  <Pressable
                    style={styles.goldIcon}
                    onPress={() => selectGold(raid)}
                  >
                    <Text
                      style={[
                        { color: "gray" },
                        goldSelect[raid.raidKey] && styles.textActive,
                      ]}
                    >
                      {`${goldValue?.toLocaleString()}G`}
                    </Text>
                  </Pressable>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  {/* 난이도 선택 */}
                  <View style={{ flexDirection: "row" }}>
                    {raid.stages.map((stage) => (
                      <Pressable
                        key={stage.difficulty}
                        style={[
                          styles.diffButton,
                          selectedDifficulty[raid.raidKey] ===
                            stage.difficulty && styles.diffActive,
                        ]}
                        onPress={() =>
                          setSelectedDifficulty((prev) => ({
                            ...prev,
                            [raid.raidKey]: stage.difficulty,
                          }))
                        }
                      >
                        <Text style={[styles.raidInnerText]}>
                          {DIFFICULTY_LABEL[stage.difficulty]}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                  {/* 더보기 */}
                  <Pressable style={styles.moreBtn}>
                    <Text
                      style={[
                        { color: "gray" },
                        moreActive[raid.raidKey] && styles.textActive,
                      ]}
                      onPress={() => {
                        handleMore(raid);
                      }}
                    >
                      더보기
                    </Text>
                  </Pressable>
                </View>
              </View>
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
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    padding: 5,
    marginBottom: 20,
  },
  charHead: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  charImageBox: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: "white",
    overflow: "hidden",
  },
  charImage: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
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
  raidHeadText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 14,
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
    flexDirection: "row",
    alignItems: "center",
  },
  textActive: {
    color: "white",
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
    borderColor: "#ffc300",
    borderWidth: 1,
  },
});
