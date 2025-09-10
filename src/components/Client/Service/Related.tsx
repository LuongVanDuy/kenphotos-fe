"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useRef, useState } from "react";
import { CompareSlider } from "../Common/CompareSlider";
import ServiceCard from "./ServiceCard";
import MainTitle from "../Common/Title/MainTitle";
import { motion } from "framer-motion";

interface InfoProps {
  relatedServices: any;
}

const Related: React.FC<InfoProps> = ({ relatedServices }) => {
  const swiperRef = useRef<SwiperCore>();

  return (
    <section className="py-10 md:py-[120px] bg-[rgba(220,237,248,0.6)] overflow-hidden">
      <div className="max-w-content mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <MainTitle title="Related Sevices" align="left" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative mt-12 overflow-hidden"
        >
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-0 md:-left-5 top-1/2 -translate-y-1/2 z-10 text-[32px] text-[#333] border border-[#eee] bg-white shadow-lg w-9 h-9 rounded-full flex items-center justify-center"
          >
            &lt;
          </button>
          <Swiper
            modules={[Navigation]}
            navigation={false}
            spaceBetween={20}
            slidesPerView={1.2}
            loop={true}
            allowTouchMove={false}
            simulateTouch={false}
            breakpoints={{
              640: { slidesPerView: 1.5 },
              768: { slidesPerView: 2.5 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 3 },
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {relatedServices.map((service: any, index: any) => (
              <SwiperSlide key={service.id}>
                <ServiceCard
                  key={service.id || index}
                  id={service.id}
                  index={index}
                  title={service.title}
                  content={service.content}
                  rating={service.rating}
                  orderCount={service.orderCount}
                  originalPrice={service.originalPrice}
                  discountedPrice={service.discountedPrice}
                  images={service.images}
                  slug={service.slug}
                  bg="!bg-[#fff]"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-0 md:-right-5 top-1/2 -translate-y-1/2 z-10 text-[32px] text-[#333] shadow-lg border border-[#eee] bg-white font-thin w-9 h-9 rounded-full flex items-center justify-center"
          >
            &gt;
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Related;
