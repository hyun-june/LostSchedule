import { View, StyleSheet } from "react-native";
import EquipmentItem from "./EquipmentItem";
import AccessoryItem from "./AccessoryItem";
import { ArmoryEquipment } from "../../models/entities";

interface CharEquipmentType {
  data: ArmoryEquipment[];
}

const CharEquipment = ({ data }: CharEquipmentType) => {
  // console.log("🚀 ~ CharEquipment ~ data:", data);
  const equipmentOrder = [1, 5, 2, 3, 4, 0];
  const equipMentData = [...data]?.slice(0, 6);
  // console.log("🚀 ~ CharEquipment ~ equipMentData:", equipMentData);
  const renderEquipment = equipmentOrder?.map((i) => equipMentData[i]);
  // console.log("🚀 ~ CharEquipment ~ renderEquipment:", renderEquipment);

  const accessoryData = [...data]?.slice(6, 11);
  // console.log("🚀 ~ CharEquipment ~ accessoryData:", accessoryData);

  return (
    <View style={styles.container}>
      <View style={{ gap: 10 }}>
        {renderEquipment?.map((item, i) => {
          return <EquipmentItem data={item} key={i} />;
        })}
      </View>
      <View style={{ gap: 10 }}>
        {accessoryData?.map((item, i) => (
          <AccessoryItem data={item} key={i} />
        ))}
        <AccessoryItem data={data[11]} type="rock" />
        <AccessoryItem data={data[12]} type="bracelet" />
      </View>
    </View>
  );
};

export default CharEquipment;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
  },
});
