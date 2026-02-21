import { useRef, useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  PlusIcon,
  MicrophoneIcon,
  CameraIcon,
  AiSearchIcon,
  CloseIcon,
  AttachmentIcon,
  PhotoIcon,
} from "../icons";
import { Select, Tooltip } from "../ui";
import VoiceDialog from "./voice-dialog";
import ImageSearchPanel from "./image-search-panel";
import SearchHistoryList from "./search-history-list";
import SearchBarMobileDialog from "./search-bar-mobile-dialog";
import { useSearchStore } from "../../store/search";
import { useSearchHistoryStore } from "../../store/search-history";
import { useTrendingSearches } from "~/data/trending-searches";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(max-width: 767px)");
    setIsMobile(m.matches);
    const handler = () => setIsMobile(m.matches);
    m.addEventListener("change", handler);
    return () => m.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const DESKTOP_TRENDING_COUNT = 6;

export default function SearchBar() {
  const { t } = useTranslation();

  const uploadOptions = [
    {
      value: "image",
      label: t("search.uploadImage"),
      icon: <PhotoIcon className="size-6" />,
    },
    {
      value: "file",
      label: t("search.uploadFile"),
      icon: <AttachmentIcon className="size-6" />,
    },
  ];
  const containerRef = useRef<HTMLDivElement>(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [mobileDialogOpen, setMobileDialogOpen] = useState(false);
  const isMobile = useIsMobile();
  const trendingSearches = useTrendingSearches();
  const desktopTrending = useMemo(
    () => shuffle(trendingSearches).slice(0, DESKTOP_TRENDING_COUNT),
    [trendingSearches],
  );

  const searchValue = useSearchStore((s) => s.searchValue);
  const setSearchValue = useSearchStore((s) => s.setSearchValue);
  const voiceDialogOpen = useSearchStore((s) => s.voiceDialogOpen);
  const setVoiceDialogOpen = useSearchStore((s) => s.setVoiceDialogOpen);
  const imageSearchMode = useSearchStore((s) => s.imageSearchMode);
  const openImageSearchPanel = useSearchStore((s) => s.openImageSearchPanel);

  const history = useSearchHistoryStore((s) => s.history);
  const removeFromHistory = useSearchHistoryStore((s) => s.removeFromHistory);
  const clearHistory = useSearchHistoryStore((s) => s.clearHistory);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setHistoryOpen(false);
      }
    }
    if (historyOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [historyOpen]);

  const hasContent = searchValue.trim() !== "";
  const showDropdown = historyOpen && !isMobile;

  const handleInputFocus = () => {
    if (isMobile) {
      setMobileDialogOpen(true);
    } else {
      setHistoryOpen(true);
    }
  };

  if (imageSearchMode) {
    return (
      <>
        <ImageSearchPanel />
        <VoiceDialog open={voiceDialogOpen} onOpenChange={setVoiceDialogOpen} />
      </>
    );
  }

  return (
    <div className="relative w-full" ref={containerRef}>
      <div
        className={`rounded-3xl border border-zoogle-border overflow-hidden ${showDropdown ? "bg-zoogle-surface-elevated shadow-lg" : "bg-zoogle-surface shadow-xs"}`}
      >
        <div className={`relative ${showDropdown && 'border-b border-zoogle-border'}`}>
          <div className="absolute left-1.5 top-1/2 -translate-y-1/2 z-10">
            <Tooltip content={t("search.upload")} triggerAs="span">
              <Select
                items={uploadOptions}
                placeholder={t("search.upload")}
                trigger={<PlusIcon className="size-5" />}
                aria-label={t("search.upload")}
                onValueChange={(v) => {
                  if (v) console.log("Upload:", v);
                }}
              />
            </Tooltip>
          </div>
          <input
            type="text"
            placeholder={undefined}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={handleInputFocus}
            className={`w-full bg-transparent py-3 pl-12 focus:outline-none focus:ring-0 border-0 ${hasContent ? "pr-40" : "pr-48"}`}
            autoComplete="off"
          />
          <div className="flex flex-row justify-end gap-0 items-center absolute right-1.5 top-1/2 -translate-y-1/2">
            {hasContent ? (
              <Tooltip content={t("search.clear")} triggerAs="span">
                <button
                  type="button"
                  className="p-2 rounded-full hover:bg-zoogle-surface-elevated/50 transition-colors duration-300 cursor-pointer"
                  onClick={() => setSearchValue("")}
                >
                  <CloseIcon className="size-5" />
                </button>
              </Tooltip>
            ) : (
              <>
                <Tooltip content={t("search.searchByVoice")} triggerAs="span">
                  <button
                    type="button"
                    className="p-2 rounded-full hover:bg-zoogle-surface-elevated/50 transition-colors duration-300"
                    onClick={() => setVoiceDialogOpen(true)}
                  >
                    <MicrophoneIcon className="size-5" />
                  </button>
                </Tooltip>
                <Tooltip content={t("search.searchByImage")} triggerAs="span">
                  <button
                    type="button"
                    className="p-2 rounded-full hover:bg-zoogle-surface-elevated/50 transition-colors duration-300"
                    onClick={openImageSearchPanel}
                  >
                    <CameraIcon className="size-5" />
                  </button>
                </Tooltip>
              </>
            )}

            <a
              href="https://gemini.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="ai-mode-border ml-2"
            >
              <AiSearchIcon className="size-4 shrink-0" />
              <span>{t("search.aiMode")}</span>
            </a>
          </div>
        </div>

        {showDropdown && (
          <SearchHistoryList
            history={history}
            onSelect={(item) => {
              setSearchValue(item);
              setHistoryOpen(false);
            }}
            onRemove={removeFromHistory}
            onClear={() => {
              clearHistory();
              setHistoryOpen(false);
            }}
            variant="dropdown"
            trendingItems={desktopTrending}
            onTrendingSelect={(item) => {
              setSearchValue(item);
              setHistoryOpen(false);
            }}
          />
        )}
      </div>

      <VoiceDialog open={voiceDialogOpen} onOpenChange={setVoiceDialogOpen} />
      {isMobile && (
        <SearchBarMobileDialog
          open={mobileDialogOpen}
          onOpenChange={setMobileDialogOpen}
        />
      )}
    </div>
  );
}
