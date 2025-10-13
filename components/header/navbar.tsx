"use client";

import React from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

import { newCategory, newTraining } from "@/types";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

type Props = {
  categories: newCategory[];
  trainingData: newTraining[];
};

export default function Navbar({ categories, trainingData }: Props) {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const isArabic = locale === "ar";

  const menuItems = [
    {
      type: "link",
      href: "/",
      label: t("home"),
      key: "home",
    },
    {
      type: "dropdown",
      label: t("consulting"),
      key: "consulting",
      content: categories.map((item) => (
        <NavigationMenuLink asChild key={item.slug}>
          <Link href={`/Consulting/${item.slug}`}>
            {isArabic ? item.category_name_ar : item.category_name_en}
          </Link>
        </NavigationMenuLink>
      )),
    },
    {
      type: "dropdown",
      label: t("training"),
      key: "training",
      content: trainingData.map((item) => (
        <NavigationMenuLink asChild key={item.id}>
          <Link href={`/Training/${item.id}`}>
            {isArabic ? item.name_ar : item.name_en}
          </Link>
        </NavigationMenuLink>
      )),
    },
    {
      type: "link",
      href: "/about",
      label: t("about"),
      key: "about",
    },
    {
      type: "link",
      href: "/ourTeam",
      label: t("ourTeam"),
      key: "ourTeam",
    },
  ];

  const finalMenu = isArabic ? [...menuItems].reverse() : menuItems;

  return (
    <NavigationMenu
      viewport={false}
      className="text-[#00ADEE] focus:text-[#00ADEE]"
      style={{ direction: isArabic ? "rtl" : "ltr" }}
    >
      <NavigationMenuList className="flex-row">
        {finalMenu.map((item) => {
          if (item.type === "link") {
            return (
              <NavigationMenuItem key={item.key}>
                <NavigationMenuLink asChild>
                  <Link className={navigationMenuTriggerStyle()} href={item.href ?? "/"}>
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          } else if (item.type === "dropdown") {
            return (
              <NavigationMenuItem key={item.key}>
                <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                <NavigationMenuContent
                  className={`grid gap-3 p-4 md:w-[400px] lg:w-[250px] ${
                    isArabic ? "text-right" : "text-left"
                  }`}
                >
                  {item.content}
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          }
          return null;
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
