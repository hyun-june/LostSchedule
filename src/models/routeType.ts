import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Main: undefined;
  Character: { searchId: string };
  WeeklyReport: undefined;
};

export type HeaderRouteProp = RouteProp<
  RootStackParamList,
  keyof RootStackParamList
>;

export type CharRouteProp = RouteProp<RootStackParamList, "Character">;

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
