import SearchBar from "./search-bar";
import SearchButtons from "./search-buttons";
import TrendingSearches from "./trending-searches";
import { useSearchStore } from "../../store/search";
import { useSearchHistoryStore } from "../../store/search-history";
import Hero from "./hero";
import LanguageSwitcher from "../language-switcher";

const GOOGLE_SEARCH_URL = "https://www.google.com/search";

export default function Main() {
  const searchValue = useSearchStore((s) => s.searchValue);
  const addHistory = useSearchHistoryStore((s) => s.addHistory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchValue.trim();
    addHistory(q);
    const params = new URLSearchParams(q ? { q } : undefined);
    window.location.href = params.toString()
      ? `${GOOGLE_SEARCH_URL}?${params}`
      : GOOGLE_SEARCH_URL;
  };

  return (
    <main className="flex-1 flex flex-col items-center mt-20 md:mt-36">
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
