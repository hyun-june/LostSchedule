import { ScrollView, StyleSheet, View } from "react-native";
import HomeworkDropdown from "../components/HomeworkComp/HomeworkDropdown";
import HomeworkRaidBox from "../components/HomeworkComp/HomeworkRaidBox";
import useSearchStore from "../store/useSearchStore";
import { useGetRoster } from "../hooks/useGetCharacter";
import useRosterStore from "../store/useRosterStore";
import { useEffect, useState } from "react";

const Homework = () => {
  const { myChar } = useSearchStore();
  const { roster, fetchRoster } = useRosterStore();
  const [value, setValue] = useState<string[]>([]);
  // console.log("🚀 ~ Homework ~ value:", value);

  // const { data, isLoading } = useGetRoster(myChar);
  const { data, isLoading } = useGetRoster("피엇음");
  useEffect(() => {
    fetchRoster();
  }, []);
  return (
    <View>
      <HomeworkDropdown data={data} setValue={setValue} />

      <ScrollView style={{ padding: 10, marginVertical: 20 }}>
        <HomeworkRaidBox data={value} />
      </ScrollView>
    </View>
  );
};

export default Homework;

const styles = StyleSheet.create({});
