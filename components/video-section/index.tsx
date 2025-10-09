"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import demo from "@/public/images/molto2.svg";

export default function BusinessConsultingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textOverlayRef = useRef<HTMLDivElement>(null);

  const [isLoaded, setIsLoaded] = useState(false);

  // منع السّكرول أثناء التحميل
  useEffect(() => {
    if (!isLoaded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;

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
  }, [isLoaded]);

  useEffect(() => {
    const handleScroll = () => {
      if (!videoRef.current || !overlayRef.current || !textOverlayRef.current) return;

      const rect = videoRef.current.getBoundingClientRect();
      const videoBottom = rect.bottom;
      const viewportHeight = window.innerHeight;

      const fadeStart = viewportHeight + 140;

      let imageOpacity = 0;
      if (videoBottom >= fadeStart) {
        imageOpacity = 0;
      } else if (videoBottom <= viewportHeight) {
        imageOpacity = 1;
      } else {
        const linearProgress = 1 - (videoBottom - viewportHeight) / (fadeStart - viewportHeight);
        imageOpacity = Math.pow(linearProgress, 15);
      }

      gsap.to(overlayRef.current, {
        opacity: imageOpacity,
        duration: 0.2,
        ease: "power1.out",
        overwrite: "auto",
      });

      let textOpacity = 0;
      if (imageOpacity < 0.99) {
        textOpacity = 0;
      } else {
        const textFadeStart = viewportHeight - 50;
        const textFadeEnd = viewportHeight - 250;

        if (videoBottom <= textFadeStart && videoBottom >= textFadeEnd) {
          textOpacity = 1;
        } else if (videoBottom > textFadeStart) {
          const progress = 1 - (videoBottom - textFadeStart) / 100;
          textOpacity = Math.min(Math.max(progress, 0), 1);
        } else if (videoBottom < textFadeEnd) {
          const progress = (videoBottom - (textFadeEnd - 100)) / 100;
          textOpacity = Math.min(Math.max(progress, 0), 1);
        } else {
          textOpacity = 1;
        }
      }

      gsap.to(textOverlayRef.current, {
        opacity: textOpacity,
        y: (1 - textOpacity) * 50,
        duration: 0.2,
        ease: "power1.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* تحميل الصورة بشكل مخفي مع تعيين isLoaded عند التحميل */}
      <div className="hidden">
        <Image
          src={demo}
          alt="Preload Image"
          width={1}
          height={1}
          priority
          loading="eager"
          onLoad={() => setIsLoaded(true)}
        />
      </div>

      {/* صورة الـ overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-9 pointer-events-none"
        style={{ opacity: 0 }}
      >
        <Image
          src={demo}
          alt="Overlay Image"
          fill
          className="object-cover w-full h-full"
          priority
          loading="eager"
        />
      </div>

      {/* النص اللي يتحرك */}
      <div
        ref={textOverlayRef}
        className="fixed inset-0 z-20 flex items-center justify-center pointer-events-none opacity-0"
        style={{ transform: "translateY(50px)" }}
      >
        <h2 className="text-blue-900 text-5xl md:text-6xl font-extrabold   px-8 py-6 rounded-lg max-w-4xl text-center">
          Empower Your Business with Expert Consulting
        </h2>
      </div>

      {/* قسم الفيديو */}
      <section
        ref={sectionRef}
        className="relative w-full h-screen overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/50 z-5" />
        <video
          ref={videoRef}
          src="/vedios/test.mp4"
          autoPlay
          loop            
          muted
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* نص وزرار */}
        <div className="absolute inset-0 z-8 flex flex-col items-center justify-center text-center px-6">
          <div className="hero-text text-white text-4xl md:text-6xl font-bold mb-8 opacity-0 drop-shadow-lg">
            Transform Your Vision Into Reality
          </div>
          <Button className="hero-button px-8 py-4 text-lg rounded-full bg-blue-700 hover:bg-blue-800 text-white opacity-0 shadow-lg transition">
            Get Started Now
          </Button>
        </div>
      </section>
    </>
  );
}
