import React from "react";
import Link from "next/link";
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
export default function Navbar() {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
                      {/*Home*/}
                      <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link className={navigationMenuTriggerStyle()} href="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        {/*Home*/}

                {/*Consulting*/}

        <NavigationMenuItem>
          <NavigationMenuTrigger>Consulting</NavigationMenuTrigger>

          <NavigationMenuContent>
            <NavigationMenuLink asChild>
              <Link href="/docs">1</Link>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/*Consulting*/}
        {/*Training*/}

        <NavigationMenuItem>
          <NavigationMenuTrigger>Training</NavigationMenuTrigger>

          <NavigationMenuContent>
            <NavigationMenuLink asChild>
              <Link href="/docs">1</Link>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/*Training*/}
                 {/*about*/}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link  className={navigationMenuTriggerStyle()} href="/about">About</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        {/*about*/}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
{/*home consulting training about ourteam*/}