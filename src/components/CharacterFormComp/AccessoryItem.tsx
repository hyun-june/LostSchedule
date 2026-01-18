import { StyleSheet, View, Text } from "react-native";
import EquipmentBox from "./EquipmentBox";
import { cleanText, jsonFormatter } from "../../utils/formatJsonData";
import { theme } from "../../theme/theme";
import { ColorKey } from "../../models/common";

const AccessoryItem = ({ ...props }) => {
  const { data, type } = props;

  const boxStyles = {
    FE9600: theme.box.gold,
    CE43FC: theme.box.purple,
    "00B5FF": theme.box.blue,
  } as const;

  const textStyles = {
    FE9600: theme.text.yellow,
    CE43FC: theme.text.purple,
    "00B5FF": theme.text.blue,
  } as const;

  const formatData = jsonFormatter(data?.Tooltip);

  const accessoryData = formatData?.Element_006?.value?.Element_001;

  const accessoryOptions = accessoryData
    ? [
        ...accessoryData?.matchAll(
          />([^<]+)<FONT COLOR='([^']+)'>([^<]+)<\/FONT>/gi
        ),
      ].map((match) => ({
        text: `${match[1].trim()} ${match[3].trim()}`,
        color: match[2].trim() as ColorKey,
      }))
    : [];

  let rockOptions: string[] = [];

  if (type === "rock") {
    let base = formatData?.Element_006?.value?.Element_000?.contentStr;
    if (base === undefined)
      base = formatData?.Element_007?.value?.Element_000?.contentStr;

    rockOptions = [
      cleanText(base?.Element_000?.contentStr ?? "").replace(/[\[\]]/g, ""),
      cleanText(base?.Element_001?.contentStr ?? "").replace(/[\[\]]/g, ""),
      cleanText(base?.Element_002?.contentStr ?? "").replace(/[\[\]]/g, ""),
    ];
  }

  // let braceletOptions: string[] = [];

  // if (type === "bracelet") {
  //   const base = formatData?.Element_005?.value?.Element_001;
  //   const clean = base.split(/<img[^>]*>/gi).filter(Boolean);

  //   braceletOptions = clean.map((text: string) =>
  //     text
  //       .replace(/<[^>]+>/g, "")
  //       .replace(/\s+/g, " ")
  //       .trim()
  //   );
  // }

  const qualityValue = formatData?.Element_001?.value?.qualityValue;

  return (
    <View style={{ flexDirection: "row", gap: 5 }}>
      <View>
        <EquipmentBox {...props} qualityValue={qualityValue} />
      </View>
      {qualityValue && (
        <View style={{ justifyContent: "space-around" }}>
          {accessoryOptions?.map((item, i) => {
            return (
              <View key={i} style={styles.diamondText}>
                <View style={[styles.diamond, boxStyles[item.color]]} />
                <Text style={{ color: textStyles[item.color], fontSize: 8 }}>
                  {item.text}
                </Text>
              </View>
            );
          })}
        </View>
      )}
      {type === "rock" ? (
        <View style={{ justifyContent: "space-around" }}>
          {rockOptions?.map((item, i) => (
            <Text
              style={{
                fontSize: 8,
                color: i === 2 ? theme.text.red : "white",
              }}
              key={i}
            >
              {item}
            </Text>
          ))}
        </View>
      ) : null}

      {/* {type === "bracelet" ? (
        <View>
          {braceletOptions.slice(0, 2)?.map((item, i) => (
            <Text style={{ color: "white" }} key={i}>
              {item}
            </Text>
          ))}
        </View>
      ) : null} */}
    </View>
  );
};

export default AccessoryItem;

const styles = StyleSheet.create({
  diamond: {
    width: 8,
    height: 8,
    transform: [{ rotate: "45deg" }],
    borderWidth: 2,
  },
  diamondText: {
    flexDirection: "row",
    gap: 5,
  },
});
