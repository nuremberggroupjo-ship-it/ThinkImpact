"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CardsWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function CardsWrapper({ children, className }: CardsWrapperProps) {
  return (
    <div className="w-full flex justify-center">
      <div
        className={cn(
          "w-[80%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-6",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
