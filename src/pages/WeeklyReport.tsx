import { StyleSheet, Text, View } from "react-native";

const WeeklyReport = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[{ fontSize: 30, fontWeight: "bold" }, styles.textWhite]}>
          주간 레이드
        </Text>
        <Text style={[{ fontSize: 16, fontWeight: "bold" }, styles.textWhite]}>
          2026.01.14 수
        </Text>{" "}
      </View>
    </View>
  );
};

export default WeeklyReport;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "white",
    flex: 1,
    padding: 10,
    paddingVertical: 20,
    margin: 5,
  },
  header: {
    borderBottomWidth: 1,
    borderColor: "white",
    justifyContent: "center",
    gap: 5,
    alignItems: "center",
    paddingBottom: 15,
  },
  textWhite: {
    color: "white",
  },
});
