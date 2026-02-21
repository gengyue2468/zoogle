"use client";

import { useTranslation } from "react-i18next";
import { Popover, Tooltip, Tabs } from "../ui";
import { AppsIcon } from "../icons";
import ZoogleApps from "./apps";
import ZoogleAccount from "./account";
import { useSearchStore } from "~/store/search";

export default function Header() {
  const { t } = useTranslation();
  const imageSearchMode = useSearchStore((s) => s.imageSearchMode);
  const openImageSearchPanel = useSearchStore((s) => s.openImageSearchPanel);
  const closeImageSearchPanel = useSearchStore((s) => s.closeImageSearchPanel);

  const accountInfo = {
    name: "Judy Hopps",
    email: "judy.hopps.zpd@zmail.com",
    avatar: "/static/judy.webp",
  };

  return (
    <header className="roboto flex flex-row items-center gap-4 px-4 py-3 text-sm">
      <div className="flex min-w-0 flex-1 justify-start md:justify-end">
        <div className="md:hidden w-full min-w-0">
          <Tabs.Root
            value={imageSearchMode ? "images" : "all"}
            onValueChange={(value: string) => {
              if (value === "images") openImageSearchPanel();
              else closeImageSearchPanel();
            }}
            className="w-full min-w-0"
          >
            <Tabs.List className="justify-start border-0 gap-4 pb-0">
              <Tabs.Tab value="all">{t("header.all")}</Tabs.Tab>
              <Tabs.Tab value="images">{t("header.images")}</Tabs.Tab>
              <Tabs.Indicator className="bottom-0! h-0.5!" />
            </Tabs.List>
          </Tabs.Root>
        </div>
        <div className="hidden md:flex md:items-center md:gap-4">
          <a
            href="https://mail.google.com"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {t("header.zmail")}
          </a>
          <a
            href="https://images.google.com"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {t("header.zmages")}
          </a>
        </div>
      </div>

      <Tooltip content={t("header.zoogleApps")} type="modern" triggerAs="span">
        <Popover content={<ZoogleApps />}>
          <button className="p-2 rounded-full hover:bg-zoogle-surface-elevated cursor-pointer">
            <AppsIcon className="size-6" />
          </button>
        </Popover>
      </Tooltip>
      <Tooltip
        content={
          <div className="px-0.5 py-0.5 space-y-0.5 roboto">
            <p className="text-xs">{t("header.zoogleAccount")}</p>
            <p className="font-medium text-sm">{accountInfo.name}</p>
            <p className="text-zoogle-text-secondary">{accountInfo.email}</p>
          </div>
        }
        type="modern"
        triggerAs="span"
      >
        <Popover content={<ZoogleAccount accountInfo={accountInfo} />}>
          <button className="hover:ring-3 hover:ring-zoogle-border rounded-full transition-all duration-300">
            <img
              src="/static/judy.webp"
              alt="Judy Hopps's Zoogle Avatar"
              className="size-8 rounded-full"
            />
          </button>
        </Popover>
      </Tooltip>
    </header>
  );
}
