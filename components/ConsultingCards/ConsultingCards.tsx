"use client";

import Link from "next/link";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import type { newCategory } from "@/types";
import { useLocale } from "next-intl";

interface ConsultingCardsProps {
  categories: newCategory[];
}

const allowedTitlesEn = ["Monitoring", "Evaluation", "Data Collection"];
const allowedTitlesAr = ["المتابعة", "التقييم", "جمع البيانات"];

export default function ConsultingCards({ categories }: ConsultingCardsProps) {
  const locale = useLocale();
  const isArabic = locale === "ar";

  const filteredCategories = categories
    .filter((cat) => {
      const title = isArabic
        ? cat.category_name_ar
        : cat.category_name_en;
      return isArabic
        ? allowedTitlesAr.includes(title)
        : allowedTitlesEn.includes(title);
    })
    .slice(0, 3);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-[80%] mx-auto pb-16">
      {filteredCategories.map((cat) => {
        const title = isArabic ? cat.category_name_ar : cat.category_name_en;
        const description = isArabic
          ? cat.description_ar || ""
          : cat.description_en || "";
        const href = `/Consulting/${cat.slug || cat.id}`;

        const truncatedDesc =
          description.length > 150
            ? description.slice(0, 150) + "..."
            : description;

        return (
          <Card
            key={cat.id}
            className={`shadow-lg border border-gray-300 rounded-lg p-8 hover:shadow-xl transition-shadow min-h-[320px] flex flex-col ${
              isArabic ? "text-right" : "text-left"
            }`}
            dir={isArabic ? "rtl" : "ltr"}
          >
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-center">
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{truncatedDesc}</p>
            </CardContent>
            <div className="mt-auto">
              <Link
                href={href}
                className="block text-center w-full bg-[#125892] text-white py-2 rounded hover:bg-blue-700 transition"
              >
                {isArabic ? "اعرف المزيد" : "Learn More"}
              </Link>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
