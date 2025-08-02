"use client";

import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import { ChevronDownIcon } from "@/components/Icons";

import "swiper/css";
import "swiper/css/navigation";
import "../../../public/css/ServiceSlide.css";
import { CompareSlider } from "@/components/Home/CompareSlider";

const Banner: React.FC = () => {
  const services = [
    { beforeImage: "/images/view-3.jpg", afterImage: "/images/view-2.jpg" },
    { beforeImage: "/images/view-4.jpg", afterImage: "/images/view-5.jpg" },
    { beforeImage: "/images/view-3.jpg", afterImage: "/images/view-2.jpg" },
  ];

  const swiperRef = useRef<SwiperCore | null>(null);

  return (
    <section className="w-full bg-section ">
      <div className="flex flex-col md:flex-row w-full min-h-[580px] py-16 md:py-0">
        <div className="flex-1 flex items-center justify-center p-8 min-h-[200px] max-w-content">
          <div className="text-center md:text-left max-w-xl">
            <h1 className="text-[32px] md:text-[48px] font-semibold text-black-base leading-tight mb-6">
              Software design
              <br />
              and development company
            </h1>
            <p className="text-base md:text-lg text-[#4B4B4B] mb-8">
              Shakuro is a multidisciplinary design and development agency
              <br className="hidden md:block" />
              working with individual startups and enterprises worldwide.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button className="px-6 py-3 bg-black text-white rounded-full text-sm font-medium hover:opacity-90 transition-all">
                Get in touch
              </button>
            </div>
          </div>
        </div>
        <div className="w-[100%] lg:w-[50%] flex-1 h-full p-4 md:p-16">
          <Swiper
            modules={[Navigation]}
            navigation
            loop={true}
            allowTouchMove={false}
            simulateTouch={false}
            spaceBetween={30}
            slidesPerView={1}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {services.map((service, index) => {
              return (
                <SwiperSlide key={`slide-${index}`}>
                  <div className="relative w-full h-[300px] md:h-[500px] aspect-[2/3] rounded-xl overflow-hidden  shadow-xl">
                    <CompareSlider
                      beforeImage={service.beforeImage}
                      afterImage={service.afterImage}
                      onDragStart={() => {
                        if (swiperRef.current)
                          swiperRef.current.allowTouchMove = false;
                      }}
                      onDragEnd={() => {
                        if (swiperRef.current)
                          swiperRef.current.allowTouchMove = true;
                      }}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Banner;
