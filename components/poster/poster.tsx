"use client";

import React from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import postImage from "@/public/images/molto2.svg"

export default function PosterSection() {
  const locale = useLocale();
  const isArabic = locale === "ar";

  const heading = isArabic ? "أهلاً بكم في منصتنا" : "Welcome to Our Platform";
  const description = isArabic
    ? "نحن نقدم أفضل الحلول لتطوير أعمالكم الرقمية."
    : "We provide the best solutions to grow your digital business.";

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="w-full bg-[#125892] py-10 h-auto md:h-[400px] flex flex-col md:flex-row items-center justify-center px-6 md:px-16 gap-8"
    >
     
      <div className={`text-white md:w-1/2 ${isArabic ? "text-right" : "text-left"} text-center md:text-start`}>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
          {heading}
        </h1>
        <p className="text-lg md:text-xl opacity-90">{description}</p>
      </div>

 
      <div
        className={`md:w-1/2 flex justify-center ${
          isArabic ? "md:order-first" : ""
        }`}
      >
        <Image
          src={postImage}
          alt="Hero Poster"
          width={400}
          height={300}
          className="rounded-lg shadow-lg object-contain max-h-[300px]"
        />
      </div>
    </section>
  );
}
