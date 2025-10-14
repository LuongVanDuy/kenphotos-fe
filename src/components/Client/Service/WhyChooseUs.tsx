"use client";

import React, { useState } from "react";
import MainTitle from "../Common/Title/MainTitle";
import { CompareSlider } from "../Common/CompareSlider";
import CheckIcon from "@/components/Icons/CheckIcon";
import { motion } from "framer-motion";
import { getImageUrl } from "@/utils/imageUrl";

const WhyChooseUs: React.FC<{ steps: any }> = ({ steps }) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number[]>([0, 0, 0]); // Track active step for each feature

  // Parse steps if it's a JSON string
  const parsedSteps = React.useMemo(() => {
    if (!steps) return [];

    try {
      // If steps is a string, parse it
      if (typeof steps === "string") {
        const parsed = JSON.parse(steps);
        return parsed;
      }
      if (Array.isArray(steps)) {
        return steps;
      }
      return [steps];
    } catch (error) {
      return [];
    }
  }, [steps]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const item: any = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const handleStepClick = (featureIndex: number, stepIndex: number) => {
    const newActiveSteps = [...activeStepIndex];
    newActiveSteps[featureIndex] = stepIndex;
    setActiveStepIndex(newActiveSteps);
  };

  if (!parsedSteps || parsedSteps.length === 0) {
    return null; // Don't render the section if there are no steps
  }

  return (
    <section className="bg-white relative py-10 md:pt-[70px] md:pb-[120px]">
      <div className="max-w-content mx-auto px-4">
        <MainTitle
          title={
            <>
              Why{" "}
              <span className="inline-block bg-gradient-to-r from-[#2D6DFF] to-[#3BE5FF] bg-clip-text text-transparent -webkit-background-clip-text -webkit-text-fill-transparent">
                Choose Us
              </span>
            </>
          }
          subTitle="Trusted • Professional • Reliable"
          content="From advanced photo editing to stunning 3D visualizations, we focus on quality, speed, and consistency. Our dedicated team ensures every project enhances your property’s value and gives you a competitive edge."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 md:mt-16 space-y-16 md:space-y-24"
        >
          {parsedSteps?.map((feature: any, featureIndex: any) => {
            const activeStep = feature.steps[activeStepIndex[featureIndex]];
            return (
              <motion.div
                key={featureIndex}
                variants={item}
                className={`flex flex-col ${
                  featureIndex % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-8 md:gap-12 items-center`}
              >
                <div className="w-full lg:w-1/2">
                  <div className="relative group">
                    <div className="relative w-full h-[300px] md:h-[450px] aspect-[2/3] rounded-xl overflow-hidden bg-gray-100 shadow-xl">
                      {activeStep?.type === "image" &&
                      activeStep?.beforeUrl &&
                      activeStep?.afterUrl ? (
                        <CompareSlider
                          beforeImage={getImageUrl(activeStep.beforeUrl)}
                          afterImage={getImageUrl(activeStep.afterUrl)}
                        />
                      ) : activeStep?.type === "video" &&
                        activeStep?.videoUrl ? (
                        <div className="relative w-full h-full">
                          <iframe
                            src={
                              activeStep.videoUrl
                                .replace("watch?v=", "embed/")
                                .split("&")[0]
                            }
                            title={activeStep.title}
                            className="w-full h-full"
                            allowFullScreen
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                          <p>No preview available</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-1/2 space-y-6">
                  <div className="mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#161817] mb-2">
                      Feature {featureIndex + 1}
                    </h2>
                    <p className="text-[#161817] leading-relaxed opacity-80">
                      Professional photo editing services for enhanced visual
                      appeal
                    </p>
                  </div>
                  {feature.steps.map((step: any, stepIndex: any) => (
                    <div
                      key={stepIndex}
                      className={`cursor-pointer group transition-all duration-200 ${
                        activeStepIndex[featureIndex] === stepIndex
                          ? "bg-blue-50 border-l-4 border-blue-500"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => handleStepClick(featureIndex, stepIndex)}
                    >
                      <div className="flex items-start gap-3 p-4 rounded-lg">
                        <CheckIcon
                          size={24}
                          color={
                            activeStepIndex[featureIndex] === stepIndex
                              ? "#2563eb"
                              : "#6b7280"
                          }
                        />
                        <div className="flex-1">
                          <h3
                            className={`text-[18px] leading-[26px] mb-2 font-semibold md:text-[20px] md:leading-[28px] transition-colors duration-200 ${
                              activeStepIndex[featureIndex] === stepIndex
                                ? "text-[#2563eb]"
                                : "text-[#161817] group-hover:text-[#2563eb]"
                            }`}
                          >
                            {step.title}
                          </h3>
                          <p className="text-[#161817] leading-relaxed opacity-80">
                            {step.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
