import { create } from "zustand";
import { getWeeklyResetBase } from "../utils/getWednesday";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface CheckedData {
  difficulty: string;
  gold: boolean;
  more: boolean;
}

type CheckedState = Record<string, Record<string, CheckedData>>;

interface MyHomeWorkStore {
  checked: CheckedState;
  charGold: Record<string, number>;
  totalGold: number;
  lastResetAt: number | null;
  hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;
  setChecked: (charId: string, title: string, data: CheckedData | null) => void;
  setCharGold: (charId: string, value: number) => void;
  checkWeeklyReset: () => void;
}

// const storage =
//   Platform.OS === "web"
//     ? createJSONStorage(() => localStorage)
//     : createJSONStorage(() => AsyncStorage);

const useHomeworkStore = create<MyHomeWorkStore>()(
  persist(
    (set, get) => {
      return {
        checked: {},
        charGold: {},
        totalGold: 0,
        lastResetAt: null,
        hasHydrated: false,
        setHasHydrated: (v) => set({ hasHydrated: v }),
        setChecked: (charId, title, data) =>
          set((state) => {
            const next = { ...state.checked };
            if (!next[charId]) next[charId] = {};

            if (!data) {
              delete next[charId][title];
              return { checked: next };
            }

            next[charId][title] = data;
            return { checked: next };
          }),
        setCharGold: (charId, value) =>
          set((state) => {
            const nextcharGold = {
              ...state.charGold,
              [charId]: value,
            };
            const totalGold = Object.values(nextcharGold).reduce(
              (sum, v) => sum + v,
              0,
            );
            return {
              charGold: nextcharGold,
              totalGold,
            };
          }),
        checkWeeklyReset: () => {
          const currentBase = getWeeklyResetBase();
          const lastBase = get().lastResetAt;
          if (lastBase !== currentBase) {
            set({
              checked: {},
              charGold: {},
              totalGold: 0,
              lastResetAt: currentBase,
            });
          }
        },
      };
    },
    {
      name: "homework-store",
      storage: {
        getItem: async (name) => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          await AsyncStorage.removeItem(name);
        },
      },
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

export default useHomeworkStore;
