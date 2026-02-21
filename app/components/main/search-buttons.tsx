import { useTranslation } from "react-i18next";
import { useSearchStore } from "../../store/search";
import { useSearchHistoryStore } from "../../store/search-history";

const GOOGLE_SEARCH_URL = "https://www.google.com/search";

export default function SearchButtons() {
  const { t } = useTranslation();
  const imageSearchMode = useSearchStore((s) => s.imageSearchMode);
  const searchValue = useSearchStore((s) => s.searchValue);
  const addHistory = useSearchHistoryStore((s) => s.addHistory);
  const buttonStyle =
    "bg-zoogle-button-bg border border-transparent hover:border-zoogle-button-border rounded-lg px-4 py-1.75";

  const handleFeelingLucky = () => {
    const q = searchValue.trim() || "";
    addHistory(q);
    const params = new URLSearchParams({ q });
    params.set("btnI", "1");
    window.location.href = `${GOOGLE_SEARCH_URL}?${params.toString()}`;
  };

  if (imageSearchMode) return null;

  return (
    <div className="flex flex-row items-center gap-2 mt-2 text-sm w-full justify-center">
      <button type="submit" className={buttonStyle}>
        {t("search.zoogleSearch")}
      </button>
      <button type="button" className={buttonStyle} onClick={handleFeelingLucky}>
        {t("search.imFeelingLucky")}
      </button>
    </div>
  );
}
