import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CloseIcon, SearchIcon } from "../icons";
import type { SVGProps } from "react";
import { useSearchStore } from "../../store/search";

export default function ImageSearchPanel() {
  const { t } = useTranslation();
  const panelRef = useRef<HTMLDivElement>(null);
  const imageUrl = useSearchStore((s) => s.imageUrl);
  const setImageUrl = useSearchStore((s) => s.setImageUrl);
  const isDragging = useSearchStore((s) => s.isDragging);
  const setIsDragging = useSearchStore((s) => s.setIsDragging);
  const closeImageSearchPanel = useSearchStore((s) => s.closeImageSearchPanel);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        closeImageSearchPanel();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeImageSearchPanel]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) {
      console.log("Image dropped:", file.name);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Image selected:", file.name);
    }
    e.target.value = "";
  };

  const handlePasteSearch = () => {
    const url = imageUrl.trim();
    if (url) {
      console.log("Search by image URL:", url);
    }
  };

  return (
    <div
      ref={panelRef}
      className="relative w-full max-w-2xl mx-auto rounded-3xl bg-zoogle-surface-elevated border border-zoogle-border shadow-xs p-6 md:p-8"
    >
      <div className="flex justify-end absolute top-2 right-4">
        <button
          type="button"
          onClick={closeImageSearchPanel}
          className="text-sm rounded-full p-2 hover:bg-zoogle-bg/25 transition-colors duration-300 cursor-pointer"
          aria-label={t("imageSearch.close")}
        >
          <CloseIcon className="size-5 text-zoogle-text-secondary" />
        </button>
      </div>

      <h2 className="text-lg text-zoogle-text font-normal mb-6 text-center">
        {t("imageSearch.title")}
      </h2>
      <div
        className={`
          border-2 border-dashed rounded-2xl p-8 md:p-12 text-center transition-colors
          ${isDragging ? "border-zoogle-link bg-zoogle-bg" : "border-zoogle-border bg-zoogle-bg"}
        `}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
        aria-label={t("imageSearch.title")}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={handleFileChange}
          aria-hidden
        />
        <div className="flex flex-row items-center justify-center gap-4">
          <ImageIcon className="mx-auto" />
          <p className="text-zoogle-text-secondary text-sm md:text-base">
            {t("imageSearch.dragOrUpload")}{" "}
            <span className="text-zoogle-blue">{t("imageSearch.uploadLink")}</span>
          </p>
        </div>
      </div>
      <p className="text-zoogle-text-secondary text-sm my-4 text-center">{t("imageSearch.or")}</p>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="url"
          placeholder={t("imageSearch.pasteLink")}
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handlePasteSearch()}
          className="flex-1 min-w-0 rounded-full bg-zoogle-bg border border-zoogle-border px-4 py-3 text-sm text-zoogle-text placeholder:text-zoogle-text-secondary focus:border-zoogle-link focus:outline-none focus:ring-1 focus:ring-zoogle-link"
        />
        <button
          type="button"
          onClick={handlePasteSearch}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-zoogle-button-bg border border-zoogle-button-border text-zoogle-button-text px-5 py-3 text-sm font-medium hover:bg-zoogle-surface transition-colors shrink-0"
        >
          <SearchIcon className="size-4" />
          {t("imageSearch.search")}
        </button>
      </div>
    </div>
  );
}

export function ImageIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="59"
      height="45"
      viewBox="0 0 59 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M40.3332 13.747L1.58323 13.747L1.58323 43.4553L40.3332 43.4553L40.3332 13.747Z"
        className="ArIAXb"
      ></path>
      <path
        d="M40.3332 13.747L17.0832 13.747L17.0832 33.122L40.3332 33.122L40.3332 13.747Z"
        className="qOFLsb"
      ></path>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.614479 12.7783L6.74988 12.7783L6.74988 14.7158L2.55198 14.7158L2.55198 18.9137L0.614479 18.9137L0.614479 12.7783Z"
        fill="#BDC1C6"
      ></path>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M39.3644 42.4866L39.3644 38.2887L41.3019 38.2887L41.3019 44.4241L35.1665 44.4241L35.1665 42.4866L39.3644 42.4866Z"
        fill="#BDC1C6"
      ></path>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.614479 38.2887L2.55198 38.2887L2.55198 42.4866L6.74987 42.4866L6.74987 44.4241L0.614479 44.4241L0.614479 38.2887Z"
        fill="#BDC1C6"
      ></path>
      <path
        d="M19.6665 30.2531H58.4165L58.4165 0.544722H19.6665L19.6665 30.2531Z"
        fill="#AECBFA"
      ></path>
      <path
        d="M19.6665 21.8429L19.6665 30.2525L58.4168 30.2525L58.4168 19.7406L49.6667 12.4069C48.6234 11.5342 47.2931 11.0699 45.9272 11.1018C44.5614 11.1337 43.2547 11.6596 42.2542 12.5801L33.4166 20.7918L28.4166 17.2548C27.7332 16.7781 26.9013 16.5563 26.0684 16.6288C25.2354 16.7012 24.4554 17.0632 23.8666 17.6505L19.6665 21.8429Z"
        fill="#669DF6"
      ></path>
      <path
        d="M30.0056 12.9386C31.7315 12.9386 33.1306 11.5395 33.1306 9.8136C33.1306 8.08773 31.7315 6.68863 30.0056 6.68863C28.2798 6.68863 26.8807 8.08773 26.8807 9.8136C26.8807 11.5395 28.2798 12.9386 30.0056 12.9386Z"
        fill="#E8F0FE"
      ></path>
    </svg>
  );
}
