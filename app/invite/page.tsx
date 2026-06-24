"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import InviteCard from "@/components/InviteCard";
import LanguageSwitcher from "@/lib/i18n/LanguageSwitcher";
import { useI18n } from "@/lib/i18n";

function InviteContent() {
  const searchParams = useSearchParams();
  const { t } = useI18n();

  const name = searchParams.get("name") || "";
  const company = searchParams.get("company") || "";
  const date = searchParams.get("date") || "";
  const count = searchParams.get("count") || "";

  if (!name || !company) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">{t("invite.invalid")}</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <InviteCard
        name={name}
        company={company}
        date={date}
        count={count}
      />
    </div>
  );
}

export default function InvitePage() {
  const { t } = useI18n();

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-end pt-6">
          <LanguageSwitcher />
        </div>
        <Suspense
          fallback={
            <div className="text-center py-20">
              <p className="text-gray-500">{t("invite.loading")}</p>
            </div>
          }
        >
          <InviteContent />
        </Suspense>
      </div>
    </main>
  );
}
