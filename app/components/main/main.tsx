import { useEffect } from "react";
import { useSearchParams } from "react-router";
import SearchBar from "./search-bar";
import SearchButtons from "./search-buttons";
import TrendingSearches from "./trending-searches";
import { useSearchStore } from "../../store/search";
import { useSearchHistoryStore } from "../../store/search-history";
import { getInternalSearchUrl, useSettingsStore } from "../../store/settings";
import Hero from "./hero";
import LanguageSwitcher from "../language-switcher";

export default function Main() {
  const [searchParams] = useSearchParams();
  const searchValue = useSearchStore((s) => s.searchValue);
  const addHistory = useSearchHistoryStore((s) => s.addHistory);
  const getSearchUrl = useSettingsStore((s) => s.getSearchUrl);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q != null && q.trim() !== "") {
      const feelingLucky = searchParams.get("btnI") === "1";
      window.location.href = getSearchUrl({ q: q.trim(), feelingLucky });
    }
  }, [searchParams, getSearchUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchValue.trim();
    addHistory(q);
    window.location.href = getInternalSearchUrl({ q });
  };

  return (
    <main className="flex-1 flex flex-col items-center mt-20 md:mt-24 xl:mt-36">
      <Hero />
      <form
        className="flex flex-col items-center gap-4 mt-16 max-w-180 px-4 mx-auto w-full"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="q" value={searchValue} aria-hidden />
        <SearchBar />
        <div className="hidden md:block">
          <SearchButtons />
        </div>
        <div className="mt-8">
          <LanguageSwitcher />
        </div>

        <TrendingSearches />
      </form>
    </main>
  );
}
