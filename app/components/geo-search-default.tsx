"use client";

import { useEffect, useRef } from "react";
import { useRouteLoaderData } from "react-router";
import { useSettingsStore } from "../store/settings";

const ROOT_ROUTE_ID = "root";
const SETTINGS_STORAGE_KEY = "zoogle-settings";

export function GeoSearchDefault() {
  const data = useRouteLoaderData(ROOT_ROUTE_ID) as { countryCode: string | null } | undefined;
  const applied = useRef(false);
  const setSearchEngine = useSettingsStore((s) => s.setSearchEngine);

  useEffect(() => {
    const countryCode = data?.countryCode ?? null;
    if (countryCode !== "CN" || applied.current) return;
    try {
      const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (raw != null) return;
      applied.current = true;
      setSearchEngine("bing");
    } catch {
    }
  }, [data?.countryCode, setSearchEngine]);

  return null;
}
