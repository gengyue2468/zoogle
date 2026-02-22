"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Toast } from "@base-ui/react/toast";
import { CloseIcon } from "../icons";

const SHOW_DELAY_MS = 1500;
const DISMISSED_KEY = "zoogle-switch-toast-dismissed";

function SwitchToZoogleToastTrigger() {
  const { t } = useTranslation();
  const { add } = Toast.useToastManager();

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem(DISMISSED_KEY)) return;

    const timer = setTimeout(() => {
      if (typeof window !== "undefined" && localStorage.getItem(DISMISSED_KEY)) return;
      add({
        title: t("toast.switchToChromia"),
        description: t("toast.chromiaDescription"),
        timeout: 0,
        data: { type: "switch-to-zoogle" },
        onClose: () => {
          try {
            localStorage.setItem(DISMISSED_KEY, "1");
          } catch {}
        },
        actionProps: {
          children: t("toast.getChromia"),
          onClick: () => {
            window.open(
              "https://www.google.com/chrome/",
              "_blank",
              "noopener,noreferrer",
            );
          },
        },
      });
    }, SHOW_DELAY_MS);

    return () => clearTimeout(timer);
  }, [add]);

  return null;
}

export default function SwitchToZoogleToast({
  children,
}: {
  children: React.ReactNode;
}) {
  const toastManager = Toast.createToastManager();

  return (
    <Toast.Provider toastManager={toastManager} timeout={0}>
      <SwitchToZoogleToastList />
      <SwitchToZoogleToastTrigger />
      {children}
    </Toast.Provider>
  );
}

function SwitchToZoogleToastList() {
  const { t } = useTranslation();
  const { toasts } = Toast.useToastManager();

  return (
    <Toast.Portal>
      <Toast.Viewport className="fixed bottom-8 md:bottom-16 left-0 right-0 mx-auto md:mx-0 md:left-auto md:right-0 z-50 flex w-full max-w-sm md:max-w-md flex-col gap-2 outline-none [--base-viewport-padding:0]">
        {toasts.map((toast) => (
          <Toast.Root key={toast.id} toast={toast} className="w-full">
            {(toast.data as { type?: string })?.type === "switch-to-zoogle" ? (
              <SwitchToZoogleToastContent toast={toast} />
            ) : (
              <Toast.Content className="rounded-3xl border border-zoogle-border bg-zoogle-surface-elevated px-4 py-3 shadow-lg flex flex-wrap items-center gap-2">
                <Toast.Title className="text-sm font-medium text-zoogle-text" />
                <Toast.Description className="text-sm text-zoogle-text-secondary" />
                <Toast.Close
                  className="ml-auto rounded-full p-1.5 hover:bg-zoogle-surface"
                  aria-label={t("toast.close")}
                >
                  <CloseIcon className="size-4" />
                </Toast.Close>
              </Toast.Content>
            )}
          </Toast.Root>
        ))}
      </Toast.Viewport>
    </Toast.Portal>
  );
}

function SwitchToZoogleToastContent({ toast }: { toast: { id: string } }) {
  const { t } = useTranslation();
  const { close } = Toast.useToastManager();

  return (
    <Toast.Content className="w-fit overflow-hidden rounded-3xl border border-zoogle-border bg-zoogle-surface-elevated shadow-lg outline-none data-behind:opacity-0 data-expanded:opacity-100 transition-opacity">
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div aria-hidden>
            <img
              src="/static/nick.webp"
              alt={t("toast.nickMascotAlt")}
              className="size-12 rounded-full object-center object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xl font-medium text-zoogle-text block">
              {t("toast.switchToChromia")}
            </p>
            <p className="text-base text-zoogle-text-secondary mt-0.5 block">
              {t("toast.chromiaDescription")}
            </p>
          </div>
          <Toast.Close
            className="shrink-0 rounded-full p-1.5 text-zoogle-text-secondary hover:bg-zoogle-surface hover:text-zoogle-text"
            aria-label={t("toast.close")}
          >
            <CloseIcon className="size-5" />
          </Toast.Close>
        </div>
        <div className="mt-3 flex gap-2 justify-end">
          <button
            type="button"
            className="rounded-full px-4 py-2 text-sm font-medium text-zoogle-text hover:bg-zoogle-surface transition-colors"
            onClick={() => close(toast.id)}
          >
            {t("toast.notNow")}
          </button>
          <a
            href="https://www.google.com/chrome/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-zoogle-link text-white px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
            onClick={() => close(toast.id)}
          >
            {t("toast.getChromia")}
          </a>
        </div>
      </div>
    </Toast.Content>
  );
}
