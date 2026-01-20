import { View, Text, StyleSheet } from "react-native";
import { theme } from "../../theme/theme";
import HomeworkCharBox from "./HomeworkCharBox";
import { CharData } from "../../models/charType";
import useRosterStore from "../../store/useRosterStore";
import { useGetCharacterProfile } from "../../hooks/useGetCharacter";
import useHomeworkStore from "../../store/useHomeworkStore";

interface HomeworkRaidBoxProps {
  data: CharData[];
}

const HomeworkRaidBox = () => {
  const { roster } = useRosterStore();
  const { data, isInitialLoading, isFetching, isError } =
    useGetCharacterProfile(roster);

  const { totalGold } = useHomeworkStore();

  const sortData = [...(data ?? [])].sort(
    (a, b) =>
      parseFloat(b?.ItemAvgLevel?.replace(/,/g, "")) -
      parseFloat(a?.ItemAvgLevel?.replace(/,/g, "")),
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
        <Text style={styles.text}>데이터를 불러오지 못했어요 😥</Text>
      </View>
    );
  }
  return (
    <View style={{ paddingBottom: 100 }}>
      <View style={styles.total}>
        <Text style={styles.text}>TOTAL</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.text}>{totalGold?.toLocaleString()}G</Text>
        </View>
      </View>
      {isFetching && <Text>업데이트 중...</Text>}
      {sortData?.map((char, idx) => (
        <HomeworkCharBox
          key={char?.CharacterName ?? `temp-${idx}`}
          char={char}
        />
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
    color: "gold",
    fontSize: 18,
    fontWeight: "bold",
  },
});
