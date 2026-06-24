"use client";

import { useRef } from "react";
import { toPng } from "html-to-image";

interface InviteCardProps {
  name: string;
  company: string;
  position?: string;
  date: string;
  count: string;
}

export default function InviteCard({ name, company, position, date, count }: InviteCardProps) {
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
      link.download = `邀请函_${company}_${name}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("下载失败:", err);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        ref={cardRef}
        className="w-full max-w-[600px] bg-white shadow-2xl rounded-lg overflow-hidden"
        style={{ fontFamily: "serif" }}
      >
        {/* Header */}
        <div
          className="px-8 py-6 text-center"
          style={{ background: "linear-gradient(135deg, #294778 0%, #1e3a5f 100%)" }}
        >
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
              <img
                src="https://bkimg.cdn.bcebos.com/pic/2934349b033b5bb5d5e53ea939d3d539b600bcb2?x-bce-process=image/format,f_auto/quality,Q_70/resize,m_lfit,limit_1,w_536"
                alt="CGCH Logo"
                className="w-16 h-16 object-contain rounded-full"
              />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-wider">工厂参观邀请函</h1>
          <p className="text-blue-200 mt-2 text-sm">Factory Visit Invitation</p>
        </div>

        {/* Body */}
        <div className="px-8 py-6">
          <div className="text-center mb-6">
            <p className="text-lg text-gray-800">
              尊敬的 <span className="font-bold text-[#294778]">{name}</span> 先生/女士：
            </p>
            {position && <p className="text-sm text-gray-500 mt-1">{company} · {position}</p>}
            {!position && <p className="text-sm text-gray-500 mt-1">{company}</p>}
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <p className="text-gray-700 leading-relaxed text-center">
              我们诚挚地邀请您参观中辉绿建集装箱有限公司工厂，
              <br />
              了解我们的生产流程和产品质量。
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#294778] rounded-full flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">参观日期</p>
                <p className="font-medium text-gray-800">{date}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#294778] rounded-full flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">参观人数</p>
                <p className="font-medium text-gray-800">{count} 人</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-500 mb-2">联系我们：</p>
            <p className="text-gray-700">中辉绿建集装箱有限公司</p>
            <p className="text-gray-700">CGCH Container Co., Ltd.</p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 text-center">
          <p className="text-xs text-gray-400">
            此邀请函由系统自动生成，如有疑问请联系业务人员
          </p>
        </div>
      </div>

      <button
        onClick={handleDownload}
        className="mt-6 bg-[#294778] text-white py-3 px-8 rounded-lg font-medium hover:bg-[#1e3a5f] transition-colors flex items-center"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        下载邀请函
      </button>

      <div
        ref={hiddenCardRef}
        className="fixed left-[-9999px] top-0 w-[600px] bg-white"
        style={{ fontFamily: "serif" }}
      >
        <div
          className="px-8 py-6 text-center"
          style={{ background: "linear-gradient(135deg, #294778 0%, #1e3a5f 100%)" }}
        >
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
              <img
                src="https://bkimg.cdn.bcebos.com/pic/2934349b033b5bb5d5e53ea939d3d539b600bcb2?x-bce-process=image/format,f_auto/quality,Q_70/resize,m_lfit,limit_1,w_536"
                alt="CGCH Logo"
                className="w-16 h-16 object-contain rounded-full"
              />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-wider">工厂参观邀请函</h1>
          <p className="text-blue-200 mt-2 text-sm">Factory Visit Invitation</p>
        </div>

        <div className="px-8 py-6">
          <div className="text-center mb-6">
            <p className="text-lg text-gray-800">
              尊敬的 <span className="font-bold text-[#294778]">{name}</span> 先生/女士：
            </p>
            {position && <p className="text-sm text-gray-500 mt-1">{company} · {position}</p>}
            {!position && <p className="text-sm text-gray-500 mt-1">{company}</p>}
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <p className="text-gray-700 leading-relaxed text-center">
              我们诚挚地邀请您参观中辉绿建集装箱有限公司工厂，
              <br />
              了解我们的生产流程和产品质量。
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#294778] rounded-full flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">参观日期</p>
                <p className="font-medium text-gray-800">{date}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#294778] rounded-full flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">参观人数</p>
                <p className="font-medium text-gray-800">{count} 人</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-500 mb-2">联系我们：</p>
            <p className="text-gray-700">中辉绿建集装箱有限公司</p>
            <p className="text-gray-700">CGCH Container Co., Ltd.</p>
          </div>
        </div>

        <div className="bg-gray-50 px-8 py-4 text-center">
          <p className="text-xs text-gray-400">
            此邀请函由系统自动生成，如有疑问请联系业务人员
          </p>
        </div>
      </div>
    </div>
  );
}
