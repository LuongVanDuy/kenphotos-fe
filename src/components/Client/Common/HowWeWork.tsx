"use client";
import Image from "next/image";
import React from "react";
import MainTitle from "./Title/MainTitle";

const HowWeWork = () => {
  const features = [
    {
      image: "/images/data-recovery-1.webp",
      title: "Send Us Your Photos",
      description:
        "Upload your property images through our secure system. We accept all popular formats and resolutions, ensuring a smooth start.",
    },
    {
      image: "/images/data-recovery-2.webp",
      title: "Choose Your Services",
      description:
        "Select from Photo Editing, 3D Visualizations, or Advanced Editing options—or let our experts recommend the best enhancements for your project.",
    },
    {
      image: "/images/data-recovery-3.webp",
      title: "We Edit with Precision",
      description:
        "Our skilled team applies accurate color correction, realistic retouching, and creative enhancements to make every image stand out.",
    },
    {
      image: "/images/data-recovery-4.webp",
      title: "Review & Receive",
      description:
        "Preview your edited photos, request adjustments if needed, and download the final high-quality images ready for marketing.",
    },
  ];

  return (
    <section className="py-10 md:py-[120px]">
      <div className="max-w-content mx-auto px-4">
        <MainTitle
          title={
            <>
              How We Work <br />
              <span className="inline-block bg-gradient-to-r from-[#2D6DFF] to-[#3BE5FF] bg-clip-text text-transparent -webkit-background-clip-text -webkit-text-fill-transparent">
                Simple Steps, Stunning Results
              </span>
            </>
          }
          content="From receiving your photos to delivering the final edits, True Color follows a streamlined process with clear steps, fast turnaround, and consistent quality to bring your property visuals to life."
        />

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {features.map((feature, index) => (
            <div
              key={index}
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
              <h3 className="text-[22px] leading-[30px] mb-4 font-semibold text-[#161817]   md:text-[24px] md:leading-[24px]">
                {feature.title}
              </h3>
              <p className=" text-[#161817] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
