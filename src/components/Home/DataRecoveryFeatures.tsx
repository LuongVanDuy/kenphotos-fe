"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const DataRecoveryFeatures = () => {
  const features = [
    {
      image: "/images/data-recovery-1.webp",
      title: "Quick Scan",
      description: "Quick and deep scan mode with advanced algorithm",
    },
    {
      image: "/images/data-recovery-2.webp",
      title: "Free Preview",
      description: "Free preview of all recoverable files before recovery",
    },
    {
      image: "/images/data-recovery-3.webp",
      title: "File Filter",
      description: "Filter and locate the files you want to recover",
    },
    {
      image: "/images/data-recovery-4.webp",
      title: "Recovery Rate",
      description: "EaseUS has a successful recovery rate of 99.7%",
    },
  ];

  return (
    <section className="py-16 md:pb-32 bg-white">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Best Free Data Recovery <br /> Software for
            <span className="text-blue-600">Windows</span>
          </h2>
          <p className="text-lg text-gray-600 mb-4">Data Recovery Software</p>
          <p className="text-gray-600  mx-auto text-sm">
            Simple to use, but far from simple to be developed. It holds faith
            in providing a secure and smooth file recovery experience.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: 0.1 * index,
              }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-blue-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300 border border-blue-100"
            >
              <div className="flex justify-center mb-4">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={100}
                  height={100}
                />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed md:px-5">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default DataRecoveryFeatures;
