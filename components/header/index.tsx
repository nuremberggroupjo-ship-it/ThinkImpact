
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {AppName } from "@/lib/constants";
import ModeToggle from "./modetoggle";
import Menu from "./menu";
import Navbar from "./navbar";
import LanguageSwitcher from "./languageSwitcher"; 

export default async function Header() {
  return (
    <header className="W-full h-20 flex items-center justify-between px-4 border-b border-b-slate-200 z-50 bg-white ">
    
      <Link href="/"><Image src="/images/logo.png" alt={`${AppName} logo`} width={100} height={200} priority={true}/></Link>
      <div className="hidden md:block"><Navbar/></div>
      <div  className="hidden md:flex"><ModeToggle   /><LanguageSwitcher/>  </div>
    
      <Menu /> 
    </header>
  );
}
