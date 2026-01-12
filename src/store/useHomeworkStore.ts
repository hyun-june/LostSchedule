import { create } from "zustand";

interface MyRaidStore {
  charGold: Record<string, number>;
  setCharGold: (charId: string, value: number) => void;
}

const useHomeworkStore = create<MyRaidStore>((set) => ({
  charGold: {},
  setCharGold: (charId, value) =>
    set((state) => ({
      charGold: {
        ...state.charGold,
        [charId]: value,
      },
    })),
}));

export default useHomeworkStore;
