"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const LOAD_MIN_MS = 500;
const LOAD_MAX_MS = 1800;
const FAIL_CHANCE = 0.15;
const SPIN_DURATION_MS = 2800;

const LOADER_COLORS = [
  "var(--color-zoogle-blue)",
  "var(--color-zoogle-red)",
  "var(--color-zoogle-yellow)",
  "var(--color-zoogle-green)",
];
const colorIntervalMs = (SPIN_DURATION_MS * 2) / LOADER_COLORS.length;

export default function ZoogleApps() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((i) => (i + 1) % LOADER_COLORS.length);
    }, colorIntervalMs);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isLoading) return;
    const duration = LOAD_MIN_MS + Math.random() * (LOAD_MAX_MS - LOAD_MIN_MS);
    const shouldFail = Math.random() < FAIL_CHANCE;
    const timeout = setTimeout(() => {
      if (shouldFail) {
        setLoadFailed(true);
      } else {
        setIsLoading(false);
      }
    }, duration);
    return () => clearTimeout(timeout);
  }, [isLoading]);

  const handleRetry = () => {
    setLoadFailed(false);
    setIsLoading(true);
  };

  const apps = [
    { nameKey: "account", img: "/static/judy.webp", href: "https://account.google.com" },
    { nameKey: "zmail", img: "/static/bellwether.webp", href: "https://mail.google.com" },
    { nameKey: "maps", img: "/static/chief-bogo.webp", href: "https://www.google.com/maps" },
    { nameKey: "photos", img: "/static/clawhauser.webp", href: "https://photos.google.com" },
    { nameKey: "youtube", img: "/static/gazelle.webp", href: "https://www.youtube.com" },
    { nameKey: "drive", img: "/static/flash-the-sloth.webp", href: "https://drive.google.com" },
    { nameKey: "meet", img: "/static/mayor-winddancer.webp", href: "https://meet.google.com" },
    { nameKey: "assistant", img: "/static/mr.big.webp", href: "https://assistant.google.com" },
    { nameKey: "translate", img: "/static/gary-de-snake.webp", href: "https://translate.google.com" },
  ];

  const panelClass = "w-86";

  if (loadFailed) {
    return (
      <div className={`${panelClass} flex flex-col items-center gap-8 py-2 px-4 min-h-72 justify-center`}>
        <p className="text-xl font-semibold text-zoogle-text-secondary text-center">
          {t("apps.loadingError")}
        </p>
        <button
          type="button"
          onClick={handleRetry}
          className="rounded-full px-4 py-2.5 text-base font-medium bg-zoogle-blue text-white w-full max-w-72"
        >
          {t("apps.retry")}
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`${panelClass} flex flex-col items-center justify-center min-h-80`}>
        <div
          className="size-9 border-4 border-solid border-t-transparent rounded-full"
          style={{
            borderRightColor: LOADER_COLORS[currentColorIndex],
            borderBottomColor: LOADER_COLORS[currentColorIndex],
            borderLeftColor: LOADER_COLORS[currentColorIndex],
            animation: "spin 1.4s cubic-bezier(0.4, 0, 0.2, 1) infinite",
          }}
        />
      </div>
    );
  }

  return (
    <div className={`${panelClass} p-0`}>
      <div className="grid grid-cols-3 gap-1">
        {apps.map((app) => (
          <a
            key={app.nameKey}
            href={app.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 px-1 py-2 rounded-xl text-zoogle-text hover:bg-zoogle-surface transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-zoogle-link focus-visible:ring-offset-2 focus-visible:ring-offset-zoogle-bg"
          >
            <div>
              <img
                src={app.img}
                alt=""
                className="size-12 rounded-full object-cover object-center"
              />
            </div>
            <span className="text-sm text-zoogle-text text-center truncate w-24 md:w-28">
              {t(`apps.${app.nameKey}`)}
            </span>
          </a>
        ))}
      </div>
      <div className="mt-4">
        <button
          type="button"
          onClick={() =>
            window.location.replace("https://about.google/products/")
          }
          className="text-sm text-zoogle-link bg-zoogle-button-bg hover:bg-zoogle-surface border border-zoogle-border rounded-full px-4 py-2.5 w-full"
        >
          {t("apps.appMore")}
        </button>
      </div>
    </div>
  );
}
