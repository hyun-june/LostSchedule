import { ScrollView } from "react-native";

const AppLayout = ({ children }: { children?: React.ReactNode }) => {
  return <ScrollView style={{ padding: 10, flex: 1 }}>{children}</ScrollView>;
};

export default AppLayout;
