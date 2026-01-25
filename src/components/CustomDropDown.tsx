import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { useState } from "react";
import useRosterStore from "../store/useRosterStore";
import { theme } from "../theme/theme";

const CustomDropDown = ({ list }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { roster, setRoster } = useRosterStore();

  const placeholder = "캐릭터를 선택해주세요";

  const lastLabel =
    roster.length === 0
      ? placeholder
      : list?.find((item) => item.value === roster[roster.length - 1])?.label;

  const openDropDown = () => {
    setOpen((prev) => !prev);
  };
  const handleRoster = (value) => {
    setRoster(value);
  };
  return (
    <View style={styles.dropdownContainer}>
      <Pressable
        style={[styles.dropdownSelect, open && styles.dropdownSelectOpen]}
        onPress={openDropDown}
      >
        <Text style={{ color: "white" }}>{lastLabel}</Text>
        <Entypo name="chevron-down" size={24} color="white" />
      </Pressable>
      <ScrollView style={[open && styles.scrollList]}>
        {open &&
          list.map(({ label, value }) => {
            const isSelected = roster.includes(value);

            return (
              <Pressable
                key={value}
                onPress={() => handleRoster(value)}
                style={styles.dropdownListItem}
              >
                <Text
                  style={[styles.textWhite, isSelected && styles.selectText]}
                >
                  {label}
                </Text>
              </Pressable>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default CustomDropDown;

const styles = StyleSheet.create({
  textWhite: {
    color: "white",
  },
  selectText: {
    color: theme.line.mint,
    fontWeight: "bold",
  },
  scrollList: {
    position: "absolute",
    top: "100%",
    width: "100%",
    height: 150,
    backgroundColor: "#121212",
    borderWidth: 1,
    borderColor: "white",
    zIndex: 9999,
    elevation: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopWidth: 0,
  },
  dropdownContainer: {
    marginHorizontal: 10,
    position: "relative",
  },

  dropdownSelect: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
  },
  dropdownSelectOpen: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  dropdownListItem: {
    paddingVertical: 10,
    backgroundColor: "black",
    borderBottomWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 10,
  },
});
