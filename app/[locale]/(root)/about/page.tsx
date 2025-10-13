"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  Scrollbar,
  A11y,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { FaBullseye, FaEye, FaHeart } from "react-icons/fa";

import Card from "@/components/aboutPageCard/page";
import aboutImage from "@/public/images/molto2.svg";
import axios from "axios";

type clients = {
  name: string;
  logo: string;
};

const Page = () => {
  const [data, setData] = useState<clients[]>([{ logo: "", name: "" }]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/clients")
      .then((result) => {
        setData(result.data.data);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  }, []);

  return (
    <main className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative flex justify-center w-full">
        <Image
          src={aboutImage}
          alt="logo"
          width={400}
          height={300}
          className="w-full object-cover rounded-3xl"
        />
        <div className="absolute inset-0 bg-black/40 rounded-3xl" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 sm:px-6 md:px-10">
          <h1 className="text-[15px] sm:text-2xl md:text-5xl font-bold font-poppins md:mb-5 sm:mb-2">
            About Think Impact CO.
          </h1>
          <h2 className="text-[10px] sm:text-xs md:text-2xl font-bold mb-5">
            Collaboration | Innovation | Integrity | Impact
          </h2>
        </div>
      </section>

      {/* Intro Section */}
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

    

      <section className="py-20 px-6 md:px-12 bg-gray-50 w-full">
  <h2 className="text-4xl font-bold text-center text-[#125892] mb-16">
    Mission, Vision & Values
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
    {[
      {
        title: "Our Mission",
        icon: <FaBullseye className="text-white text-3xl" />,
        description:
          "To empower organizations and communities with insights that foster informed decision-making and promote positive societal impact.",
        from: "from-[#125892]",
        to: "to-[#1F6AA5]",
        center: false,
      },
      {
        title: "Our Vision",
        icon: <FaEye className="text-white text-3xl" />,
        description:
          "To drive sustainable change in development and humanitarian efforts through actionable insights from data.",
        from: "from-[#0A3556]",
        to: "to-[#0F4C75]",
        center: true,
      },
      {
        title: "Our Values",
        icon: <FaHeart className="text-white text-3xl" />,
        description:
          "We emphasize evidence-based practices, integrity, inclusiveness, and continuous learning to ensure impact and effectiveness.",
        from: "from-[#1B4F72]",
        to: "to-[#2E86C1]",
        center: false,
      },
    ].map((item, index) => (
      <div
        key={index}
        className={`p-8 rounded-xl bg-gradient-to-br ${item.from} ${item.to} text-white shadow-xl transform transition duration-300
          flex flex-col items-center text-center cursor-pointer
          ${item.center ? "md:scale-105 md:-translate-y-4 z-10 hover:scale-110 hover:shadow-2xl" : "hover:scale-105 hover:shadow-xl"}
        `}
      >
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/20 mb-4">
          {item.icon}
        </div>
        <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
        <p className="text-sm sm:text-base leading-relaxed">{item.description}</p>
      </div>
    ))}
  </div>
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
        <div className="relative md:top-[20vh] w-[90%] sm:w-[85%] md:w-[80%] bg-gray-200 rounded-2xl shadow-black shadow-2xl flex flex-col justify-center items-center p-6 sm:p-10">
          <h1 className="text-center text-2xl sm:text-3xl md:text-5xl font-bold font-poppins text-[#125892] mb-4 sm:mb-6">
            Our Methodology
          </h1>

          <p className="text-center text-base sm:text-lg md:text-xl mb-6 sm:mb-8">
            We combine evidence-based insights with innovative solutions to
            drive meaningful, sustainable impact through collaboration and
            adaptability.
          </p>

          <div className="border-t border-black w-full my-6" />

          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 w-full">
            <div className="flex flex-col justify-center items-center text-center">
              <div className="font-bold text-xl sm:text-2xl mb-2 sm:mb-4 text-[#125892]">
                What We Stand For
              </div>
              <div className="w-[90%] sm:w-[75%] text-sm sm:text-base">
                We are committed to getting you where you need to go and we’ll
                be with you every step of the way.
              </div>
            </div>

            <div className="flex flex-col justify-center items-center text-center">
              <div className="font-bold text-xl sm:text-2xl mb-2 sm:mb-4 text-[#125892]">
                What We Value
              </div>
              <div className="w-[90%] sm:w-[75%] text-sm sm:text-base">
                We believe success comes from working together to do good work
                and serve those around us.
              </div>
            </div>

            <div className="flex flex-col justify-center items-center text-center">
              <div className="font-bold text-xl sm:text-2xl mb-2 sm:mb-4 text-[#125892]">
                Why We’re Here
              </div>
              <div className="w-[90%] sm:w-[75%] text-sm sm:text-base">
                We’re deeply committed to everything we do and it shows in the
                events we host, causes we support and awards we win.
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
