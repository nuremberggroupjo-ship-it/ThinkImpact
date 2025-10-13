"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import demoImage from "@/public/images/molto2.svg";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Banner } from "@/components/banner/banner";
import { Counter } from "@/components/counter";
import Footer from "../ui/footer";

import { getAllcategories } from "@/app/models/db/lib/services/consulting";
import type { newCategory } from "@/types";
import { useLocale } from "next-intl";

const allowedTitlesEn = ["Monitoring", "Evaluation", "Data Collection"];
const allowedTitlesAr = ["المتابعة", "التقييم", "جمع البيانات"];

const mockBanners = [
  {
    id: "1",
    alt: "Business Consulting 1",
    image: demoImage,
    description_en: "Unlock your business potential with expert strategies.",
    description_ar: "اكتشف إمكانيات عملك مع استراتيجيات الخبراء.",
  },
  {
    id: "2",
    alt: "Business Consulting 2",
    image: demoImage,
    description_en: "Achieve more with our custom business solutions.",
    description_ar: "حقق المزيد مع حلولنا المخصصة.",
  },
];

const mockStats = [
  { label: "Clients", count: 120 },
  { label: "Projects Completed", count: 75 },
  { label: "Years of Experience", count: 10, suffix: "+" },
];

export default function SimplifiedConsultingSection() {
  const [categories, setCategories] = useState<newCategory[]>([]);
  const locale = useLocale();
  const isArabic = locale === "ar";

  useEffect(() => {
    async function fetchCategories() {
      const data = await getAllcategories();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  return (
    <section className="bg-white h-fit flex flex-col justify-end space-y-12">
     {/* <Banner banners={mockBanners} />*/}
      <Counter stats={mockStats} />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-[80%] mx-auto pb-16">
        {categories
          .filter((cat) => {
            const title = isArabic
              ? cat.category_name_ar
              : cat.category_name_en;
            return isArabic
              ? allowedTitlesAr.includes(title)
              : allowedTitlesEn.includes(title);
          })
          .slice(0, 3)
          .map((cat) => {
            const title = isArabic
              ? cat.category_name_ar
              : cat.category_name_en;
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

  
    </section>
  );
}
