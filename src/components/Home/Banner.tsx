"use client";

import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import { CompareSlider } from "./CompareSlider";

const Banner: React.FC = () => {
  const service = {
    beforeImage: "/images/view-3.jpg",
    afterImage: "/images/view-2.jpg",
  };

  return (
    <section className="w-full bg-section ">
      <div className="flex flex-col md:flex-row w-full min-h-[580px] py-16 md:py-0">
        <div className="flex-1 flex items-center justify-center p-8 min-h-[200px] max-w-content">
          <div className="text-center md:text-left max-w-xl">
            <h1 className="text-[32px] md:text-[48px] font-semibold text-black-base leading-tight mb-6">
              Software design
              <br />
              and development company
            </h1>
            <p className="text-base md:text-lg text-[#4B4B4B] mb-8">
              Shakuro is a multidisciplinary design and development agency
              <br className="hidden md:block" />
              working with individual startups and enterprises worldwide.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button className="px-6 py-3 bg-black text-white rounded-full text-sm font-medium hover:opacity-90 transition-all">
                Get in touch
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 h-full">
          <div className="text-center md:text-left">
            <CompareSlider
              beforeImage={service.beforeImage}
              afterImage={service.afterImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
