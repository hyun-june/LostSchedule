import { View, Text, StyleSheet } from "react-native";
import EquipmentBox from "./EquipmentBox";
import { theme } from "../../theme/theme";
import {
  cleanText,
  getFirstNumber,
  jsonFormatter,
} from "../../utils/formatJsonData";
import { useEffect, useState } from "react";

const EquipmentItem = ({ ...props }) => {
  const [advancedLevel, setAdvancedLevel] = useState("");
  const { data } = props;

  const formatData = jsonFormatter(data?.Tooltip);

  // 품질
  const qualityValue = formatData?.Element_001?.value?.qualityValue;

  // 상급재련
  useEffect(() => {
    if (formatData?.Element_005?.type === "SingleTextBox") {
      const advancedLevelText = getFirstNumber(
        cleanText(formatData?.Element_005?.value)
      );

      setAdvancedLevel(advancedLevelText || "");
    }
  }, [data]);

  const selectColor =
    qualityValue === 100 ? "gold" : qualityValue >= 90 ? "purple" : "blue";

  return (
    <View style={{ flexDirection: "row", gap: 5 }}>
      <EquipmentBox {...props} data={data} />
      <View style={{ justifyContent: "center" }}>
        <View style={{ gap: 3 }}>
          <Text
            style={{
              ...styles.textBox,
              fontSize: 10,
              color: "#FFE940",
            }}
          >
            {data?.Name} {advancedLevel ? `x${advancedLevel}` : ""}
          </Text>
          {qualityValue >= 0 && (
            <View style={[styles.quality, styles[selectColor]]}>
              <Text
                style={{
                  color: "white",
                  fontSize: 10,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                {qualityValue}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default EquipmentItem;

const styles = StyleSheet.create({
  textBox: {
    color: "white",
    fontSize: 8,
  },
  quality: {
    width: 25,
  },
  blue: theme.box.blue,
  purple: theme.box.purple,
  gold: theme.box.gold,
});
