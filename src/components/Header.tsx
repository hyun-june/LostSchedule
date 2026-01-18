import { useNavigation, useRoute } from "@react-navigation/native";
import { Pressable, View, StyleSheet, Modal } from "react-native";
import { useState } from "react";
import SearchBar from "./SearchBar";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { HeaderRouteProp, NavigationProp } from "../models/routeType";
import AddCharacter from "./AddCharacter";
import useSearchStore from "../store/useSearchStore";

const Header = () => {
  const { myChar } = useSearchStore();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<HeaderRouteProp>();
  const [text, setText] = useState<string>("");
  const [searchId, setSearchId] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  const onSearch = () => {
    const keyword = text.trim() || myChar;
    if (!keyword) return;
    setSearchId(keyword);
    navigation.navigate("Character", { searchId: keyword });
  };

  const isMain = route.name === "Main";

  return (
    <View style={isMain ? styles.mainHeader : styles.subHeader}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <StatusBar style="light" />
        {route.name !== "Main" ? (
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-sharp" size={24} color="white" />
          </Pressable>
        ) : (
          <View />
        )}
        <Pressable onPress={() => setShowModal((prev) => !prev)}>
          <Ionicons name="settings" size={24} color="white" />
        </Pressable>
      </View>

      {route.name !== "WeeklyReport" ? (
        <SearchBar text={text} setText={setText} onSearch={onSearch} />
      ) : (
        <View />
      )}

      <Modal visible={showModal} transparent animationType="slide">
        <Pressable
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => setShowModal(false)}
        >
          <AddCharacter onClose={() => setShowModal(false)} />
        </Pressable>
      </Modal>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  mainHeader: {
    marginTop: 50,
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  subHeader: {
    marginTop: 50,
    paddingHorizontal: 16,
  },
});
