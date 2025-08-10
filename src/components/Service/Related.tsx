"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useRef, useState } from "react";
import { CompareSlider } from "../Home/Old/CompareSlider";
import ServiceCard from "./ServiceCard";
import MainTitle from "../UI/Title/MainTitle";

const Related: React.FC = () => {
  const swiperRef = useRef<SwiperCore>();

  const services = [
    {
      id: 1,
      title: "Single Exposure",
      beforeImage: "/images/view-4.jpg",
      afterImage: "/images/view-5.jpg",
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
      beforeImage: "/images/view-4.jpg",
      afterImage: "/images/view-5.jpg",
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
      beforeImage: "/images/view-4.jpg",
      afterImage: "/images/view-5.jpg",
      discount: "-17%",
      originalPrice: "US$5.99",
      newPrice: "US$4.99",
      description:
        "Houses with swimming pools are often valuable, sometimes the pool is dry or surrounded by dirt, we will remove the dirt or replace the water in the pool to help increase the value of your property",
      rating: 4.9,
      orders: "3.5k",
    },
    {
      id: 7,
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
    {
      id: 8,
      title: "Water in Pool",
      beforeImage: "/images/view-4.jpg",
      afterImage: "/images/view-5.jpg",
      discount: "-17%",
      originalPrice: "US$5.99",
      newPrice: "US$4.99",
      description:
        "Houses with swimming pools are often valuable, sometimes the pool is dry or surrounded by dirt, we will remove the dirt or replace the water in the pool to help increase the value of your property",
      rating: 4.9,
      orders: "3.5k",
    },
  ];

  return (
    <section className="py-10 md:py-[120px] bg-[rgba(220,237,248,0.6)]">
      <div className="max-w-content mx-auto px-4">
        <MainTitle title="Related Sevices" align="left" />
        <div className="relative mt-12">
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
            {services.map((service, index) => {
              return (
                <SwiperSlide key={service.id}>
                  <ServiceCard
                    key={service.id}
                    index={index}
                    id={service.id}
                    beforeImage={service.beforeImage}
                    afterImage={service.afterImage}
                    title={service.title}
                    description={service.description}
                    rating={service.rating}
                    orders={service.orders}
                    discount={service.discount}
                    originalPrice={service.originalPrice}
                    newPrice={service.newPrice}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-0 md:-right-5 top-1/2 -translate-y-1/2 z-10 text-[32px] text-[#333] shadow-lg border border-[#eee] bg-white font-thin w-9 h-9 rounded-full flex items-center justify-center"
          >
            &gt;
          </button>
        </div>
      </div>
    </section>
  );
};

export default Related;
