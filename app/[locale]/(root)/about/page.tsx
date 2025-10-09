"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "@/components/aboutPageCard/page";
import aboutImage from "@/public/images/molto2.svg";
// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {
  Navigation,
  Pagination,
  Autoplay,
  Scrollbar,
  A11y,
} from "swiper/modules";

import axios from "axios";
type clients = {
  name: string;
  logo: string;
};

function page() {
  const [data, setData] = useState<clients[]>([{ logo: "", name: "" }]);

  const cardsData = [
    {
      title: "Vision",
      hoverText:
        "To drive sustainable change in development and humanitarian efforts through actionable insights from data.",
    },
    {
      title: "Mission",
      hoverText:
        "To empower organizations and communities with insights that foster informed decision-making and promote positive societal impact.",
    },
    {
      title: "Values",
      hoverText:
        "Evidence and Learning: We emphasize evidence-based practices and continuous learning to ensure that our services are impactful and effective. Integrity and Accountability: We adhere to ethical standards, fostering transparent and trustworthy relationships with all partners, while implementing robust data protection protocols and maintaining well-defined processes. Inclusiveness and Diversity: We are committed to cultivating an inclusive environment that values diversity and promotes equity across all aspects of our operations.",
    },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/clients")
      .then((result) => {
        console.log("result: ", result.data.data);
        setData(result.data.data);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  }, []);

  return (
    <main className="flex flex-col items-center">
      {/* Logo Section */}
      <section className=" relative flex justify-center  w-full">
        {
          <Image
            src={aboutImage}
            alt="logo"
            width={400}
            height={300}
            className="w-full object-cover rounded-3xl"
          />
        }
        <div className="absolute inset-0 bg-black/40 rounded-3xl"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 sm:px-6 md:px-10">
          <h1 className=" text-center text-[15px]  sm:text-2xl md:text-5xl font-bold font-poppins text-white align-middle md:mb-5  sm:mb-2 ">
            About Think Impact CO.
          </h1>
          <h2 className=" text-center font-bold text-[10px] sm:text-xs md:text-2xl text-white align-middle mb-5">
            Collaboration | Innovation | Integrity | Impact
          </h2>
        </div>
      </section>

      <section className="w-3/4 text-center mt-10">
        <p className="text-gray-700 leading-relaxed text-justify md:text-2xl sm:text-sm">
          <strong>Think Impact Co.</strong> is a multidisciplinary training and
          consulting firm headquartered in Amman, Jordan. We specialize in
          conducting research studies and designing evaluation programs that are
          essential in informing and assessing both development and humanitarian
          assistance interventions. Our expertise encompasses a range of
          thematic areas, including health, education, gender equality, social
          inclusion, humanitarian relief, peacebuilding, and sustainable
          development. With extensive technical experience in strategic
          evaluation planning, mixed methods research, and the development of
          Monitoring, Evaluation, and Learning (MEL) frameworks, we are
          dedicated to transforming data into actionable insights.
        </p>
      </section>

      {/* Cards Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-20 mb-10 w-[90%] max-w-4xl mx-auto">
        {cardsData.map((card, index) => (
          <div key={index} className={index === 2 ? "md:col-span-2" : ""}>
            <Card
              title={card.title}
              hoverText={card.hoverText}
              bgColor="#00ADEE"
              hoverColor="#125892"
              variant={index === 2 ? "values" : "default"}
            />
          </div>
        ))}
      </section>

      {/* Our Clients Section */}
      {data.length > 0 && (
        <section className="flex flex-col justify-center items-center mt-20 w-full">
          <h1 className="text-center text-3xl md:text-5xl sm:text-4xl font-bold text-[#125892] mb-8">
            OUR CLIENTS
          </h1>

          <div className="w-full max-w-5xl cursor-pointer">
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              spaceBetween={30}
              slidesPerView={2}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 2000 }}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                640: {
                  slidesPerView: 1,
                  spaceBetween: 30,
                },
                768: {
                  slidesPerView: 1,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 50,
                },
              }}
              className="w-full h-80 my-8"
            >
              {data && data.length > 1 ? (
                data.map((client, i) => (
                  <SwiperSlide
                    key={i}
                    className="flex justify-center items-center"
                  >
                    <div className="flex flex-col items-center p-4 rounded-lg h-full">
                      <div className="h-40 flex items-center justify-center">
                        <img
                          src={client.logo}
                          alt={client.name || "client logo"}
                          className="max-h-full max-w-[150px] object-contain"
                        />
                      </div>
                      <p className="mt-3 font-medium text-center">
                        {client.name}
                      </p>
                    </div>
                  </SwiperSlide>
                ))
              ) : (
                <></>
              )}
            </Swiper>
          </div>
        </section>
      )}

      {/* Our Mindset Section */}
<section className="relative w-full bg-[#125892] sm:h-[90vh] mb-60 mt-20 flex flex-col justify-center items-center py-20 sm:py-40">
  <div className="relative md:top-[20vh]  w-[90%] sm:w-[85%] md:w-[80%] bg-gray-200 rounded-2xl shadow-black shadow-2xl flex flex-col justify-center items-center p-6 sm:p-10">
    
    <h1 className="text-center text-2xl sm:text-3xl md:text-5xl font-bold font-poppins text-[#125892] mb-4 sm:mb-6">
      Our Mindset
    </h1>
    
    <p className="text-center text-base sm:text-lg md:text-xl mb-6 sm:mb-8">
      We combine evidence-based insights with innovative solutions to drive meaningful, sustainable impact through collaboration and adaptability.
    </p>
    
    <button className="bg-[#125892] text-white hover:bg-white hover:text-[#125892] border-[#125892] border-2 p-3 sm:p-4 cursor-pointer rounded-2xl mb-6">
      Learn More
    </button>
    
    <div className="border-t border-black w-full my-6"></div>
    
    <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 w-full">
      
      <div className="flex flex-col justify-center items-center text-center">
        <div className="font-bold text-xl sm:text-2xl mb-2 sm:mb-4 text-[#125892]">
          What We Stand For
        </div>
        <div className="w-[90%] sm:w-[75%] text-sm sm:text-base">
          We are committed to getting you where you need to go and we’ll be with you every step of the way.
        </div>
      </div>
      
      <div className="flex flex-col justify-center items-center text-center">
        <div className="font-bold text-xl sm:text-2xl mb-2 sm:mb-4 text-[#125892]">
          What We Value
        </div>
        <div className="w-[90%] sm:w-[75%] text-sm sm:text-base">
          We believe success comes from working together to do good work and serve those around us.
        </div>
      </div>
      
      <div className="flex flex-col justify-center items-center text-center">
        <div className="font-bold text-xl sm:text-2xl mb-2 sm:mb-4 text-[#125892]">
          Why We’re Here
        </div>
        <div className="w-[90%] sm:w-[75%] text-sm sm:text-base">
          We’re deeply committed to everything we do and it shows in the events we host, causes we support and awards we win.
        </div>
      </div>
      
    </div>
  </div>
</section>

    </main>
  );
}

export default page;
