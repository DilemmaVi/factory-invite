"use client";

import { useI18n } from "./context";
import { localeNames, type Locale } from "./translations";

const locales: Locale[] = ["en", "zh", "es"];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="flex items-center gap-1 bg-white rounded-lg shadow-sm border border-gray-200 p-1">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => setLocale(loc)}
          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
            locale === loc
              ? "bg-[#294778] text-white"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          }`}
        >
          {localeNames[loc]}
        </button>
      ))}
    </div>
  );
}
