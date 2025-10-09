"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const toggleLocale = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    router.replace(`/${newLocale}${pathname}`);
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
