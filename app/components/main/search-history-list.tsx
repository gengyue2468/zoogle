import { useTranslation } from "react-i18next";
import { CloseIcon, ClockIcon, TrendIcon } from "../icons";

interface SearchHistoryListProps {
  history: string[];
  onSelect: (item: string) => void;
  onRemove: (item: string) => void;
  onClear: () => void;
  variant?: "dropdown" | "fullscreen";
  trendingItems?: string[];
  onTrendingSelect?: (item: string) => void;
}

export default function SearchHistoryList({
  history,
  onSelect,
  onRemove,
  onClear,
  variant = "dropdown",
  trendingItems,
  onTrendingSelect,
}: SearchHistoryListProps) {
  const { t } = useTranslation();
  const isFullscreen = variant === "fullscreen";
  const showTrending =
    !isFullscreen &&
    trendingItems &&
    trendingItems.length > 0 &&
    onTrendingSelect;

  return (
    <div
      className={
        isFullscreen
          ? "min-h-0"
          : "max-h-72 overflow-y-auto"
      }
    >
      {history.length !== 0 && (
        <ul
          className={
            isFullscreen
              ? "flex-1 overflow-auto py-2"
              : "border-b border-zoogle-border py-1"
          }
          role="listbox"
          aria-label={t("search.searchHistory")}
        >
          {history.map((item) => (
            <li
              key={item}
              role="option"
              className={
                isFullscreen
                  ? "group flex items-center gap-3 px-4 py-3 text-base text-zoogle-text hover:bg-zoogle-surface cursor-pointer"
                  : "group flex items-center gap-2 rounded-md mx-0.5 px-3 py-1 text-sm text-zoogle-text hover:bg-zoogle-surface cursor-pointer"
              }
              onMouseDown={(e) => {
                e.preventDefault();
                onSelect(item);
              }}
            >
              <ClockIcon
                className={
                  isFullscreen
                    ? "size-5 text-zoogle-text-secondary shrink-0"
                    : "size-4 text-zoogle-text-secondary shrink-0"
                }
              />
              <span className="flex-1 min-w-0 truncate">{item}</span>
              <button
                type="button"
                className={`shrink-0 rounded-full p-1.5 text-zoogle-text-secondary hover:bg-zoogle-surface hover:text-zoogle-text transition-opacity ${isFullscreen ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                aria-label={t("search.clearHistory")}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  onRemove(item);
                }}
              >
                <CloseIcon className={isFullscreen ? "size-4" : "size-3.5"} />
              </button>
            </li>
          ))}
        </ul>
      )}

      {showTrending && (
        <>
          <div className="px-3 pt-2 pb-1">
            <p className="text-xs text-zoogle-text-secondary px-1">
              {t("search.trendingSearches")}
            </p>
          </div>
          <ul
            className="py-1 max-h-60 overflow-auto"
            role="listbox"
            aria-label={t("search.trendingSearches")}
          >
            {trendingItems!.map((item) => (
              <li
                key={item}
                role="option"
                className="group flex items-center gap-2 rounded-md mx-0.5 px-3 py-1.5 text-sm text-zoogle-text hover:bg-zoogle-surface cursor-pointer"
                onMouseDown={(e) => {
                  e.preventDefault();
                  onTrendingSelect!(item);
                }}
              >
                <TrendIcon className="size-5 text-zoogle-text-secondary shrink-0" />
                <span className="flex-1 min-w-0 truncate">{item}</span>
                <span className="w-7 shrink-0" aria-hidden />
              </li>
            ))}
          </ul>
        </>
      )}

      <div
        className={
          isFullscreen
            ? "border-t border-zoogle-border px-4 py-3"
            : "border-t border-zoogle-border px-4 py-2"
        }
      >
        <button
          type="button"
          className="text-sm text-zoogle-link hover:underline"
          onMouseDown={(e) => {
            e.preventDefault();
            onClear();
          }}
        >
          {t("search.clearHistory")}
        </button>
      </div>
    </div>
  );
}
