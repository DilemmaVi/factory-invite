"use client";

import { useRef } from "react";
import { toPng } from "html-to-image";
import { useI18n } from "@/lib/i18n";

interface InviteCardProps {
  name: string;
  company: string;
  date: string;
  count: string;
}

function InviteCardInner({ name, company, date, count }: InviteCardProps & { forDownload?: boolean }) {
  const { t } = useI18n();

  return (
    <>
      <div
        className="px-8 py-8 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #294778 50%, #1e3a5f 100%)" }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-32 h-32 border-2 border-white rounded-full -translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 border-2 border-white rounded-full translate-x-24 translate-y-24"></div>
        </div>

        <div className="relative z-10">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
              <img src="/logo.jpeg" alt="CGCH Logo" className="w-16 h-16 object-contain rounded-full" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-wider">{t("invite.title")}</h1>
          {t("invite.titleEn") && (
            <p className="text-blue-200 mt-2 text-sm">{t("invite.titleEn")}</p>
          )}
        </div>
      </div>

      <div className="px-8 py-6">
        <div className="text-center mb-6">
          <p className="text-lg text-gray-800">
            {t("invite.dear")} <span className="font-bold text-[#294778]">{name}</span>
            {t("invite.suffix")}
          </p>
          <p className="text-sm text-gray-500 mt-1">{company}</p>
        </div>

        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-6 mb-6 border border-gray-100">
          <p className="text-gray-700 leading-relaxed text-center">
            {t("invite.message")}
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {date && (
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#294778] rounded-full flex items-center justify-center mr-4 shadow-sm">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">{t("invite.visitDate")}</p>
                <p className="font-medium text-gray-800">{date}</p>
              </div>
            </div>
          )}

          {count && (
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#294778] rounded-full flex items-center justify-center mr-4 shadow-sm">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">{t("invite.visitorCount")}</p>
                <p className="font-medium text-gray-800">{count}</p>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 pt-4">
          <p className="text-sm text-gray-500 mb-2">{t("invite.contactUs")}：</p>
          <p className="text-gray-700 font-medium">{t("invite.company")}</p>
          <p className="text-gray-500 text-sm">{t("invite.companyEn")}</p>
        </div>
      </div>

      <div className="bg-gray-50 px-8 py-4 text-center border-t border-gray-100">
        <p className="text-xs text-gray-400">
          {t("invite.footer")}
        </p>
      </div>
    </>
  );
}

export default function InviteCard({ name, company, date, count }: InviteCardProps) {
  const { t } = useI18n();
  const cardRef = useRef<HTMLDivElement>(null);
  const hiddenCardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!hiddenCardRef.current) return;

    try {
      const dataUrl = await toPng(hiddenCardRef.current, {
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
        className="w-full max-w-[600px] bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100"
        style={{ fontFamily: "serif" }}
      >
        <InviteCardInner name={name} company={company} date={date} count={count} />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <button
          onClick={handleDownload}
          className="bg-[#294778] text-white py-3 px-8 rounded-xl font-medium hover:bg-[#1e3a5f] transition-all flex items-center shadow-lg hover:shadow-xl"
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
          className="bg-green-600 text-white py-3 px-8 rounded-xl font-medium hover:bg-green-700 transition-all flex items-center shadow-lg hover:shadow-xl"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp
        </button>
      </div>

      <div
        ref={hiddenCardRef}
        className="fixed left-[-9999px] top-0 w-[600px] bg-white"
        style={{ fontFamily: "serif" }}
      >
        <InviteCardInner name={name} company={company} date={date} count={count} forDownload />
      </div>
    </div>
  );
}
