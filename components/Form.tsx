"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Form() {
  const router = useRouter();
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "提交失败");
      }

      router.push(result.inviteUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "提交失败，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            姓名 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#294778] focus:border-transparent"
            placeholder="请输入您的姓名"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            公司名称 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#294778] focus:border-transparent"
            placeholder="请输入公司名称"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">职位</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#294778] focus:border-transparent"
            placeholder="请输入您的职位"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            邮箱 <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#294778] focus:border-transparent"
            placeholder="请输入邮箱地址"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            手机号 <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#294778] focus:border-transparent"
            placeholder="请输入手机号"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            预计参观日期 <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="visitDate"
            value={formData.visitDate}
            onChange={handleChange}
            required
            min={new Date().toISOString().split("T")[0]}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#294778] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            参观人数 <span className="text-red-500">*</span>
          </label>
          <select
            name="visitorCount"
            value={formData.visitorCount}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#294778] focus:border-transparent"
          >
            <option value="">请选择</option>
            <option value="1">1 人</option>
            <option value="2">2 人</option>
            <option value="3">3 人</option>
            <option value="4">4 人</option>
            <option value="5">5 人</option>
            <option value="6-10">6-10 人</option>
            <option value="10+">10 人以上</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">备注</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#294778] focus:border-transparent"
          placeholder="如有特殊需求请在此说明"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#294778] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#1e3a5f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "提交中..." : "提交参观申请"}
      </button>
    </form>
  );
}
