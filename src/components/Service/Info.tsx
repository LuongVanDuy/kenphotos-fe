"use client";

import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";
import "../../../public/css/ServiceSlide.css";
import { CompareSlider } from "@/components/Home/Old/CompareSlider";
import { ChevronDownIcon } from "../Icons";

const services = [
  { beforeImage: "/images/view-3.jpg", afterImage: "/images/view-2.jpg" },
  { beforeImage: "/images/view-4.jpg", afterImage: "/images/view-5.jpg" },
  { beforeImage: "/images/view-3.jpg", afterImage: "/images/view-2.jpg" },
];

const accordionData = [
  {
    title: "Ideal for",
    content: (
      <ul className="list-disc list-inside space-y-1">
        <li>Exterior or Drone images</li>
        <li>Pre-blended images</li>
        <li>Smart phone photos</li>
        <li>Fast, budget–friendly image improvements</li>
      </ul>
    ),
  },
  {
    title: "Includes",
    content: (
      <ul className="list-disc list-inside space-y-1">
        <li>Image sharpening</li>
        <li>Vertical and horizontal straightening</li>
        <li>Color correction | White balance</li>
        <li>Brightness and contrast adjustment</li>
        <li>Lens distortion correction</li>
        <li>Lens spot removal</li>
      </ul>
    ),
  },
  {
    title: "Add-ons (4)",
    content: (
      <ul className="list-disc list-inside space-y-1">
        <li>Sky Replacement</li>
        <li>Object Removal</li>
        <li>Virtual Staging</li>
        <li>Twilight Conversion</li>
      </ul>
    ),
  },
];

const Info: React.FC = () => {
  const swiperRef = useRef<SwiperCore | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="w-full bg-section pt-[100px] md:pt-[180px]">
      <div className="max-w-content mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-10 gap-10 items-start">
          {/* LEFT CONTENT */}
          <div className="md:col-span-4 text-left space-y-6">
            <div className="text-center md:text-left">
              <p className="text-[22px] leading-[30px] text-center md:text-[24px] md:text-left">Photo Editing</p>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="p-0 my-5 text-[26px] leading-[32px] font-semibold max-w-full text-center md:text-left md:my-[35px] md:mb-[34px] md:text-[60px] md:leading-[66px]"
              >
                Single Exposure
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                className="text-[18px] md:max-w-[90%]"
              >
                Taken with a phone or camera with one exposure per shot. This method of shooting is for Agents or homeowners take quick photos
                themselves, without looking out the window.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
                className="flex flex-col sm:flex-row items-center gap-4 mt-8"
              >
                <button className="px-[30px] py-[15px] text-[16px] bg-black text-white rounded-full text-sm font-medium hover:opacity-90 transition-all">
                  Get in touch
                </button>
              </motion.div>
            </div>
            {/* Accordion */}
            <div className="rounded border border-gray-200 overflow-hidden divide-y divide-gray-200">
              {accordionData.map((item, index) => {
                const isOpen = activeIndex === index;
                return (
                  <div key={index}>
                    <button
                      onClick={() => setActiveIndex(isOpen ? null : index)}
                      className="w-full flex justify-between items-center px-4 py-3 text-left font-semibold text-gray-800 hover:bg-gray-50 transition"
                    >
                      <span>{item.title}</span>
                      <span className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}>
                        <ChevronDownIcon size={18} />
                      </span>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        isOpen ? "max-h-96 opacity-100 py-3 px-4" : "max-h-0 opacity-0 py-0 px-4"
                      }`}
                    >
                      <div className="text-sm text-gray-700">{item.content}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT CONTENT*/}
          <div className="md:col-span-6">
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
                    <div className="relative w-full h-[300px] md:h-[500px] aspect-[2/3] rounded-xl overflow-hidden bg-gray-100 shadow-xl">
                      <CompareSlider
                        beforeImage={service.beforeImage}
                        afterImage={service.afterImage}
                        onDragStart={() => {
                          if (swiperRef.current) swiperRef.current.allowTouchMove = false;
                        }}
                        onDragEnd={() => {
                          if (swiperRef.current) swiperRef.current.allowTouchMove = true;
                        }}
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Info;
