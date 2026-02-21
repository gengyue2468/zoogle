"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { CloseIcon } from "../icons";
import WaveformMicrophone from "./waveform-microphone";

const LISTEN_TIMEOUT_MS = 6_000;

interface VoiceErrorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function VoiceDialog({ open, onOpenChange }: VoiceErrorDialogProps) {
  const { t } = useTranslation();
  const [isTimedOut, setIsTimedOut] = useState(false);

  useEffect(() => {
    if (!open) {
      setIsTimedOut(false);
      return;
    }
    const timeout = setTimeout(() => setIsTimedOut(true), LISTEN_TIMEOUT_MS);
    return () => clearTimeout(timeout);
  }, [open]);

  const handleOpenChange = (next: boolean) => {
    if (!next) setIsTimedOut(false);
    onOpenChange(next);
  };

  return (
    <BaseDialog.Root open={open} onOpenChange={handleOpenChange} modal>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="fixed inset-0 z-40 bg-[#1f1f1f] data-closed:opacity-0 data-open:opacity-100 transition-opacity duration-200" />
        <div
          className="fixed inset-0 z-50 flex flex-col"
          aria-hidden
        >
          <BaseDialog.Close
            className="absolute right-4 top-4 z-10 rounded-full p-2 text-white/50 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-zoogle-link"
            aria-label={t("search.clear")}
          >
            <CloseIcon className="size-6" />
          </BaseDialog.Close>

          <BaseDialog.Popup
            className="flex min-h-screen flex-1 flex-col items-center justify-center gap-10 px-4 py-16 md:flex-row md:gap-16"
            aria-modal
            aria-labelledby="voice-dialog-title"
          >
            <div className="flex min-h-[7rem] flex-col items-center justify-center text-center">
              <h2
                id="voice-dialog-title"
                className={`text-3xl font-medium text-white/50 md:text-4xl lg:text-5xl ${!isTimedOut ? "animate-pulse" : ""}`}
              >
                {!isTimedOut ? t("voice.listening") : t("voice.errorTitle")}
              </h2>
              <p
                className={`mt-3 text-base text-white/50 md:text-lg ${!isTimedOut ? "animate-pulse" : ""}`}
              >
                {!isTimedOut ? t("voice.openingMicrophone") : t("voice.errorDescription")}
              </p>
            </div>
            <WaveformMicrophone size={140} className="shrink-0" />
          </BaseDialog.Popup>
        </div>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
