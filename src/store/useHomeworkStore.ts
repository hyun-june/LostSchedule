import { create } from "zustand";

interface MyRaidStore {
  charGold: Record<string, number>;
  setCharGold: (charId: string, value: number) => void;
}

const useHomeworkStore = create<MyRaidStore>((set) => ({
  checked: {},
  charGold: {},
  totalGold: 0,
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
}));

export default useHomeworkStore;
