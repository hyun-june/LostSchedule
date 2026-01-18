import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Main from "../pages/Main";
import Character from "../pages/Character";
import Header from "./Header";
import useSearchStore from "../store/useSearchStore";
import { useNavigation } from "@react-navigation/native";
import Homework from "./../pages/Homework";
import WeeklyReport from "../pages/WeeklyReport";
import useHomeworkStore from "../store/useHomeworkStore";
import { useEffect } from "react";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const { myChar } = useSearchStore();
  const navigation = useNavigation();

  const { checkWeeklyReset } = useHomeworkStore();

  useEffect(() => {
    checkWeeklyReset();
  }, []);

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          header: ({ route }) => <Header />,
        }}
      >
        <Tab.Screen
          name="Main"
          component={Main}
          options={{ tabBarLabel: "홈" }}
        />
        <Tab.Screen
          name="Character"
          component={Character}
          options={{ tabBarLabel: "캐릭터" }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              if (!myChar) {
                e.preventDefault();
                navigation.navigate("Main");
              }
            },
          })}
        />
        <Tab.Screen
          name="MyChar"
          component={Homework}
          options={{ tabBarLabel: "숙제" }}
        />
        <Tab.Screen
          name="WeeklyReport"
          component={WeeklyReport}
          options={{ tabBarLabel: "주간 레이드" }}
        />
      </Tab.Navigator>
    </>
  );
};

export default BottomTab;
