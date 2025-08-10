"use client";

import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";
import "../../../../public/css/ServiceSlide.css";
import { CompareSlider } from "@/components/Client/Common/CompareSlider";
import { useScrollToForm } from "@/utils/useScrollToForm";

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
  const swiperRef = useRef<SwiperCore | null>();
  const [activeTab, setActiveTab] = useState<number>(0);
  const scrollToForm = useScrollToForm();

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

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
                className="flex gap-8 items-center justify-center md:justify-start mb-6"
              >
                <div className="flex items-center  gap-2 text-center">
                  <span className="text-red-500 font-bold">-15%</span>
                  <span className="text-gray-400 line-through">US$20</span>
                  <span className="text-green-600 font-bold text-lg">US$18</span>
                </div>
                {/* Rating */}
                <div className="flex items-center  gap-2">
                  <div className="flex items-center">
                    <span className="text-yellow-400 text-lg">★</span>
                    <span className="font-semibold ml-1">12</span>
                  </div>
                  <span className="text-gray-500 text-sm">({"12.5k"} orders)</span>
                </div>
              </motion.div>

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
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="px-[30px] py-[15px] text-[16px] bg-[#2D6DFF] text-white rounded-full text-sm font-medium hover:opacity-90 transition-all"
                >
                  Send Free Test
                </button>
              </motion.div>
            </div>

            {/* Tab UI */}
            <div className="flex flex-col md:flex-row bg-transparent rounded-lg border border-gray-200">
              {/* Tab Headers - Mobile: Horizontal, Desktop: Vertical */}
              <div className="flex flex-row md:flex-col min-w-full md:min-w-[200px]">
                {accordionData.map((item, index) => (
                  <button
                    type="button"
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`text-center md:text-left md:px-4 py-3 transition-all font-semibold relative flex-1 md:flex-none ${
                      activeTab === index ? " text-blue-600  font-semibold" : "text-gray-600 border-transparent "
                    } ${index === 0 ? "rounded-tl-lg md:rounded-tl-lg md:rounded-bl-none" : ""} ${
                      index === accordionData.length - 1 ? "rounded-tr-lg md:rounded-tr-none md:rounded-bl-lg" : ""
                    }`}
                  >
                    {item.title}

                    {/* Connector lines - Mobile: horizontal, Desktop: vertical */}
                    {index < accordionData.length - 1 && (
                      <>
                        {/* Mobile horizontal line */}
                        <div
                          className={`absolute right-0 top-1/2 w-px h-full transform -translate-y-1/2 md:hidden ${
                            activeTab === index || activeTab === index + 1 ? "bg-gray-300" : "bg-gray-200"
                          }`}
                        />
                        {/* Desktop vertical line */}
                        <div
                          className={`absolute left-0 bottom-0 w-full h-px hidden md:block ${
                            activeTab === index || activeTab === index + 1 ? "bg-gray-300" : "bg-gray-200"
                          }`}
                        />
                      </>
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content - Mobile: Below headers, Desktop: Right side */}
              <div className="flex-1 border-t md:border-t-0 md:border-l border-gray-200 p-6">
                <div className="text-gray-700">{accordionData[activeTab].content}</div>
              </div>
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
                    <div className="relative w-full h-[300px] md:h-[600px] aspect-[2/3] rounded-xl overflow-hidden bg-gray-100 shadow-xl">
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
