"use client";

import React from "react";
import { CompareSlider } from "./CompareSlider";
import SectionTitle from "../UI/SectionTitle";

const services = [
  {
    title: "HDR/Flash",
    desc: "Turn winter to summer",
    beforeImage: "/images/view-5.jpg",
    afterImage: "/images/view-4.jpg",
  },
  {
    title: "Strong View/ Window Pull",
    desc: "Manually blend multiple exposures",
    beforeImage: "/images/view-3.jpg",
    afterImage: "/images/view-2.jpg",
  },
  {
    title: "Medium View",
    desc: "Add a setting sun to any photo",
    beforeImage: "/images/view-3.jpg",
    afterImage: "/images/view-2.jpg",
  },
  {
    title: "Soft View",
    desc: "Add digital furniture and decor",
    beforeImage: "/images/view-3.jpg",
    afterImage: "/images/view-2.jpg",
  },
  {
    title: "Blow Out",
    desc: "Make unwanted items disappear",
    beforeImage: "/images/view-3.jpg",
    afterImage: "/images/view-2.jpg",
  },
];

const WindowViewStyles: React.FC = () => {
  return (
    <section className="bg-white pt-12 pb-24  md:pt-24 md:pb-40 relative">
      <div className="max-w-content mx-auto px-4">
        <span className="notch-top-right" aria-hidden="true"></span>

        <SectionTitle title="We have what you need​" topText="style" />

        <div className="flex flex-col lg:flex-row w-full lg:items-start mt-12">
          {/* Left - Sticky Section */}
          <div className="lg:w-2/5 flex flex-col items-center lg:items-start lg:sticky lg:top-24 lg:self-start lg:h-fit">
            <h3 className="text-[24px] md:text-[28px] font-semibold text-[#2CA6DF] mb-4 text-center lg:text-left">
              Window View Style
            </h3>
            <ul className="text-[22px] md:text-[24px] text-[#1C244B] space-y-1 text-center lg:text-left">
              {services.map((sv) => (
                <li key={sv.title} className="cursor-pointer">
                  {sv.title}
                </li>
              ))}
            </ul>
          </div>

          {/* Right - Scrollable Section */}
          <div className="lg:w-3/5 mt-8 lg:mt-0 lg:pl-10 flex flex-col gap-6">
            {services.map((service) => (
              <div key={service.title} className="flex flex-col gap-6 mb-8">
                <div>
                  <h4 className="text-[20px] font-semibold text-[#1C244B] mb-4">
                    {service.title}
                  </h4>
                  <div className="w-full aspect-[5/2.5] rounded-xl overflow-hidden bg-gray-100 shadow-xl">
                    <CompareSlider
                      beforeImage={service.beforeImage}
                      afterImage={service.afterImage}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WindowViewStyles;
