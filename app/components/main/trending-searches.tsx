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

export default function TrendingSearches() {
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

  return (
    <div className="md:hidden w-full mt-4 mb-4">
      <p className="text-xl font-medium mb-2 px-1">{t("search.trendingSearches")}</p>
      <div className="flex flex-col overflow-hidden">
        {items.map((query, i) => (
          <a
            key={query}
            href={`${GOOGLE_SEARCH_URL}?q=${encodeURIComponent(query)}`}
            onClick={() => addHistory(query)}
            className={`flex items-center gap-4 px-4 py-3 text-sm text-zoogle-button-text hover:bg-zoogle-surface transition-colors border-zoogle-border border-b`}
          >
            <span>
              <TrendIcon className="size-5" />
            </span>
            <span >{query}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
