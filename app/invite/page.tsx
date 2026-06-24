"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import InviteCard from "@/components/InviteCard";

function InviteContent() {
  const searchParams = useSearchParams();

  const name = searchParams.get("name") || "";
  const company = searchParams.get("company") || "";
  const position = searchParams.get("position") || "";
  const date = searchParams.get("date") || "";
  const count = searchParams.get("count") || "";

  if (!name || !company || !date) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">邀请函参数不完整</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <InviteCard
        name={name}
        company={company}
        position={position}
        date={date}
        count={count}
      />
    </div>
  );
}

export default function InvitePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4">
        <Suspense
          fallback={
            <div className="text-center py-20">
              <p className="text-gray-500">加载中...</p>
            </div>
          }
        >
          <InviteContent />
        </Suspense>
      </div>
    </main>
  );
}
