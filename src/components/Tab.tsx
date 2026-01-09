import { useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { theme } from "../theme/theme";
import CharEquipment from "./CharacterFormComp/CharEquipment";
import { CharAllData } from "./../models/charType";

interface TabDataType {
  data: CharAllData;
}

const Tab = ({ data }: TabDataType) => {
  const [currentTab, setCurrentTab] = useState<number>(0);

  const headerList = [
    { label: "장비", des: <CharEquipment data={data?.ArmoryEquipment} /> },
    { label: "아크패시브", des: "아크패시브탭" },
    { label: "스킬", des: "스킬탭" },
    { label: "아바타", des: "아바타탭" },
  ];

  return (
    <View>
      <View style={{ flexDirection: "row", gap: 5 }}>
        {headerList.map((item, index) => (
          <Pressable key={index} onPress={() => setCurrentTab(index)}>
            <Text
              style={[
                styles.tabHeader,
                currentTab === index ? styles.activeTab : styles.inactiveTab,
              ]}
            >
              {item.label}
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={{ paddingVertical: 20 }}>
        <Text style={styles.tabBody}>{headerList[currentTab].des}</Text>
      </View>
    </View>
  );
};

export default Tab;

const styles = StyleSheet.create({
  tabHeader: {
    marginTop: 20,
    fontSize: 12,
    borderWidth: 2,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: "white",
  },
  activeTab: {
    borderColor: theme.line.mint,
    color: "white",
  },
  inactiveTab: {
    color: theme.text.gray,
  },
  tabBody: {
    color: "white",
  },
});
