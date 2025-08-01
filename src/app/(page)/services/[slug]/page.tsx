"use client";

import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import { ChevronDownIcon } from "@/components/Icons";

import "swiper/css";
import "swiper/css/navigation";
import "../../../../../public/css/ServiceSlide.css";
import { CompareSlider } from "@/components/Home/CompareSlider";
import ServiceSlider from "@/components/Home/ServicesSlider";

const ServiceDetail = ({ params }: { params: { slug: string[] } }) => {
  const { slug } = params;
  const swiperRef = useRef<SwiperCore | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

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

  return (
    <div className="max-w-content mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-10 gap-10 items-start">
        {/* LEFT CONTENT */}
        <div className="md:col-span-4 text-left space-y-6">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-500">
            <span className="hover:underline cursor-pointer">Services</span> /{" "}
            <span className="text-gray-800 font-medium">{slug}</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            📷 Single Exposure
          </h1>

          {/* Description */}
          <p className="text-gray-700 text-[15px] leading-relaxed">
            Quickly and inexpensively transform a single exposure or pre-blended
            exposures into a refined, finished image. Vendors…
          </p>

          {/* Accordion */}
          <div className="rounded border border-gray-200 overflow-hidden divide-y divide-gray-200">
            {accordionData.map((item, index) => {
              const isOpen = activeIndex === index;
              return (
                <div key={index}>
                  {/* Toggle button */}
                  <button
                    onClick={() => setActiveIndex(isOpen ? null : index)}
                    className="w-full flex justify-between items-center px-4 py-3 text-left font-semibold text-gray-800 hover:bg-gray-50 transition"
                  >
                    <span>{item.title}</span>
                    <span
                      className={`transform transition-transform duration-300 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    >
                      <ChevronDownIcon size={18} />
                    </span>
                  </button>

                  {/* Accordion content with animation */}
                  <div
                    className={`overflow-hidden bg-gray-50 transition-all duration-500 ease-in-out ${
                      isOpen
                        ? "max-h-96 opacity-100 py-3 px-4"
                        : "max-h-0 opacity-0 py-0 px-4"
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

      <ServiceSlider />
    </div>
  );
};

export default ServiceDetail;
