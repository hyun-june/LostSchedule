import { ScrollView, StyleSheet, View } from "react-native";
import HomeworkDropdown from "../components/HomeworkComp/HomeworkDropdown";
import HomeworkRaidBox from "../components/HomeworkComp/HomeworkRaidBox";
import useSearchStore from "../store/useSearchStore";
import { useGetRoster } from "../hooks/useGetCharacter";
import useRosterStore from "../store/useRosterStore";
import { useEffect, useState } from "react";
import { toNumberForItemLevel } from "../utils/formatJsonData";

interface Character {
  ServerName: string;
  CharacterName: string;
  CharacterLevel: number;
  CharacterClassName: string;
  ItemAvgLevel: string;
}

const Homework = () => {
  const { myChar } = useSearchStore();
  const { roster, fetchRoster } = useRosterStore();

  // const { data, isLoading } = useGetRoster(myChar);
  const { data, isLoading } = useGetRoster("피엇음");
  useEffect(() => {
    fetchRoster();
  }, []);

  const [sortData, setSortData] = useState<Character[]>([]);

  const sortByItemLevel = (data: Character[]) => {
    return [...data].sort(
      (a, b) =>
        toNumberForItemLevel(b.ItemAvgLevel) -
        toNumberForItemLevel(a.ItemAvgLevel)
    );
  };

  useEffect(() => {
    if (!data?.length) return;

    const sorted = sortByItemLevel(data);
    setSortData(sorted);
  }, data);

  return (
    <View>
      <HomeworkDropdown sortData={sortData} />

      <ScrollView style={{ paddingHorizontal: 10 }}>
        <HomeworkRaidBox data={data} />
      </ScrollView>
    </View>
  );
};

export default Homework;

const styles = StyleSheet.create({});
