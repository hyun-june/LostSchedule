import { StyleSheet } from "react-native";
import { theme } from "./../theme/theme";
import AppLayout from "../components/Layout/AppLayout";
import useSearchStore from "../store/useSearchStore";
import { useEffect } from "react";

const Main = () => {
  // const myChar = useSearchStore((state) => state.myChar);
  const fetchChar = useSearchStore((state) => state.fetchChar);
  useEffect(() => {
    fetchChar();
  }, []);

  return (
    <AppLayout>
      {/* <Text style={{ color: "white" }}>Main</Text>
      <Text style={{ color: "white" }}>{myChar}</Text> */}
    </AppLayout>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background.black,
  },
});
