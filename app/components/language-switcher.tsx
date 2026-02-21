"use client";

import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language;

  const toggleLanguage = () => {
    const newLang = currentLang.startsWith("zh") ? "en" : "zh";
    i18n.changeLanguage(newLang);
    try {
      localStorage.setItem("i18nextLng", newLang);
    } catch {
      // ignore
    }
  };

  const getDisplayText = () => {
    if (currentLang.startsWith("zh")) {
      return (
        <p>
          Zoogle 提供 <span className="text-zoogle-link hover:underline">English</span>
        </p>
      );
    }
    return (
      <p>
        Zoogle offered in {" "}
        <span className="text-zoogle-link hover:underline">中文（简体）</span>
      </p>
    );
  };

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="text-sm whitespace-nowrap"
      aria-label={
        currentLang.startsWith("zh") ? "Switch to English" : "切换到中文"
      }
    >
      {getDisplayText()}
    </button>
  );
}
