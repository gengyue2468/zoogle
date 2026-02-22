"use client";

import { useTranslation } from "react-i18next";
import { ArrowleftIcon } from "../icons";
import SearchHistoryList from "./search-history-list";
import TrendingSearches from "./trending-searches";
import { useSearchStore } from "../../store/search";
import { useSearchHistoryStore } from "../../store/search-history";

interface SearchBarMobileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SearchBarMobileDialog({
  open,
  onOpenChange,
}: SearchBarMobileDialogProps) {
  const { t } = useTranslation();
  const searchValue = useSearchStore((s) => s.searchValue);
  const setSearchValue = useSearchStore((s) => s.setSearchValue);
  const history = useSearchHistoryStore((s) => s.history);
  const removeFromHistory = useSearchHistoryStore((s) => s.removeFromHistory);
  const clearHistory = useSearchHistoryStore((s) => s.clearHistory);

  const handleSelect = (item: string) => {
    setSearchValue(item);
    onOpenChange(false);
  };

  const handleClose = () => onOpenChange(false);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-zoogle-bg"
      role="dialog"
      aria-modal
      aria-label={t("search.zoogleSearch")}
    >
      <div className="mx-1 border-b border-zoogle-border flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={handleClose}
          className="shrink-0 rounded-full p-2 text-zoogle-blue hover:bg-zoogle-surface focus:outline-none focus:ring-2 focus:ring-zoogle-link touch-manipulation"
          aria-label={t("search.clear")}
        >
          <ArrowleftIcon className="size-6" />
        </button>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="flex-1 min-w-0 py-3 pr-2 text-base text-zoogle-text placeholder:text-zoogle-text-secondary focus:outline-none"
          autoComplete="off"
          autoFocus
        />
      </div>
      <div className="flex-1 min-h-0 flex flex-col overflow-hidden px-0">
        {history.length > 0 ? (
          <>
            <p className="text-sm text-zoogle-text-secondary px-4 pt-3 pb-1 shrink-0">
              {t("search.searchHistory")}
            </p>
            <div className="flex-1 min-h-0 overflow-y-auto">
              <SearchHistoryList
                history={history}
                onSelect={handleSelect}
                onRemove={removeFromHistory}
                onClear={() => clearHistory()}
                variant="fullscreen"
              />
            </div>
          </>
        ) : null}
        <div className="shrink-0 pt-2 pb-6">
          <TrendingSearches variant="inline" />
        </div>
      </div>
    </div>
  );
}
