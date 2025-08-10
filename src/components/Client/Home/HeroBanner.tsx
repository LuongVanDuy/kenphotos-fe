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

const HeroBanner: React.FC = () => {
  const services = [
    {
      id: 1,
      title: "Single Exposure",
      beforeImage: "/images/view-3.jpg",
      afterImage: "/images/view-2.jpg",
      discount: "-20%",
      originalPrice: "US$1",
      newPrice: "US$0.8",
      description:
        "Taken with a phone or camera with one exposure per shot. This method of shooting is for Agents or homeowners take quick photos themselves, without looking out the window.",
      rating: 4.9,
      orders: "17.4k",
    },
    {
      id: 2,
      title: "HDR Bracket",
      beforeImage: "/images/view-3.jpg",
      afterImage: "/images/view-2.jpg",
      discount: "-17%",
      originalPrice: "US$1.2",
      newPrice: "US$1",
      description:
        "This technique helps to showcase the best aspects of a property by ensuring that both the interior and exterior are well-lit and detailed, even in challenging lighting conditions. 5 exposures is the best.",
      rating: 5,
      orders: "16k+",
    },
    {
      id: 3,
      title: "Flambient",
      beforeImage: "/images/view-3.jpg",
      afterImage: "/images/view-2.jpg",
      discount: "-20%",
      originalPrice: "US$1.5",
      newPrice: "US$1.2",
      description:
        'The "flambient" method for shooting real estate photography involves combining both flash and ambient light in your shots. Use multiple flash shots.',
      rating: 4.9,
      orders: "15.7k+",
    },
    {
      id: 4,
      title: "Virtual Staging",
      beforeImage: "/images/view-3.jpg",
      afterImage: "/images/view-2.jpg",
      discount: "-33%",
      originalPrice: "US$29.99",
      newPrice: "US$19.99",
      description:
        "Turn an empty room into a fully furnished room. Home staging is completed quickly on the computer rather than in person, requiring a lot less cost and labor",
      rating: 5,
      orders: "8.7k",
    },
    {
      id: 5,
      title: "Day To Twilight or Dusk",
      beforeImage: "/images/view-3.jpg",
      afterImage: "/images/view-2.jpg",
      discount: "-17%",
      originalPrice: "US$5.99",
      newPrice: "US$4.99",
      description:
        "Creating an artistically advanced sunset photo only from a daytime outdoor photo without requiring you to capture an additional picture.",
      rating: 4.9,
      orders: "6.3k",
    },
    {
      id: 6,
      title: "Water in Pool",
      beforeImage: "/images/view-3.jpg",
      afterImage: "/images/view-2.jpg",
      discount: "-17%",
      originalPrice: "US$5.99",
      newPrice: "US$4.99",
      description:
        "Houses with swimming pools are often valuable, sometimes the pool is dry or surrounded by dirt, we will remove the dirt or replace the water in the pool to help increase the value of your property",
      rating: 4.9,
      orders: "3.5k",
    },
  ];
  const swiperRef = useRef<SwiperCore | null>(null);
  const scrollToForm = useScrollToForm();

  return (
    <section className="w-full bg-section pt-[100px] md:pt-[180px]">
      <div className="max-w-content mx-auto px-4">
        <div className="flex flex-col md:flex-row w-full min-h-[580px] py-16 md:py-0 gap-5 md:gap-0">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className=""
          >
            <div className="text-center md:text-left">
              <p className="text-[22px] leading-[30px] text-center md:text-[24px] md:text-left">True Color Real Estate Visual Solutions</p>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="p-0 my-5 text-[26px] leading-[32px] font-semibold max-w-full text-center md:text-left md:my-[35px] md:mb-[34px] md:text-[60px] md:leading-[66px]"
              >
                Premium Editing & Visualization Services
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                className="font-semibold bg-gradient-to-t from-[#184BF8] to-[#2C6BFF] bg-clip-text text-transparent -webkit-background-clip-text -webkit-text-fill-transparent
                text-[16px] leading-[20px] mt-2 mb-0 text-center
                md:text-[20px] md:leading-[25px] md:mb-6 md:mt-0 md:text-left"
              >
                Transform ordinary shots into stunning visuals that sell.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                className="text-[18px] md:max-w-[90%]"
              >
                From precise color correction and realistic virtual staging to immersive 3D visualizations, True Color transforms ordinary property
                photos into powerful marketing visuals. Our fast turnaround and attention to detail help you attract more buyers and close deals
                faster.
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                className="flex items-center flex-col md:flex-row gap-2 mt-8 "
              >
                <div className="flex items-center  gap-1">
                  {[...Array(5)].map((_, index) => (
                    <svg key={index} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="flex items-center gap-1 text-gray-600">
                  <span>With 100+</span>
                  <span className="font-bold text-black">5-star</span>
                  <span>reviews on Google.</span>
                </p>
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="w-[100%] lg:w-[50%] flex-1 h-full"
          >
            <Swiper
              modules={[Navigation]}
              navigation
              loop={true}
              allowTouchMove={false}
              simulateTouch={false}
              spaceBetween={30}
              slidesPerView={1}
              effect="fade"
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
            >
              {services.map((service, index) => {
                return (
                  <SwiperSlide key={`slide-${index}`}>
                    <div className="relative w-full h-[300px] md:h-[500px] aspect-[2/3] rounded-xl overflow-hidden ">
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
                    <div className="my-6 flex items-center flex-col gap-3 md:flex-row justify-between">
                      <h3 className="text-xl font-bold text-[#1C244B] cursor-pointer">{service.title}</h3>
                      <div className="flex justify-between gap-3 items-center">
                        <div className="flex items-center gap-2 justify-center">
                          <div className="flex items-center">
                            <span className="text-yellow-400 text-lg">★</span>
                            <span className="font-semibold ml-1">{service.rating}</span>
                          </div>
                          <span className="text-gray-500">({service.orders} orders)</span>
                        </div>

                        <div className="flex items-center justify-center gap-2  text-center">
                          <span className="text-red-500 font-bold">{service.discount}</span>
                          <span className="text-gray-400 line-through">{service.originalPrice}</span>
                          <span className="text-green-600 font-bold text-lg">{service.newPrice}</span>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
