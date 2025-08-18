import React from "react";
import MainTitle from "../Common/Title/MainTitle";
import { CompareSlider } from "../Common/CompareSlider";
import CheckIcon from "@/components/Icons/CheckIcon";

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      beforeImage: "/images/view-4.jpg",
      afterImage: "/images/view-5.jpg",
      benefits: [
        {
          label: "Color & Light Adjustment",
          content:
            "Enhance white balance, brightness, contrast, tone, and sharpening to make images brighter, balanced, and more appealing.",
        },
        {
          label: "Composition & Technical Corrections",
          content:
            "Straighten vertical/horizontal lines, fix lens distortion, and remove dust spots to ensure professional image alignment.",
        },
        {
          label: "Sky & Interior Lighting Enhancement",
          content:
            "Replace skies, turn on or fix lights, and add fireplace flames to create vibrant and warm atmospheres.",
        },
      ],
    },
    {
      beforeImage: "/images/view-4.jpg",
      afterImage: "/images/view-5.jpg",
      benefits: [
        {
          label: "Water & Outdoor Landscape Improvement",
          content:
            "Enhance rivers, oceans, and pools, remove unwanted objects, and refresh lawns for a clean, natural look.",
        },
        {
          label: "Glass, Window & Reflection Correction",
          content:
            "Remove photographer reflections, reduce flash glare, and create clear window views showcasing beautiful surroundings.",
        },
        {
          label: "Screen & Device Editing",
          content:
            "Replace TV screens, add custom content, or create black/gradient effects to ensure consistency and focus.",
        },
      ],
    },
    {
      beforeImage: "/images/view-4.jpg",
      afterImage: "/images/view-5.jpg",
      benefits: [
        {
          label: "Remove Unwanted Details",
          content:
            "Eliminate small blemishes, sticky notes, sun flares, and blur license plates for clean, distraction-free photos.",
        },
        {
          label: "Atmosphere Enhancement",
          content:
            "Add warm lighting, clean pool water, and enhance interiors/exteriors to make properties more attractive.",
        },
        {
          label: "Drone & Aerial Photo Optimization",
          content:
            "Improve colors, correct perspectives, and boost vibrancy for breathtaking aerial and landscape photography.",
        },
      ],
    },
  ];

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

        <div className="mt-12 md:mt-16 space-y-16 md:space-y-24">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-8 md:gap-12 items-center`}
            >
              <div className="w-full lg:w-1/2">
                <div className="relative group">
                  <div className="relative w-full h-[300px] md:h-[450px] aspect-[2/3] rounded-xl overflow-hidden bg-gray-100 shadow-xl">
                    <CompareSlider
                      beforeImage={feature.beforeImage}
                      afterImage={feature.afterImage}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2 space-y-6">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <div key={benefitIndex} className="">
                    <div className="flex items-start gap-3">
                      <CheckIcon size={24} color="#2563eb" />
                      <h3 className="text-[22px] leading-[30px] mb-4 font-semibold text-[#161817] md:text-[24px] md:leading-[24px]">
                        {benefit.label}
                      </h3>
                    </div>
                    <p className=" text-[#161817] leading-relaxed">
                      {benefit.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
