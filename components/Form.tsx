"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { zhCN, enUS, es } from "date-fns/locale";
import type { Locale } from "date-fns";
import { useI18n } from "@/lib/i18n";

const localeMap: Record<string, Locale> = {
  zh: zhCN,
  en: enUS,
  es: es,
};

export default function Form() {
  const router = useRouter();
  const { t, locale } = useI18n();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    visitDate: "",
    visitorCount: "",
    notes: "",
  });

  const defaultCountry = locale === "zh" ? "CN" : locale === "es" ? "MX" : "US";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (value: string | undefined) => {
    setFormData({ ...formData, phone: value || "" });
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const formatted = date.toISOString().split("T")[0];
      setFormData({ ...formData, visitDate: formatted });
    } else {
      setFormData({ ...formData, visitDate: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.name || !formData.company || !formData.email || !formData.visitDate || !formData.visitorCount) {
      setError(t("error.requiredFields"));
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError(t("form.error.emailInvalid"));
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || t("form.error.submitFailed"));
      }

      router.push(result.inviteUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("form.error.submitFailed"));
    } finally {
      setLoading(false);
    }
  };

  const label = (text: string, required: boolean) => (
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {text}{" "}
      {required ? (
        <span className="text-red-500 text-xs">({t("form.required")})</span>
      ) : (
        <span className="text-gray-400 text-xs">({t("form.optional")})</span>
      )}
    </label>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {label(t("form.name"), true)}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#294778] focus:border-transparent"
            placeholder={t("form.placeholder.name")}
          />
        </div>

        <div>
          {label(t("form.company"), true)}
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#294778] focus:border-transparent"
            placeholder={t("form.placeholder.company")}
          />
        </div>

        <div>
          {label(t("form.email"), true)}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#294778] focus:border-transparent"
            placeholder={t("form.placeholder.email")}
          />
        </div>

        <div>
          {label(t("form.phone"), false)}
          <PhoneInput
            international
            defaultCountry={defaultCountry}
            value={formData.phone}
            onChange={handlePhoneChange}
            className="phone-input-container"
            placeholder={t("form.placeholder.phone")}
          />
        </div>

        <div>
          {label(t("form.visitDate"), true)}
          <DatePicker
            selected={formData.visitDate ? new Date(formData.visitDate + "T00:00:00") : null}
            onChange={handleDateChange}
            minDate={new Date()}
            locale={localeMap[locale] || "en-US"}
            placeholderText={t("form.placeholder.visitDate")}
            dateFormat="yyyy-MM-dd"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#294778] focus:border-transparent"
            wrapperClassName="w-full"
            required
          />
        </div>

        <div>
          {label(t("form.visitorCount"), true)}
          <div className="grid grid-cols-4 gap-2">
            {[
              { value: "1", label: "1" },
              { value: "2", label: "2" },
              { value: "3", label: "3" },
              { value: "4", label: "4" },
              { value: "5", label: "5" },
              { value: "6-10", label: "6-10" },
              { value: "10+", label: "10+" },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFormData({ ...formData, visitorCount: option.value })}
                className={`py-2.5 px-3 rounded-lg border-2 font-medium transition-all ${
                  formData.visitorCount === option.value
                    ? "border-[#294778] bg-[#294778] text-white shadow-md"
                    : "border-gray-200 text-gray-600 hover:border-[#294778] hover:text-[#294778]"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <input type="hidden" name="visitorCount" value={formData.visitorCount} required />
        </div>
      </div>

      <div>
        {label(t("form.notes"), false)}
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#294778] focus:border-transparent"
          placeholder={t("form.placeholder.notes")}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#294778] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#1e3a5f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? t("form.submitting") : t("form.submit")}
      </button>
    </form>
  );
}
