"use client";

import Form from "@/components/Form";
import LanguageSwitcher from "@/lib/i18n/LanguageSwitcher";
import { useI18n } from "@/lib/i18n";

export default function Home() {
  const { t } = useI18n();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-end mb-6">
          <LanguageSwitcher />
        </div>

        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img src="/logo.jpeg" alt="CGCH Logo" className="h-16 object-contain" />
          </div>
          <h1 className="text-3xl font-bold text-[#1e3a5f] mb-2">{t("home.title")}</h1>
          <p className="text-gray-600 font-medium">{t("home.subtitle")}</p>
          <p className="text-sm text-gray-400 mt-1">{t("home.subtitle2")}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8">
            <Form />
          </div>
        </div>

        <div className="text-center mt-6 text-sm text-gray-400">
          <p>{t("home.note")}</p>
        </div>
      </div>
    </main>
  );
}
