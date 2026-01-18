import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface MySearchStore {
  myChar: string;
  updateChar: (value: string) => void;
  fetchChar: () => Promise<void>;
}

const useSearchStore = create<MySearchStore>((set) => ({
  myChar: "",
  updateChar: (value) => set({ myChar: value }),
  fetchChar: async () => {
    const value = await AsyncStorage.getItem("myChar");
    if (value) set({ myChar: value });
  },
}));

export default useSearchStore;
