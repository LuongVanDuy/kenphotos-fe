"use client";

import React from "react";
import Image from "next/image";

const WindowViewStyles: React.FC = () => {
  return (
    <section className="bg-[#D4EFFF] md:py-16">
      <div className="max-w-content mx-auto px-4">
        <h2 className="text-[#1C244B] text-[24px] md:text-[45px] font-semibold text-center pt-3 mb-6 md:mb-12 leading-[1.2em] tracking-[0px]">
          We have what you need
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center items-start">
          <div className="flex flex-col items-center justify-center lg:items-center min-h-[220px] w-full">
            <h3 className="text-[24px] md:text-[28px] font-semibold text-[#2CA6DF] mb-4 text-center lg:text-left">
              Window View Style
            </h3>
            <ul className="text-[22px] md:text-[24px] text-[#1C244B] space-y-1 text-center lg:text-left">
              <li>– American Style</li>
              <li>– Canadian Style</li>
              <li>– Scandinavian Style</li>
              <li>– Australian Style</li>
              <li>– Airbnb</li>
              <li>– Classic</li>
              <li>– Architecture</li>
            </ul>
          </div>

          <div className="flex flex-col items-center">
            <Image
              src="/images/view-1.jpg"
              alt="Before: HDR/Flash"
              width={350}
              height={220}
              className="w-full object-cover"
            />
            <span className="mt-4 text-[22px] md:text-[26px] text-[#1C244B] text-center">
              Before: HDR/Flash
            </span>
          </div>

          <div className="flex flex-col items-center">
            <Image
              src="/images/view-1.jpg"
              alt="After: Strong View/ Window Pull"
              width={350}
              height={220}
              className="w-full object-cover"
            />
            <span className="mt-4 text-[22px] md:text-[26px] text-[#1C244B] text-center">
              After: Strong View/ Window Pull
            </span>
          </div>

          <div className="flex flex-col items-center">
            <Image
              src="/images/view-1.jpg"
              alt="After: Medium View"
              width={350}
              height={220}
              className="w-full object-cover"
            />
            <span className="mt-4 text-[22px] md:text-[26px] text-[#1C244B] text-center">
              After: Medium View
            </span>
          </div>

          <div className="flex flex-col items-center">
            <Image
              src="/images/view-1.jpg"
              alt="After: Soft View"
              width={350}
              height={220}
              className="w-full object-cover"
            />
            <span className="mt-4 text-[22px] md:text-[26px] text-[#1C244B] text-center">
              After: Soft View
            </span>
          </div>

          <div className="flex flex-col items-center">
            <Image
              src="/images/view-1.jpg"
              alt="After: Blow Out"
              width={350}
              height={220}
              className="w-full object-cover"
            />
            <span className="mt-4 text-[22px] md:text-[26px] text-[#1C244B] text-center">
              After: Blow Out
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WindowViewStyles;
