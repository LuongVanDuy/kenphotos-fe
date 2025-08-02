"use client";

import React, { useRef, useEffect, useState } from "react";
import { CompareSlider } from "./CompareSlider";
import SectionTitle from "../UI/SectionTitle";

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
  const [activeId, setActiveId] = useState<number | null>(null);
  const sliderRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = sliderRefs.current.findIndex((ref) => ref === entry.target);
          if (entry.isIntersecting && index !== -1) {
            setActiveId(services[index].id);
          }
        });
      },
      {
        threshold: 0.5, // 50% in view
      }
    );

    sliderRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="bg-white pt-12 pb-24 md:pt-24 md:pb-40 relative">
      <div className="max-w-content mx-auto px-4">
        <span className="notch-top-right" aria-hidden="true" />

        <SectionTitle title="Your perfect window view" topText="Style options" />

        <div className="flex flex-col lg:flex-row w-full lg:items-start mt-12">
          <div className="lg:w-2/5 flex flex-col items-center lg:items-start lg:sticky lg:top-28 lg:self-start lg:h-fit">
            <h3 className="text-[24px] md:text-[28px] font-semibold mb-[32px] text-center lg:text-left"> Window View Styles Explained</h3>

            {services.map((service, index) => (
              <div
                key={service.id}
                className="mb-[24px] cursor-pointer"
                onClick={() => {
                  sliderRefs.current[index]?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
              >
                <h4 className={`text-[20px] transition-all  font-semibold mb-[8px] ${activeId === service.id ? "text-[#F9B02A]" : "text-[#171717]"}`}>
                  <span className="text-[#F9B02A]">{service.id}.</span> {service.title}
                </h4>
                <p>{service.desc}</p>
              </div>
            ))}
          </div>

          {/* Right - Sliders */}
          <div className="lg:w-3/5 mt-8 lg:mt-0 lg:pl-10 flex flex-col gap-6">
            {services.map((service, index) => (
              <div key={service.id} ref={(el: any) => (sliderRefs.current[index] = el)} className="flex flex-col gap-4 mb-8 scroll-mt-32">
                <h4 className="text-[20px] font-semibold text-[#1C244B]">{service.title}</h4>
                <div className="relative w-full h-[300px] md:h-[500px] aspect-[2/3] rounded-xl overflow-hidden shadow-xl">
                  <CompareSlider beforeImage={service.beforeImage} afterImage={service.afterImage} />
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
