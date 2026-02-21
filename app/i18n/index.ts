import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import zh from "./locales/zh.json";

const resources = {
  en: {
    translation: en,
  },
  zh: {
    translation: zh,
  },
};

// 不在 init 时使用 LanguageDetector，保证首屏服务端与客户端均为 fallbackLng，避免水合不匹配
i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
  showSupportNotice: false,
});

export default i18n;
