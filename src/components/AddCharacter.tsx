import {
  View,
  TextInput,
  Text,
  Pressable,
  Alert,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "../theme/theme";
import useSearchStore from "../store/useSearchStore";

interface AddCharacterProps {
  onClose: () => void;
}

const AddCharacter = ({ onClose }: AddCharacterProps) => {
  const [inputValue, setInputValue] = useState("");
  const { myChar, updateChar } = useSearchStore();

  const handleSubmit = async () => {
    if (inputValue === "") return;
    try {
      await AsyncStorage.setItem("myChar", inputValue.trim());
      updateChar(inputValue);
      onClose();
    } catch (error) {
      console.log("AsyncStorage save error:", error);
    }
  };

  const deleteId = async () => {
    if (!myChar) {
      Alert.alert("등록된 아이디가 없습니다", "", [{ text: "확인" }]);
      return;
    }
    try {
      await AsyncStorage.removeItem("myChar");
      onClose();
    } catch (error) {
      console.log("AsyncStorage remove error:", error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="등록할 아이디를 입력해주세요."
        style={styles.AddInput}
        value={inputValue}
        onChangeText={setInputValue}
        returnKeyType="done"
        onSubmitEditing={() => handleSubmit()}
      />
      <Pressable
        style={{
          borderWidth: 1,
          alignItems: "flex-end",
        }}
        onPress={deleteId}
      >
        <Text style={styles.AddText}>등록된 아이디 삭제</Text>
      </Pressable>
    </View>
  );
};

export default AddCharacter;

const styles = StyleSheet.create({
  AddInput: {
    color: theme.text.black,
    backgroundColor: "white",
    height: 50,
    width: 300,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    fontSize: 20,
    lineHeight: 25,
  },

  AddText: {
    color: "white",
    backgroundColor: theme.text.red,
    marginVertical: 10,
    padding: 6,
    borderRadius: 10,
  },
});
