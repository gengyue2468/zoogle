"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Select as BaseSelect } from "@base-ui/react/select";
import Popover from "../ui/popover";
import { useSettingsStore } from "../../store/settings";
import type { SearchEngineId } from "../../store/settings";
import { GoogleIcon, BingIcon, DuckduckgoIcon } from "../icons";

const ENGINE_IDS: SearchEngineId[] = ["google", "duckduckgo", "bing"];
const ENGINE_LABELS: Record<SearchEngineId, string> = {
  google: "settings.searchEngineGoogle",
  duckduckgo: "settings.searchEngineDuckDuckGo",
  bing: "settings.searchEngineBing",
};

const ENGINE_FAVICONS: Record<SearchEngineId, React.ReactNode> = {
  google: <GoogleIcon className="size-5" />,
  duckduckgo: <DuckduckgoIcon className="size-5" />,
  bing: <BingIcon className="size-5" />,
};

function EngineIcon({
  id,
  className,
}: {
  id: SearchEngineId;
  className?: string;
}) {
  return <div className={className}>{ENGINE_FAVICONS[id]}</div>;
}

const selectTriggerClasses = [
  "flex items-center gap-2 w-[200px] rounded-3xl border border-zoogle-border",
  "bg-zoogle-surface-elevated px-3 py-2 text-sm text-zoogle-text",
  "hover:bg-zoogle-surface focus:outline-none focus:ring-2 focus:ring-zoogle-link focus:ring-offset-0",
  "data-[popup-open]:border-zoogle-link cursor-pointer",
].join(" ");

const selectPopupClasses = [
  "z-50 rounded-2xl border border-zoogle-border bg-zoogle-surface-elevated py-1",
  "shadow-[0_4px_12px_rgba(0,0,0,.15)]",
  "w-[200px] box-border",
].join(" ");

const selectItemClasses = [
  "flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-sm text-zoogle-text w-full",
  "data-[highlighted]:bg-zoogle-surface data-[selected]:bg-zoogle-surface",
].join(" ");

function useEffectiveDark(darkMode: boolean | null) {
  const [systemPrefersDark, setSystemPrefersDark] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : false
  );
  useEffect(() => {
    if (darkMode !== null) return;
    const m = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemPrefersDark(m.matches);
    const handler = () => setSystemPrefersDark(m.matches);
    m.addEventListener("change", handler);
    return () => m.removeEventListener("change", handler);
  }, [darkMode]);
  return darkMode === true || (darkMode === null && systemPrefersDark);
}

function SettingsPopoverContent() {
  const { t } = useTranslation();
  const searchEngine = useSettingsStore((s) => s.searchEngine);
  const setSearchEngine = useSettingsStore((s) => s.setSearchEngine);
  const darkMode = useSettingsStore((s) => s.darkMode);
  const setDarkMode = useSettingsStore((s) => s.setDarkMode);
  const isDark = useEffectiveDark(darkMode);
  const toggleTheme = () => setDarkMode(isDark ? false : true);

  return (
    <div className="flex flex-col gap-1 w-fit">
      <div>
        <p className="text-zoogle-text-secondary text-xs font-medium mb-2">
          {t("settings.searchEngine")}
        </p>
        <BaseSelect.Root
          value={searchEngine}
          onValueChange={(v) =>
            v != null && setSearchEngine(v as SearchEngineId)
          }
          items={ENGINE_IDS.map((id) => ({
            value: id,
            label: t(ENGINE_LABELS[id]),
          }))}
        >
          <BaseSelect.Trigger className={selectTriggerClasses}>
            <EngineIcon id={searchEngine} className="size-5 shrink-0" />
            <BaseSelect.Value className="truncate" />
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="shrink-0 text-zoogle-text-secondary ml-auto"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </BaseSelect.Trigger>
          <BaseSelect.Portal>
            <BaseSelect.Positioner side="bottom" sideOffset={8} align="start">
              <BaseSelect.Popup className={selectPopupClasses}>
                <BaseSelect.List className="px-1 py-0.5 space-y-0.5">
                  {ENGINE_IDS.map((id) => (
                    <BaseSelect.Item
                      key={id}
                      value={id}
                      className={selectItemClasses}
                    >
                      <EngineIcon id={id} className="size-5 shrink-0" />
                      <BaseSelect.ItemText className="truncate">
                        {t(ENGINE_LABELS[id])}
                      </BaseSelect.ItemText>
                    </BaseSelect.Item>
                  ))}
                </BaseSelect.List>
              </BaseSelect.Popup>
            </BaseSelect.Positioner>
          </BaseSelect.Portal>
        </BaseSelect.Root>
      </div>
      <div>
        <button
          type="button"
          onClick={toggleTheme}
          className="text-sm text-zoogle-text text-left rounded-3xl px-3 py-2 hover:bg-zoogle-surface w-full"
        >
          {t("settings.darkTheme")}：
          {isDark
            ? t("settings.darkThemeEnabled")
            : t("settings.darkThemeDisabled")}
        </button>
      </div>
    </div>
  );
}

