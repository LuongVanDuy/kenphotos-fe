"use client";

import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "../../../../public/css/ServiceSlide.css";
import { CompareSlider } from "@/components/Client/Common/CompareSlider";
import { useScrollToForm } from "@/utils/scrollToForm";
import { getImageUrl } from "@/utils/imageUrl";

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

interface InfoProps {
  serviceDetail: any;
}

const Info: React.FC<InfoProps> = ({ serviceDetail }) => {
  const swiperRef = useRef<SwiperCore | null>();
  const [activeTab, setActiveTab] = useState<number>(0);
  const scrollToForm = useScrollToForm();

  return (
    <section className="w-full bg-section pt-[100px] md:pt-[180px]">
      <div className="max-w-content mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-10 gap-10 items-start">
          {/* LEFT CONTENT */}
          <div className="order-2 md:order-1 md:col-span-4 text-left space-y-6">
            <div className="text-center md:text-left">
              <p className="text-[22px] leading-[30px] text-center md:text-[24px] md:text-left">
                Photo Editing
              </p>
              <h1 className="p-0 my-5 text-[26px] leading-[32px] font-semibold max-w-full text-center md:text-left md:my-[35px] md:mb-[34px] md:text-[60px] md:leading-[66px]">
                {serviceDetail?.title}
              </h1>

              <div className="flex gap-8 items-center justify-center md:justify-start mb-6">
                <div className="flex items-center  gap-2 text-center">
                  {serviceDetail?.originalPrice &&
                  serviceDetail?.discountedPrice ? (
                    <>
                      <span className="text-red-500 font-bold">
                        -
                        {Math.round(
                          ((serviceDetail.originalPrice -
                            serviceDetail.discountedPrice) /
                            serviceDetail.originalPrice) *
                            100
                        )}
                        %
                      </span>
                      <span className="text-gray-400 line-through">
                        ${serviceDetail.originalPrice.toFixed(2)}
                      </span>
                      <span className="text-green-600 font-bold text-lg">
                        ${serviceDetail.discountedPrice.toFixed(2)}
                      </span>
                    </>
                  ) : serviceDetail?.originalPrice ? (
                    <span className="text-green-600 font-bold text-lg">
                      ${serviceDetail.originalPrice.toFixed(2)}
                    </span>
                  ) : (
                    <span className="text-gray-400 font-bold">$0.00</span>
                  )}
                </div>
                {/* Rating */}
                <div className="flex items-center gap-2">
                  {serviceDetail?.rating !== undefined && (
                    <div className="flex items-center">
                      <span className="text-yellow-400 text-lg">★</span>
                      <span className="font-semibold ml-1">
                        {serviceDetail.rating}
                      </span>
                    </div>
                  )}
                  {serviceDetail?.orderCount !== undefined && (
                    <span className="text-gray-500">
                      ({serviceDetail.orderCount})
                    </span>
                  )}
                </div>
              </div>

              <div
                className="text-[18px] md:max-w-[90%]"
                dangerouslySetInnerHTML={{
                  __html: serviceDetail?.content || "",
                }}
              ></div>
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="px-[30px] py-[15px] text-[16px] bg-[#2D6DFF] text-white rounded-full text-sm font-medium hover:opacity-90 transition-all"
                >
                  Send Free Test
                </button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row bg-transparent rounded-lg border border-gray-200">
              <div className="flex flex-row md:flex-col min-w-full md:min-w-[200px]">
                {accordionData.map((item, index) => (
                  <button
                    type="button"
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`text-center md:text-left md:px-4 py-3 transition-all font-semibold relative flex-1 md:flex-none ${
                      activeTab === index
                        ? " text-blue-600  font-semibold"
                        : "text-gray-600 border-transparent "
                    } ${
                      index === 0
                        ? "rounded-tl-lg md:rounded-tl-lg md:rounded-bl-none"
                        : ""
                    } ${
                      index === accordionData.length - 1
                        ? "rounded-tr-lg md:rounded-tr-none md:rounded-bl-lg"
                        : ""
                    }`}
                  >
                    {item.title}

                    {index < accordionData.length - 1 && (
                      <>
                        <div
                          className={`absolute right-0 top-1/2 w-px h-full transform -translate-y-1/2 md:hidden ${
                            activeTab === index || activeTab === index + 1
                              ? "bg-gray-300"
                              : "bg-gray-200"
                          }`}
                        />
                        <div
                          className={`absolute left-0 bottom-0 w-full h-px hidden md:block ${
                            activeTab === index || activeTab === index + 1
                              ? "bg-gray-300"
                              : "bg-gray-200"
                          }`}
                        />
                      </>
                    )}
                  </button>
                ))}
              </div>

              <div
                key={activeTab}
                className="flex-1 border-t md:border-t-0 md:border-l border-gray-200 p-6"
              >
                <div className="text-gray-700">
                  {accordionData[activeTab].content}
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2 md:col-span-6">
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
              {serviceDetail.images.map((image: any, index: number) => (
                <SwiperSlide key={`slide-${image.id || index}`}>
                  <div className="relative w-full h-[300px] md:h-[600px] aspect-[2/3] rounded-xl overflow-hidden bg-gray-100 shadow-xl">
                    <CompareSlider
                      beforeImage={getImageUrl(image.beforeUrl)}
                      afterImage={getImageUrl(image.afterUrl)}
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
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Info;
