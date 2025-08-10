"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface BenefitItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

const WhyChooseUs: React.FC = () => {
  const benefits: BenefitItem[] = [
    {
      id: "money-back-guarantee",
      title: "Money Back ",
      description:
        "Money back guarantee if you or the broker are not satisfied",
      image: "/images/choose-1.png",
    },
    {
      id: "professional",
      title: "Professional",
      description: "Professional editing and services",
      image: "/images/choose-2.png",
    },
    {
      id: "quick-turnaround",
      title: "Quick Turnaround",
      description: "12-18 hour turnaround (24 hours for virtual staging)",
      image: "/images/choose-3.png",
    },
    {
      id: "high-quality",
      title: "High Quality",
      description: "Consistent, best quality on every project",
      image: "/images/choose-4.png",
    },
    {
      id: "free-test",
      title: "Free Test",
      description: "Send free test photos before ordering",
      image: "/images/choose-5.png",
    },
    {
      id: "no-service-fees",
      title: "No Service Fees",
      description: "Real value, you only pay for each photo you need",
      image: "/images/choose-6.png",
    },
  ];

  return (
    <section
      className="py-8 md:py-24 bg-white"
      aria-labelledby="why-choose-us-heading"
    >
      <div className="max-w-content mx-auto px-4">
        <motion.header
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h1
            className="text-[20px] md:text-[55px] font-semibold normal-case not-italic py-[10px] no-underline leading-[1.2em] tracking-[0px] text-black-base"
            id="why-choose-us-heading"
          >
            WHY CHOOSE US
          </h1>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 md:gap-8 gap-4"
          role="list"
          aria-label="Benefits of choosing our services"
        >
          {benefits.map((benefit, index) => (
            <motion.article
              key={benefit.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: 0.1 * index,
              }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center"
              role="listitem"
            >
              <div className="mb-4 flex justify-center" aria-hidden="true">
                <Image
                  src={benefit.image}
                  alt={benefit.title}
                  width={115}
                  height={115}
                  className="object-contain w-[115px] h-[115px]"
                  priority
                />
              </div>
              <h3 className="text-[17px] md:text-[20px] font-semibold text-black-base mb-2  flex items-center justify-center">
                {benefit.title}
              </h3>
              <p className="text-sm text-text-gray-dark leading-relaxed min-h-[50px] md:min-h-[70px] flex items-center justify-center">
                {benefit.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
