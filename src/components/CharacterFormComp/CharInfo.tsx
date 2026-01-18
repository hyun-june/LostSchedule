import { CharInfoProps } from "../../models/charType";
import { View, Text, StyleSheet } from "react-native";

const CharInfo = ({ label, data }: CharInfoProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginRight: 20,
        gap: 3,
      }}
    >
      <View
        style={{
          width: 1,
          height: "80%",
          backgroundColor: "white",
        }}
      />

      <Text style={style.charInfoLabel}>{label}</Text>
      <Text
        style={{
          color: "white",
          fontSize: 12,
        }}
      >
        {data}
      </Text>
    </View>
  );
};

export default CharInfo;

const style = StyleSheet.create({
  charInfoLabel: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 3,
    width: 35,
  },
});
