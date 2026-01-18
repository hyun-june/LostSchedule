import { create } from "zustand";
import { getWednesdayRange } from "../utils/getWednesday";
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
  setChecked: (charId: string, title: string, data: CheckedData | null) => void;
  setCharGold: (charId: string, value: number) => void;
  checkWeeklyReset: () => void;
}

const useHomeworkStore = create<MyHomeWorkStore>()(
  persist(
    (set, get) => {
      return {
        checked: {},
        charGold: {},
        totalGold: 0,
        lastResetAt: null,
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
              0
            );
            return {
              charGold: nextcharGold,
              totalGold,
            };
          }),
        checkWeeklyReset: () => {
          const { lastWednesday } = getWednesdayRange();
          const currentBase = lastWednesday.getTime();
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
    }
  )
);

export default useHomeworkStore;
