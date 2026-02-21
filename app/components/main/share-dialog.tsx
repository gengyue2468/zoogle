"use client";

import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { CloseIcon, XIcon, GitHubIcon, EmailIcon } from "../icons";

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  url?: string;
  title?: string;
}

export default function ShareDialog({
  open,
  onOpenChange,
  url,
  title,
}: ShareDialogProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const shareUrl =
    url ?? (typeof window !== "undefined" ? window.location.href : "");
  const shareTitle = title || t("hero.title");

  const handleCopy = useCallback(async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }, [shareUrl]);

  const mailto = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareUrl)}`;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`;
  const githubRepoUrl = "https://github.com/gengyue2468/zoogle";

  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange} modal>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="fixed inset-0 z-40 bg-black/50 data-closed:opacity-0 data-open:opacity-100 transition-opacity duration-200" />
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          aria-hidden
        >
          <BaseDialog.Popup
            className="w-full max-w-md rounded-3xl bg-zoogle-surface-elevated border border-zoogle-border shadow-lg outline-none data-closed:opacity-0 data-closed:scale-95 data-open:opacity-100 data-open:scale-100 transition-all duration-200"
            aria-modal
            aria-labelledby="share-dialog-title"
          >
            <div className="flex items-center justify-between px-6 pt-5 pb-2">
              <h2
                id="share-dialog-title"
                className="text-xl font-normal text-zoogle-text"
              >
                {t("share.title")}
              </h2>
              <BaseDialog.Close
                className="rounded-full p-2 text-zoogle-text-secondary hover:bg-zoogle-surface hover:text-zoogle-text focus:outline-none focus:ring-2 focus:ring-zoogle-link"
                aria-label={t("share.close")}
              >
                <CloseIcon className="size-5" />
              </BaseDialog.Close>
            </div>

            <div className="px-6 pb-6 pt-1">
              <p className="text-sm text-zoogle-text-secondary mb-3">
                {t("share.description")}
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  className="flex-1 min-w-0 rounded-full border border-zoogle-border bg-zoogle-bg px-3 py-2.5 text-sm text-zoogle-text focus:outline-none"
                  aria-label={t("share.description")}
                />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="shrink-0 rounded-full bg-zoogle-button-bg border border-zoogle-button-border px-4 py-2.5 text-sm font-medium text-zoogle-button-text hover:bg-zoogle-surface transition-colors focus:outline-none focus:ring-2 focus:ring-zoogle-link"
                >
                  {copied ? t("share.copied") : t("share.copyLink")}
                </button>
              </div>

              <div className="flex items-center gap-4 my-4">
                <span className="flex-1 h-px bg-zoogle-border" aria-hidden />
                <span className="text-xs text-zoogle-text-secondary">
                  {t("share.or")}
                </span>
                <span className="flex-1 h-px bg-zoogle-border" aria-hidden />
              </div>

              <div className="flex flex-col gap-2">
                <a
                  href={tweetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full rounded-full border border-zoogle-border bg-zoogle-bg px-4 py-3 text-sm text-zoogle-text hover:bg-zoogle-surface transition-colors focus:outline-none focus:ring-2 focus:ring-zoogle-link"
                >
                  <XIcon className="size-4" />
                  <span>{t("share.shareViaX")}</span>
                </a>
                <a
                  href={mailto}
                  className="flex items-center gap-3 w-full rounded-full border border-zoogle-border bg-zoogle-bg px-4 py-3 text-sm text-zoogle-text hover:bg-zoogle-surface transition-colors focus:outline-none focus:ring-2 focus:ring-zoogle-link"
                >
                  <EmailIcon className="size-5" />
                  <span>{t("share.shareViaEmail")}</span>
                </a>
                <a
                  href={githubRepoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full rounded-full border border-zoogle-border bg-zoogle-bg px-4 py-3 text-sm text-zoogle-text hover:bg-zoogle-surface transition-colors focus:outline-none focus:ring-2 focus:ring-zoogle-link"
                >
                  <GitHubIcon className="size-5" />
                  <span>{t("share.viewOnGitHub")}</span>
                </a>
              </div>
            </div>
          </BaseDialog.Popup>
        </div>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
