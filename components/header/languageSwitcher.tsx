"use client";

import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const locale = useLocale();

  const toggleLocale = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    window.location.href = `/${newLocale}${pathname}`;
  };

  return (
    <button
      onClick={toggleLocale}
      className="px-3 py-1 rounded-lg border hover:bg-gray-100"
    >
      {locale === "en" ? "العربية" : "English"}
    </button>
  );
}
