"use client";

import React from "react";
import { motion } from "framer-motion";
import MainTitle from "../Common/Title/MainTitle";
import { CompareSlider } from "../Common/CompareSlider";

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
    <section className="py-10 md:py-[120px]">
      <div className="max-w-content mx-auto px-4">
        <MainTitle
          title={
            <>
              We Have What You Need <br />
              <span className="inline-block bg-gradient-to-r from-[#2D6DFF] to-[#3BE5FF] bg-clip-text text-transparent -webkit-background-clip-text -webkit-text-fill-transparent">
                Window View Styles
              </span>{" "}
              for Every Taste
            </>
          }
          content="From bright and airy daytime views to cozy evening cityscapes, True Color offers a variety of window view editing styles to match any property’s character. Whether you want a modern skyline, lush greenery, or a serene ocean view, our expert editors can bring your vision to life with precision and style."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center items-start mt-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col border rounded-xl items-center justify-center p-2 lg:items-center min-h-[220px] w-full"
          >
            <h3 className="text-[24px] md:text-[28px] font-semibold text-[#2C6BFF] mb-4 text-center lg:text-left">Window View Style</h3>
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
              className="flex flex-col w-full bg-[rgba(220,237,248,0.6)] rounded-xl overflow-hidden"
            >
              <div className="relative w-full h-[300px] aspect-[2/3]">
                <CompareSlider beforeImage={service.beforeImage} afterImage={service.afterImage} />
              </div>
              <h3 className="text-[22px] leading-[30px] font-semibold text-[#161817] md:text-[24px] md:leading-[24px] p-4">{service.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WindowViewStyles;
