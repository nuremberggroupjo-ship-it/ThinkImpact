"use client"

import * as React from "react"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import { BannerData } from "@/types"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function Banner({ banners }: { banners: BannerData[] }) {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )

  return (
    <Carousel 
      plugins={[plugin.current]}
      className="w-full  "
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {banners.map((item) => (
          <CarouselItem key={item.id} className="relative ">
            <Card className="border-0 shadow-none p-0">
              <CardContent className="aspect-[25/11] p-0 m-0 relative rounded-b-[150px] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#125892]/95 z-10" />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black z-9" />
                <div className="absolute inset-0 z-20 flex flex-col justify-center items-start p-6 text-white text-left ml-[5vw]">
                  <div className="w-[30%] flex flex-col items-center">
                    <h2 className="text-4xl font-bold">{item.alt}</h2>
                    <p className="text-xl mt-6">{item.description_en}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
