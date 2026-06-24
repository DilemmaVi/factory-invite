"use client";

import { useRef } from "react";
import { toPng } from "html-to-image";
import { useI18n } from "@/lib/i18n";
import { format, parseISO } from "date-fns";
import { zhCN, enUS, es } from "date-fns/locale";
import type { Locale } from "date-fns";
import { QRCodeSVG } from "qrcode.react";

interface InviteCardProps {
  name: string;
  company: string;
  date: string;
  count: string;
  inviteUrl?: string;
}

const localeMap: Record<string, Locale> = {
  zh: zhCN,
  en: enUS,
  es: es,
};

const dateFormatMap: Record<string, string> = {
  zh: "yyyy/M/d",
  en: "M/d/yyyy",
  es: "d/M/yyyy",
};

function formatDate(dateStr: string, locale: string): string {
  if (!dateStr) return "";
  try {
    const date = parseISO(dateStr);
    const dateLocale = localeMap[locale] || enUS;
    const formatStr = dateFormatMap[locale] || "yyyy-MM-dd";
    return format(date, formatStr, { locale: dateLocale });
  } catch {
    return dateStr;
  }
}

function InviteCardInner({ name, company, date, count, inviteUrl }: InviteCardProps & { forDownload?: boolean }) {
  const { t, locale } = useI18n();

  return (
    <>
      <div
        className="px-10 py-10 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0f2439 0%, #1e3a5f 40%, #294778 70%, #1e3a5f 100%)" }}
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-40 h-40 border border-white rounded-full -translate-x-20 -translate-y-20"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 border border-white rounded-full -translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 border border-white rounded-full translate-x-24 translate-y-24"></div>
        </div>

        <div className="relative z-10">
          <div className="flex justify-center mb-5">
            <img src="/logo.jpeg" alt="CGCH Logo" className="h-16 object-contain" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-widest mb-1">{t("invite.title")}</h1>
          {t("invite.titleEn") && (
            <p className="text-blue-200/80 text-sm tracking-wider uppercase">{t("invite.titleEn")}</p>
          )}
          <div className="mt-4 flex justify-center">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
          </div>
        </div>
      </div>

      <div className="px-10 py-8">
        <div className="text-center mb-8">
          <p className="text-xl text-gray-800 font-light">
            {t("invite.dear")}
          </p>
          <p className="text-2xl font-bold text-[#1e3a5f] mt-1">{name}</p>
          <p className="text-sm text-gray-400 mt-2 tracking-wide">{company}</p>
        </div>

        <div className="relative mb-8">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#294778] to-blue-200 rounded-full"></div>
          <div className="pl-6">
            <p className="text-gray-600 leading-loose text-base">
              {t("invite.message")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {date && (
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-100">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-[#294778] rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">{t("invite.visitDate")}</p>
              </div>
              <p className="font-semibold text-gray-800 text-lg">{formatDate(date, locale)}</p>
            </div>
          )}

          {count && (
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-100">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-[#294778] rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">{t("invite.visitorCount")}</p>
              </div>
              <p className="font-semibold text-gray-800 text-lg">{count} <span className="text-sm font-normal text-gray-500">{t("form.persons")}</span></p>
            </div>
          )}
        </div>

        <div className="border-t border-gray-100 pt-6 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">{t("invite.contactUs")}</p>
            <p className="text-gray-800 font-medium">{t("invite.company")}</p>
            <p className="text-gray-400 text-sm">{t("invite.companyEn")}</p>
          </div>
          {inviteUrl && (
            <div className="flex flex-col items-center">
              <QRCodeSVG value={inviteUrl} size={80} level="M" />
              <p className="text-xs text-gray-400 mt-1">{t("invite.scanToVerify")}</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-gray-50 px-10 py-4 text-center border-t border-gray-100">
        <p className="text-xs text-gray-400">
          {t("invite.footer")}
        </p>
      </div>
    </>
  );
}

export default function InviteCard({ name, company, date, count, inviteUrl }: InviteCardProps) {
  const { t } = useI18n();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });

      const link = document.createElement("a");
      link.download = `invitation_${company}_${name}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        ref={cardRef}
        className="w-full max-w-[600px] bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200"
        style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif" }}
      >
        <InviteCardInner name={name} company={company} date={date} count={count} inviteUrl={inviteUrl} />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        <button
          onClick={handleDownload}
          className="bg-[#294778] text-white py-3 px-8 rounded-xl font-medium hover:bg-[#1e3a5f] transition-all flex items-center shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          {t("invite.download")}
        </button>

        <button
          onClick={() => {
            const url = window.location.href;
            const text = `${t("invite.shareMessage")} ${url}`;
            window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
          }}
          className="bg-green-600 text-white py-3 px-8 rounded-xl font-medium hover:bg-green-700 transition-all flex items-center shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp
        </button>
      </div>
    </div>
  );
}
