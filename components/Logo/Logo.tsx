"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import Image from "next/image";
import { AppName } from "@/lib/constants";

const phrases = ["Think Impact"];

const Logo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [chars, setChars] = useState<string[]>([]);

  useEffect(() => {
    setChars(phrases[0].split(""));
  }, []);

  const handleMouseEnter = () => {
    const letters = containerRef.current?.querySelectorAll(".char");
    if (!letters) return;

    gsap.killTweensOf(letters);

    gsap.set(letters, { y: "-2em", opacity: 0 });

    gsap.to(letters, {
      y: "0em",
      opacity: 1,
      stagger: 0.05,
      duration: 0.5,
      ease: "bounce.out",
    });
  };

  return (
    <Link href="/">
    <div
      className="flex items-center gap-2 cursor-pointer"
      onMouseEnter={handleMouseEnter}
  
    >
      
        <Image
          src="/images/logosidebar.png"
          alt={`${AppName} logo`}
          width={40}
          height={40}
        
          style={{ pointerEvents: "none" }}
        />
      
      <div
        ref={containerRef}
        className="text-xl font-bold whitespace-nowrap flex overflow-hidden"
      >
        {chars.map((char, idx) => (
          <span
            key={idx}
            className="char"
            style={{
              display: "inline-block",
              color: idx < 5 ? "#125892" : "#00ADEE",
            }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
    </Link>
  );
};

export default Logo;
