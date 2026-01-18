import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface RosterState {
  roster: string[];
  setRoster: (values: string) => Promise<void>;
  fetchRoster: () => Promise<void>;
}

const STORAGE_KEY = "roster";

const useRosterStore = create<RosterState>((set) => {
  return {
    roster: [],
    setRoster: async (value: string) => {
      set((state) => {
        let next: string[];

        if (state.roster.includes(value)) {
          next = state.roster.filter((v) => v !== value);
        } else {
          next = [...state.roster, value];
        }

        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return { roster: next };
      });
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
