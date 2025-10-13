"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function VideoHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const q = gsap.utils.selector(sectionRef);
    const tl = gsap.timeline();

    tl.fromTo(
      q(".hero-text"),
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    ).fromTo(
      q(".hero-button"),
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, ease: "linear" },
      "-=0.5"
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
    >
      <div className="absolute inset-0 bg-black/50 z-5" />
      <video
        src="/vedios/test.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 z-8 flex flex-col items-center justify-center text-center px-6">
        <div className="hero-text text-white text-4xl md:text-6xl font-bold mb-8 opacity-0 drop-shadow-lg">
          Transform Your Vision Into Reality
        </div>
        <Link href="/about">
          <Button className="hero-button px-8 py-4 text-lg rounded-full bg-blue-700 hover:bg-blue-800 text-white opacity-0 shadow-lg transition">
            Get Started Now
          </Button>
        </Link>
      </div>
    </section>
  );
}
