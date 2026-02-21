const SITE_ORIGIN =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SITE_ORIGIN) || "";

const SITE_NAME = "Zoogle";

export const DEFAULT_TITLE = "Zoogle";

export const DEFAULT_DESCRIPTION =
  "Zoogle is the search engine of Zootopia. Search the animal kingdom—webpages, images, and more. Find what you need across Savanna Central, Tundratown, Sahara Square, and all districts.";

export const DEFAULT_KEYWORDS = [
  "Zoogle",
  "search",
  "Zootopia",
  "animal kingdom",
  "Savanna Central",
  "search engine",
  "Zoogle Search",
  "Zootopia search",
].join(", ");

export const DEFAULT_OG_IMAGE = SITE_ORIGIN
  ? `${SITE_ORIGIN}/static/zoogle-og.png`
  : "/favicon.svg";

export function getCanonicalUrl(path = "/") {
  return SITE_ORIGIN ? `${SITE_ORIGIN}${path}` : "";
}

export function getHomeJsonLd() {
  const url = SITE_ORIGIN || "https://zoogle.top";
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url,
        name: SITE_NAME,
        description: DEFAULT_DESCRIPTION,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${url}/?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${url}/#organization`,
        name: SITE_NAME,
        url,
        logo: { "@type": "ImageObject", url: `${url}/favicon.svg` },
      },
    ],
  };
}

/** React Router MetaDescriptor 兼容 */
type MetaDescriptor =
  | { title: string }
  | { name: string; content: string }
  | { property: string; content: string }
  | { "script:ld+json": Record<string, unknown> }
  | { tagName: "link"; rel: string; href: string };

/** 首页完整 meta 列表（title / description / keywords / OG / Twitter / canonical / JSON-LD） */
export function getHomeMeta(): MetaDescriptor[] {
  const canonical = getCanonicalUrl("/");
  const ogImage =
    DEFAULT_OG_IMAGE.startsWith("http")
      ? DEFAULT_OG_IMAGE
      : canonical
        ? `${canonical.replace(/\/$/, "")}${DEFAULT_OG_IMAGE}`
        : "";

  const list: MetaDescriptor[] = [
    { title: DEFAULT_TITLE },
    { name: "description", content: DEFAULT_DESCRIPTION },
    { name: "keywords", content: DEFAULT_KEYWORDS },
    { name: "robots", content: "index, follow" },
    { name: "author", content: SITE_NAME },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:title", content: `${DEFAULT_TITLE} - Search the animal kingdom` },
    { property: "og:description", content: DEFAULT_DESCRIPTION },
    { property: "twitter:card", content: "summary_large_image" },
    { property: "twitter:title", content: `${DEFAULT_TITLE} - Search the animal kingdom` },
    { property: "twitter:description", content: DEFAULT_DESCRIPTION },
  ];

  if (canonical) {
    list.push({ property: "og:url", content: canonical });
    list.push({ tagName: "link", rel: "canonical", href: canonical });
  }
  if (ogImage) {
    list.push({ property: "og:image", content: ogImage });
    list.push({ property: "twitter:image", content: ogImage });
  }

  list.push({ "script:ld+json": getHomeJsonLd() });
  return list;
}
