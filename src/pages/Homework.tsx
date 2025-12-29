import { ScrollView, StyleSheet, View } from "react-native";
import HomeworkDropdown from "../components/HomeworkComp/HomeworkDropdown";
import HomeworkRaidBox from "../components/HomeworkComp/HomeworkRaidBox";
import useSearchStore from "../store/useSearchStore";
import { useGetRoster } from "../hooks/useGetCharacter";
import useRosterStore from "../store/useRosterStore";
import { useEffect } from "react";

const Homework = () => {
  const { myChar } = useSearchStore();
  const { roster, fetchRoster } = useRosterStore();
  console.log("🚀 ~ Homework ~ roster:", roster);

  // const { data, isLoading } = useGetRoster(myChar);
  const { data, isLoading } = useGetRoster("피엇음");
  useEffect(() => {
    fetchRoster();
  }, []);
  return (
    <View>
      <HomeworkDropdown data={data} />

      <ScrollView style={{ padding: 10, marginVertical: 20 }}>
        <HomeworkRaidBox />
      </ScrollView>
    </View>
  );
};

export default Homework;

const styles = StyleSheet.create({});
