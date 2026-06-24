"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useI18n } from "@/lib/i18n";

export default function Form() {
  const router = useRouter();
  const { t, locale } = useI18n();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    position: "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.name || !formData.company || !formData.email) {
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
          {label(t("form.position"), false)}
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#294778] focus:border-transparent"
            placeholder={t("form.placeholder.position")}
          />
        </div>

        <div>
          {label(t("form.visitDate"), false)}
          <input
            type="date"
            name="visitDate"
            value={formData.visitDate}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#294778] focus:border-transparent"
          />
        </div>

        <div>
          {label(t("form.visitorCount"), false)}
          <select
            name="visitorCount"
            value={formData.visitorCount}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#294778] focus:border-transparent"
          >
            <option value="">{t("form.select")}</option>
            <option value="1">1 {t("form.person")}</option>
            <option value="2">2 {t("form.persons")}</option>
            <option value="3">3 {t("form.persons")}</option>
            <option value="4">4 {t("form.persons")}</option>
            <option value="5">5 {t("form.persons")}</option>
            <option value="6-10">6-10 {t("form.persons")}</option>
            <option value="10+">{t("form.10plus")}</option>
          </select>
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
