import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface RosterState {
  roster: string[];
  setRoster: (values: string[]) => Promise<void>;
  fetchRoster: () => Promise<void>;
}

const STORAGE_KEY = "roster";

const useRosterStore = create<RosterState>((set) => {
  return {
    roster: [],
    setRoster: async (values) => {
      set({ roster: values });

      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(values));
      } catch (error) {
        console.error("roster 저장 실패", error);
      }
    },
    fetchRoster: async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);

        if (stored) {
          set({ roster: JSON.parse(stored) });
        }
      } catch (error) {
        console.error("roster 불러오기 실패", error);
      }
    },
  };
});

export default useRosterStore;
