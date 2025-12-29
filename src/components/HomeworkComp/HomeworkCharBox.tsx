import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import GoldIcon from "../GoldIcon";
import { raidData, RaidType } from "./../../utils/raidData";

const HomeworkCharBox = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [moreActive, setMoreActive] = useState<Record<string, boolean>>({});
  const raidDatas = raidData;
  const level = 1720;

  const filterRaid = raidDatas
    .filter((raid) => raid.level < level)
    .sort((a, b) => b.level - a.level)
    .slice(0, 3);

  const handleMore = (raid: RaidType) => {
    // console.log("🚀 ~ handleMore ~ raid:", raid);
    setMoreActive((prev) => ({
      ...prev,
      [raid.id]: !prev[raid.id],
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
      <View style={styles.raid}>
        {filterRaid?.map((raid) => (
          <TouchableOpacity
            key={raid.id}
            style={styles.raidInner}
            onPress={() => toggleCheck(raid.id)}
          >
            <View style={{ marginRight: 5 }}>
              <Checkbox
                value={!!checked[raid.id]}
                onValueChange={(value) =>
                  setChecked((prev) => ({ ...prev, [raid.id]: value }))
                }
                color={"gray"}
              />
            </View>
            <View style={{ flex: 5 }}>
              <Text style={styles.text}>{raid.title}</Text>
            </View>

            <View style={[styles.goldIcon, { flex: 2 }]}>
              <Text style={styles.text}>{raid?.gold.toLocaleString()}</Text>
              <GoldIcon />
            </View>
            <TouchableOpacity style={styles.moreBtn}>
              <Text
                style={[styles.text, moreActive[raid.id] && styles.textActive]}
                onPress={(e) => {
                  e.stopPropagation();
                  handleMore(raid);
                }}
              >
                더보기
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
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
    padding: 10,
    marginVertical: 5,
    gap: 5,
  },
  raidInner: {
    borderWidth: 1,
    borderColor: "white",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "white",
  },
  goldIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  moreBtn: {
    borderColor: "white",
    borderWidth: 1,
    padding: 2,
  },
  textActive: {
    color: "gray",
  },
});
