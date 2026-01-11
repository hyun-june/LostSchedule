import { View, Text, StyleSheet } from "react-native";
import { theme } from "../../theme/theme";
import HomeworkCharBox from "./HomeworkCharBox";
import { CharData } from "../../models/charType";
import useRosterStore from "../../store/useRosterStore";
import { useGetCharacterProfile } from "../../hooks/useGetCharacter";

interface HomeworkRaidBoxProps {
  data: CharData[];
}

const HomeworkRaidBox = () => {
  const { roster } = useRosterStore();
  const { data, isInitialLoading, isFetching, isError } =
    useGetCharacterProfile(roster);

  const sortData = data.sort(
    (a, b) =>
      parseFloat(b.ItemAvgLevel.replace(/,/g, "")) -
      parseFloat(a.ItemAvgLevel.replace(/,/g, ""))
  );

  if (isInitialLoading) {
    return (
      <View>
        <Text>불러오는 중...</Text>
      </View>
    );
  }
  if (isError) {
    return (
      <View>
        <Text style={styles.Text}>데이터를 불러오지 못했어요 😥</Text>
      </View>
    );
  }
  return (
    <View>
      <View style={styles.total}>
        <Text style={styles.text}>TOTAL</Text>
        <Text style={styles.text}>420,000</Text>
      </View>
      {isFetching && <Text>업데이트 중...</Text>}
      {sortData?.map((char) => (
        <HomeworkCharBox key={char?.CharacterName} char={char} />
      ))}
    </View>
  );
};

export default HomeworkRaidBox;

const styles = StyleSheet.create({
  total: {
    borderBottomWidth: 2,
    borderColor: theme.line.mint,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingVertical: 5,
    paddingRight: 5,
  },

  text: {
    color: "white",
  },
});
