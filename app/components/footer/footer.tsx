"use client";

import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-zoogle-surface-footer roboto flex flex-col">
      <div className="px-8 py-3 text-base flex justify-between items-center">
        <p>{t("footer.location")}</p>
      </div>
      <hr className="border-zoogle-border" />
      <div className="px-8 py-3 flex flex-row items-center flex-wrap justify-between text-sm">
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
          <a href="https://google.com/search/howsearchworks" rel="noopener noreferrer">
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
        </div>
      </div>
    </footer>
  );
}
