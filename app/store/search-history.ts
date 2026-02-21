import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const MAX_HISTORY = 10;
const STORAGE_KEY = "zoogle-search-history";

interface SearchHistoryState {
  history: string[];
  addHistory: (q: string) => void;
  removeFromHistory: (q: string) => void;
  clearHistory: () => void;
}

export const useSearchHistoryStore = create<SearchHistoryState>()(
  persist(
    (set) => ({
      history: [],

      addHistory: (q) => {
        const trimmed = q.trim();
        if (!trimmed) return;
        set((state) => {
          const next = [trimmed, ...state.history.filter((h) => h !== trimmed)].slice(0, MAX_HISTORY);
          return { history: next };
        });
      },

      removeFromHistory: (q) =>
        set((state) => ({ history: state.history.filter((h) => h !== q) })),

      clearHistory: () => set({ history: [] }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
