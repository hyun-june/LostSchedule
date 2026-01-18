import { View, Image, StyleSheet } from "react-native";
import { theme } from "../../theme/theme";

const EquipmentBox = ({ ...props }) => {
  const { data: item } = props;

  return (
    <View style={styles.container}>
      <Image style={styles.equipmentBox} source={{ uri: item?.Icon }}></Image>
    </View>
  );
};

export default EquipmentBox;

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 40,
  },
  equipmentBox: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#757575",
    backgroundColor: "#c1b086",
  },

  blue: theme.box.blue,
  purple: theme.box.purple,
  gold: theme.box.gold,
});
