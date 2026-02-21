"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const STORAGE_KEY = "i18nextLng";

function detectClientLanguage(): string {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && (stored === "en" || stored === "zh")) return stored;
  } catch {
    // ignore
  }
  const nav = typeof navigator !== "undefined" ? navigator : null;
  const lang = nav?.language?.toLowerCase?.();
  if (lang?.startsWith("zh")) return "zh";
  return "en";
}

export default function I18nProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { i18n } = useTranslation();
  useEffect(() => {
    const lng = detectClientLanguage();
    if (lng !== i18n.language) {
      i18n.changeLanguage(lng);
    }
  }, [i18n]);

  useEffect(() => {
    const lang = i18n.language;
    if (lang) {
      document.documentElement.lang = lang;
    }
  }, [i18n.language]);

  return <>{children}</>;
}
