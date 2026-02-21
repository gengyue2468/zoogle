import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const STORAGE_KEY = "zoogle-settings";

export type SearchEngineId = "google" | "duckduckgo" | "bing";

const SEARCH_ENGINE_URLS: Record<SearchEngineId, string> = {
  google: "https://www.google.com/search",
  duckduckgo: "https://duckduckgo.com/",
  bing: "https://www.bing.com/search",
};

interface SettingsState {
  searchEngine: SearchEngineId;
  darkMode: boolean | null;
  setSearchEngine: (id: SearchEngineId) => void;
  setDarkMode: (value: boolean | null) => void;
  getSearchUrl: (params: { q?: string; feelingLucky?: boolean }) => string;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      searchEngine: "google",
      darkMode: null,

      setSearchEngine: (id) => set({ searchEngine: id }),
      setDarkMode: (value) => set({ darkMode: value }),

      getSearchUrl: ({ q = "", feelingLucky = false }) => {
        const engine = get().searchEngine;
        const base = SEARCH_ENGINE_URLS[engine];
        if (engine === "duckduckgo") {
          return q ? `${base}?q=${encodeURIComponent(q)}` : base;
        }
        if (engine === "bing") {
          return q ? `${base}?q=${encodeURIComponent(q)}` : base;
        }
        // google
        if (feelingLucky && q) {
          return `${base}?q=${encodeURIComponent(q)}&btnI=1`;
        }
        return q ? `${base}?q=${encodeURIComponent(q)}` : base;
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ searchEngine: s.searchEngine, darkMode: s.darkMode }),
    }
  )
);

export { SEARCH_ENGINE_URLS };
