import { View, Text, StyleSheet } from "react-native";
import { theme } from "../../theme/theme";
import HomeworkCharBox from "./HomeworkCharBox";
import { CharData } from "../../models/charType";

interface HomeworkRaidBoxProps {
  data: CharData[];
}

const HomeworkRaidBox = ({ data }) => {
  // console.log("🚀 ~ HomeworkRaidBox ~ data:", data);
  // const charNames = data.map((char) => char.replaceAll("@", ""));
  // console.log("🚀 ~ HomeworkRaidBox ~ charNames:", charNames);

  return (
    <View style={styles.HomeContainer}>
      <View style={styles.total}>
        <Text style={styles.Text}>TOTAL</Text>
        <Text style={styles.Text}>420,000</Text>
      </View>

      <HomeworkCharBox />
    </View>
  );
};

export default HomeworkRaidBox;

const styles = StyleSheet.create({
  HomeContainer: {},
  total: {
    borderBottomWidth: 2,
    borderColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingVertical: 5,
    paddingRight: 5,
  },
  Char: {
    borderColor: theme.line.mint,
    borderWidth: 1,
    borderRadius: 10,
    width: 120,
    height: 70,
    padding: 10,
  },

  Text: {
    color: "white",
  },
});
