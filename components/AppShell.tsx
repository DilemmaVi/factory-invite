"use client";

import { useEffect, useState, type ReactNode } from "react";
import { I18nProvider, getLocaleFromCountry, type Locale } from "@/lib/i18n";

export default function AppShell({ children }: { children: ReactNode }) {
  const [defaultLocale, setDefaultLocale] = useState<Locale | undefined>(undefined);

  useEffect(() => {
    async function detectLocale() {
      try {
        const response = await fetch("/api/geo");
        const data = await response.json();
        const locale = getLocaleFromCountry(data.country);
        setDefaultLocale(locale);
      } catch {
        setDefaultLocale("en");
      }
    }

    const saved = localStorage.getItem("cgch-locale");
    if (saved && (saved === "zh" || saved === "en" || saved === "es")) {
      setDefaultLocale(saved);
    } else {
      detectLocale();
    }
  }, []);

  return <I18nProvider defaultLocale={defaultLocale}>{children}</I18nProvider>;
}
