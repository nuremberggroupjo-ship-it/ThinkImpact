import React from "react";
import Link from "next/link";
import { getAllcategories } from "@/app/models/db/lib/services/consulting";

import { newCategory, newTraining } from "@/types";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { getAllTraining } from "@/app/models/db/lib/services/training";
export default async function Navbar() {
  const data: newCategory[] = await getAllcategories();
  const trainingData: newTraining[]= await getAllTraining()

  const categoriesrender = data.map((item) => item);

  return (
    <NavigationMenu viewport={false} className="text-[#00ADEE] focus:text-[#00ADEE]">
      <NavigationMenuList>
        ِ{/*Home*/}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link className={navigationMenuTriggerStyle()} href="/">
              Home
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        {/*Home*/}
        {/*Consulting*/}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Consulting</NavigationMenuTrigger>

          <NavigationMenuContent className="grid gap-3 p-4 md:w-[400px] lg:w-[250px]">
            {categoriesrender.map((item, index) => (
              <NavigationMenuLink asChild key={index}>
                <Link href={`/Consulting/${item.slug}`}>{item.category_name_en}</Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/*Consulting*/}
        {/*Training*/}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Training</NavigationMenuTrigger>

          <NavigationMenuContent className="grid gap-3 p-4 md:w-[400px] lg:w-[250px]">
            {trainingData.map((item, index) => (
              <NavigationMenuLink asChild key={index}>
                <Link href={`/Training/${item.id}`}>{item.name_en}</Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/*Training*/}
        {/*about*/}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link className={navigationMenuTriggerStyle()} href="/about">
              About
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        {/*about*/}
         {/*ourteam*/}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link className={navigationMenuTriggerStyle()} href="/ourTeam">
              Our Team
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        {/*ourteam*/}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
{
  /*home consulting training about ourteam*/
}
