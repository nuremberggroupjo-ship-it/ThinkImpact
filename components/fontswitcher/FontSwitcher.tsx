"use client";

import { useLocale } from "next-intl";
import { useEffect } from "react";
import { Inter, Cairo } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const cairo = Cairo({ subsets: ["arabic"], weight: ["400", "700"] });

export default function FontSwitcher({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  const isArabic = locale === "ar";

  useEffect(() => {
    const classToAdd = isArabic ? cairo.className : inter.className;

    document.documentElement.classList.remove(inter.className, cairo.className);
    document.documentElement.classList.add(classToAdd);
  }, [isArabic]);

  return children;
}
