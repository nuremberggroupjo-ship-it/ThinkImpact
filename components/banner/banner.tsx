"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import { newBanner } from "@/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Props = {
  banners: newBanner[];
  locale: string;
};

export function Banner({ banners, locale }: Props) {
  const isArabic = locale.startsWith("ar");

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full mt-20"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {banners.map((item) => {
          const title = isArabic ? item.alt ?? item.alt : item.alt;
          const description = isArabic
            ? item.description_ar ?? item.description_en
            : item.description_en;

          return (
            <CarouselItem key={item.id} className="relative">
              <Card className="border-0 shadow-none p-0">
                <CardContent className="aspect-[20/8] p-0 m-0 relative  overflow-hidden">
                  <Image
                    src={item.image ?? "/default-image.png"}
                    alt={title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#125892]/95 z-10" />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black z-9" />
                  <div className="absolute inset-0 z-20 flex flex-col justify-center items-start p-6 text-white text-left ml-[5vw]">
                    <div className="w-[30%] flex flex-col items-center">
                      <h2 className="text-4xl font-bold">{title}</h2>
                      <p className="text-xl mt-6">{description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
