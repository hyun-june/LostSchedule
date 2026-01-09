import { Pressable, StyleSheet, Text, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

const CustomDropDown = () => {
  const openDropDown = () => {
    console.log("drop");
  };
  return (
    <View style={styles.dropdownContainer}>
      <Pressable style={styles.dropdownSelect} onPress={openDropDown}>
        <Text style={{ color: "white" }}>CustomDropDown</Text>
        <Entypo name="chevron-down" size={24} color="white" />
      </Pressable>
    </View>
  );
};

export default CustomDropDown;

const styles = StyleSheet.create({
  dropdownContainer: {
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
  },
  dropdownSelect: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
