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
import { Text } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Octicons from "@expo/vector-icons/Octicons";
import AntDesign from "@expo/vector-icons/AntDesign";

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
          tabBarLabelPosition: "below-icon",
        }}
      >
        <Tab.Screen
          name="Main"
          component={Main}
          options={{
            tabBarLabel: () => (
              <Text style={{ fontSize: 12, marginTop: 2, color: "white" }}>
                홈
              </Text>
            ),
            tabBarIcon: () => (
              <FontAwesome5 name="home" size={24} color="white" />
            ),
          }}
        />
        <Tab.Screen
          name="Character"
          component={Character}
          options={{
            tabBarLabel: () => (
              <Text style={{ fontSize: 12, marginTop: 2, color: "white" }}>
                캐릭터
              </Text>
            ),
            tabBarIcon: () => (
              <Octicons name="person" size={24} color="white" />
            ),
          }}
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
          options={{
            tabBarLabel: () => (
              <Text style={{ fontSize: 12, marginTop: 2, color: "white" }}>
                숙제
              </Text>
            ),
            tabBarIcon: () => (
              <AntDesign name="schedule" size={24} color="white" />
            ),
          }}
        />
        <Tab.Screen
          name="WeeklyReport"
          component={WeeklyReport}
          options={{
            tabBarLabel: () => (
              <Text style={{ fontSize: 12, marginTop: 2, color: "white" }}>
                주간 레이드
              </Text>
            ),
            tabBarIcon: () => (
              <FontAwesome5 name="receipt" size={24} color="white" />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default BottomTab;
