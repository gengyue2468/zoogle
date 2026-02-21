"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const LOADER_TIMEOUT_MS = 10_000;

export default function ZoogleApps() {
  const { t } = useTranslation();
  const SPIN_DURATION_MS = 2800;
  const loaderRollColors = [
    "var(--color-zoogle-blue)",
    "var(--color-zoogle-red)",
    "var(--color-zoogle-yellow)",
    "var(--color-zoogle-green)",
  ];
  const colorIntervalMs = SPIN_DURATION_MS * 2 / loaderRollColors.length;
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [isTimedOut, setIsTimedOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex(
        (prevIndex) => (prevIndex + 1) % loaderRollColors.length,
      );
    }, colorIntervalMs);

    return () => clearInterval(interval);
  }, [colorIntervalMs]);

  useEffect(() => {
    if (isTimedOut) return;
    const timeout = setTimeout(() => setIsTimedOut(true), LOADER_TIMEOUT_MS);
    return () => clearTimeout(timeout);
  }, [isTimedOut]);

  return (
    <div className="flex flex-col items-center w-64 h-96 gap-4">
      {!isTimedOut ? (
        <div
          className="size-9 border-4 border-solid border-t-transparent rounded-full mt-36"
          style={{
            borderRightColor: loaderRollColors[currentColorIndex],
            borderBottomColor: loaderRollColors[currentColorIndex],
            borderLeftColor: loaderRollColors[currentColorIndex],
            animation: "spin 1.4s cubic-bezier(0.4, 0, 0.2, 1) infinite",
          }}
        />
      ) : (
        <div className="flex flex-col items-center gap-8 py-2 px-4 mt-24">
          <p className="text-2xl font-semibold text-zoogle-text-secondary text-center">
            {t("apps.loadingError")}
          </p>
          <button
            type="button"
            onClick={() => setIsTimedOut(false)}
            className="rounded-full px-3 py-2 text-base font-medium bg-zoogle-blue text-white w-full"
          >
            {t("apps.retry")}
          </button>
        </div>
      )}
    </div>
  );
}
