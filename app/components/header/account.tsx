import { useTranslation } from "react-i18next";
import { PlusIcon, SignoutIcon, WarnIcon } from "../icons";

interface ZoogleAccountProps {
  accountInfo: {
    name: string;
    email: string;
    avatar: string;
  };
}

export default function ZoogleAccount({ accountInfo }: ZoogleAccountProps) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center gap-2 p-2 w-90 h-fit">
      <p className="text-center">{accountInfo.email}</p>
      <img
        src={accountInfo.avatar}
        alt={`${accountInfo.name}'s Zoogle Avatar`}
        className="size-24 mt-4 rounded-full"
      />
      <p className="text-2xl font-medium mt-4">
        {t("account.hi", { name: accountInfo.name.split(" ")[0] })}
      </p>
      <button
        type="button"
        className="rounded-full px-4 py-2 text-base font-medium text-zoogle-blue/70 border border-zoogle-border w-fit hover:bg-zoogle-button-bg mt-4"
        onClick={() => window.open("https://myaccount.google.com/")}
      >
        {t("account.manageAccount")}
      </button>
      <div className="mt-4 rounded-3xl bg-zoogle-surface-footer/50 p-4 w-full">
        <div className="flex flex-row items-start gap-4">
          <div>
            <WarnIcon className="mt-0.5 size-5 text-zoogle-yellow" />
          </div>
          <div>
            <h1 className="text-zoogle-text text-base font-medium">
              {t("account.recoveryTitle")}
            </h1>
            <p className="text-zoogle-text/70 mt-1">
              {t("account.recoveryDescription")}
            </p>
            <div className="flex flex-row items-center gap-1 justify-end mt-4 font-medium">
              <button
                type="button"
                className="px-3 py-2 text-sm text-zoogle-blue hover:bg-zoogle-blue/5 rounded-full transition-colors duration-300"
              >
                {t("account.dismiss")}
              </button>
              <button
                type="button"
                className="rounded-full px-3 py-2 text-sm bg-zoogle-blue/5 text-zoogle-blue transition-colors duration-300"
                onClick={() =>
                  window.open("https://myaccount.google.com/security-checkup")
                }
              >
                {t("account.addRecoveryPhone")}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center gap-0.5 w-full mt-4 text-sm">
        <button
          type="button"
          className="bg-zoogle-surface-footer/50 rounded-l-full rounded-r-none px-2 py-2 w-1/2 flex flex-row items-center gap-2"
        >
          <div className="size-8 rounded-full p-2 bg-zoogle-surface-footer/25">
            <PlusIcon className="size-4 text-zoogle-blue" />
          </div>
          {t("account.addAccount")}
        </button>
        <button
          type="button"
          className="bg-zoogle-surface-footer/50 rounded-r-full rounded-l-none px-3 py-2 w-1/2 flex flex-row items-center gap-0"
        >
          <button type="button" className="size-8 rounded-full">
            <SignoutIcon className="size-6" />
          </button>
          {t("account.signOut")}
        </button>
      </div>
    </div>
  );
}
