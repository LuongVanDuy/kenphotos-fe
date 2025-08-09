"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CompareSlider } from "./CompareSlider";

const services = [
  {
    id: 1,
    title: "HDR / Flash",
    desc: "Balanced lighting that reveals full detail inside and outside. Ideal for high-contrast shots using HDR or flash.",
    beforeImage: "/images/view-5.jpg",
    afterImage: "/images/view-4.jpg",
  },
  {
    id: 2,
    title: "Strong View / Window Pull",
    desc: "The outside view is bright and dominant, drawing attention and creating contrast with the interior.",
    beforeImage: "/images/view-3.jpg",
    afterImage: "/images/view-2.jpg",
  },
  {
    id: 3,
    title: "Medium View",
    desc: "Balanced view of both inside and outside with soft lighting. A clean and natural look.",
    beforeImage: "/images/view-3.jpg",
    afterImage: "/images/view-2.jpg",
  },
  {
    id: 4,
    title: "Soft View",
    desc: "Gentle lighting with a slightly hazy window view. Focus stays on the indoor subject.",
    beforeImage: "/images/view-3.jpg",
    afterImage: "/images/view-2.jpg",
  },
  {
    id: 5,
    title: "Blow Out",
    desc: "Overexposed window removes outdoor detail, giving a clean and modern aesthetic.",
    beforeImage: "/images/view-3.jpg",
    afterImage: "/images/view-2.jpg",
  },
];

const WindowViewStyles: React.FC = () => {
  return (
    <section className="bg-[#D4EFFF] md:py-16">
      <div className="max-w-content mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[#1C244B] text-[24px] md:text-[45px] font-semibold text-center pt-3 mb-6 md:mb-12 leading-[1.2em] tracking-[0px]"
        >
          We have what you need
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col items-center justify-center lg:items-center min-h-[220px] w-full"
          >
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
          </motion.div>

          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: 0.1 * (index + 1),
              }}
              className="flex flex-col  w-full"
            >
              <div className="relative w-full h-[300px] aspect-[2/3] rounded-xl overflow-hidden shadow-xl">
                <CompareSlider
                  beforeImage={service.beforeImage}
                  afterImage={service.afterImage}
                />
              </div>
              <h4 className="text-[20px] font-semibold text-[#1C244B] mt-2">
                {service.title}
              </h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WindowViewStyles;
