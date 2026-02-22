import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ShareIcon } from "../icons";
import ShareDialog from "./share-dialog";

export default function Hero() {
  const { t } = useTranslation();
  const [shareOpen, setShareOpen] = useState(false);

  return (
    <div className="relative w-full max-w-72 md:max-w-md mx-auto">
      <h1 className="text-6xl md:text-8xl font-bold text-center">
        {t("hero.title")}
      </h1>
      <button
        type="button"
        onClick={() => setShareOpen(true)}
        className="absolute right-0 bottom-0 size-8 flex items-center justify-center bg-zoogle-surface-elevated rounded-full text-sm hover:bg-zoogle-surface-elevated/50 transition-colors duration-300"
        aria-label={t("hero.share")}
      >
        <ShareIcon className="size-4 inline-block" />
      </button>

      <ShareDialog open={shareOpen} onOpenChange={setShareOpen} />
    </div>
  );
}
