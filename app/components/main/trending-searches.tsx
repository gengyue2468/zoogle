"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchHistoryStore } from "~/store/search-history";
import { useTrendingSearches, shuffleTrendingItems } from "~/data/trending-searches";
import { TrendIcon } from "../icons";

const GOOGLE_SEARCH_URL = "https://www.google.com/search";

const INITIAL_COUNT = 6;

function countByHeight(height: number): number {
  const count = Math.floor(height / 100);
  return Math.min(12, Math.max(4, count));
}

interface TrendingSearchesProps {
  /** 在移动端弹窗内展示时传 true，与搜索历史列表样式一致；主屏独立展示时为 false（默认） */
  variant?: "standalone" | "inline";
}

export default function TrendingSearches({ variant = "standalone" }: TrendingSearchesProps) {
  const { t } = useTranslation();
  const addHistory = useSearchHistoryStore((s) => s.addHistory);
  const fullList = useTrendingSearches();
  // 首屏用确定性顺序，避免服务端与客户端 shuffle 不一致导致水合报错
  const [items, setItems] = useState<string[]>(() =>
    fullList.slice(0, INITIAL_COUNT),
  );

  useEffect(() => {
    const count = countByHeight(window.innerHeight);
    setItems(shuffleTrendingItems(fullList, count));
  }, [fullList]);

  const isInline = variant === "inline";

  return (
    <div className="md:hidden w-full">
      <p
        className={
          isInline
            ? "text-sm text-zoogle-text-secondary px-4 pt-3 pb-1"
            : "text-xl font-medium mb-2 px-1 mt-4"
        }
      >
        {t("search.trendingSearches")}
      </p>
      <div className="flex flex-col overflow-hidden">
        {items.map((query) => (
          <a
            key={query}
            href={`${GOOGLE_SEARCH_URL}?q=${encodeURIComponent(query)}`}
            onClick={() => addHistory(query)}
            className={
              isInline
                ? "flex items-center gap-3 px-4 py-3 text-base text-zoogle-text hover:bg-zoogle-surface transition-colors cursor-pointer"
                : "flex items-center gap-4 px-4 py-3 text-sm text-zoogle-button-text hover:bg-zoogle-surface transition-colors border-zoogle-border border-b cursor-pointer"
            }
          >
            <TrendIcon
              className={
                isInline
                  ? "size-5 text-zoogle-text-secondary shrink-0"
                  : "size-5 shrink-0"
              }
            />
            <span className={isInline ? "flex-1 min-w-0 truncate" : ""}>
              {query}
            </span>
          </a>
        ))}
      </div>
      {!isInline && <div className="mb-16" aria-hidden />}
    </div>
  );
}