export default function Footer() {
  const { t } = useTranslation();
  const darkMode = useSettingsStore((s) => s.darkMode);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode === true) {
      root.className = "dark";
      root.style.colorScheme = "dark";
    } else if (darkMode === false) {
      root.className = "light";
      root.style.colorScheme = "light";
    } else {
      root.removeAttribute("class");
      root.style.removeProperty("color-scheme");
    }
  }, [darkMode]);

  return (
    <footer className="bg-zoogle-surface-footer roboto flex flex-col">
      <div className="px-8 py-3 text-base flex justify-between items-center">
        <p>{t("footer.location")}</p>
      </div>
      <hr className="border-zoogle-border" />
      <div className="px-8 py-3 flex flex-col items-center justify-center gap-3 text-sm text-center md:hidden">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 *:hover:underline *:whitespace-nowrap">
          <Popover
            content={<SettingsPopoverContent />}
            children={
              <button
                type="button"
                className="hover:underline whitespace-nowrap bg-transparent border-none cursor-pointer p-0 text-inherit text-sm font-inherit"
              >
                {t("footer.settings")}
              </button>
            }
          />
          <a href="https://google.com/privacy" rel="noopener noreferrer">
            {t("footer.privacy")}
          </a>
          <a href="https://google.com/terms" rel="noopener noreferrer">
            {t("footer.terms")}
          </a>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 *:hover:underline *:whitespace-nowrap">
          <a href="https://google.com/ads" rel="noopener noreferrer">
            {t("footer.advertising")}
          </a>
          <a href="https://google.com/services" rel="noopener noreferrer">
            {t("footer.business")}
          </a>
          <a href="https://about.google" rel="noopener noreferrer">
            {t("footer.about")}
          </a>
          <a
            href="https://google.com/search/howsearchworks"
            rel="noopener noreferrer"
          >
            {t("footer.howSearchWorks")}
          </a>
        </div>
      </div>
      <div className="px-8 py-3 hidden md:flex flex-row items-center flex-wrap justify-between text-sm">
        <div className="flex flex-row items-center gap-4 *:hover:underline *:whitespace-nowrap flex-wrap">
          <a href="https://about.google" rel="noopener noreferrer">
            {t("footer.about")}
          </a>
          <a href="https://google.com/ads" rel="noopener noreferrer">
            {t("footer.advertising")}
          </a>
          <a href="https://google.com/services" rel="noopener noreferrer">
            {t("footer.business")}
          </a>
          <a
            href="https://google.com/search/howsearchworks"
            rel="noopener noreferrer"
          >
            {t("footer.howSearchWorks")}
          </a>
        </div>
        <div className="flex flex-row items-center gap-4 *:hover:underline *:whitespace-nowrap flex-wrap">
          <a href="https://google.com/privacy" rel="noopener noreferrer">
            {t("footer.privacy")}
          </a>
          <a href="https://google.com/terms" rel="noopener noreferrer">
            {t("footer.terms")}
          </a>
          <Popover
            content={<SettingsPopoverContent />}
            children={
              <button
                type="button"
                className="hover:underline whitespace-nowrap bg-transparent border-none cursor-pointer p-0 text-inherit text-sm font-inherit"
              >
                {t("footer.settings")}
              </button>
            }
          />
        </div>
      </div>
    </footer>
  );
}
