"use client";

import Image from "next/image";
import MainTitle from "../Common/Title/MainTitle";

const OurStory: React.FC = () => {
  return (
    <section className="relative py-10 px-5 md:px-0 md:pt-[70px] md:pb-[120px]">
      <div className="max-w-content mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-[160px]">
          <div className="block md:hidden">
            <MainTitle
              title={
                <>
                  Our{" "}
                  <span className="inline-block bg-gradient-to-r from-[#2D6DFF] to-[#3BE5FF] bg-clip-text text-transparent -webkit-background-clip-text -webkit-text-fill-transparent">
                    Story
                  </span>
                </>
              }
              subTitle="Passionate About Perfecting Every Shot"
              content="From humble beginnings to a global clientele, True Color delivers vibrant, accurate, and market-ready images that make every property shine."
              align="left"
            />
          </div>
          <div className="space-y-20">
            <div>
              <div className="w-full h-[360px] xl:h-[440px] overflow-hidden rounded-xl border border-gray-50 mb-5">
                <Image
                  src="/images/view-5.jpg"
                  alt="VPN design"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <h3 className="text-[22px] leading-[30px] mb-4 font-semibold text-[#161817] md:text-[24px] md:leading-[24px]">Get Started Today</h3>
              <p className="text-gray-600 mt-2">
                The way to get started is to quit talking and begin doing. At True Color, we understand that in the dynamic world of real estate,
                captivating visuals are paramount. We are a dedicated team committed to providing top-tier photo editing and visualization services
                that elevate your property listings.
              </p>
            </div>

            <div>
              <div className="w-full h-[360px] xl:h-[440px] overflow-hidden rounded-xl border border-gray-50 mb-5">
                <Image
                  src="/images/view-5.jpg"
                  alt="VPN design"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <h3 className="text-[22px] leading-[30px] mb-4 font-semibold text-[#161817] md:text-[24px] md:leading-[24px]">
                Passion for Perfection
              </h3>
              <p className="text-gray-600 mt-2">
                Founded with a love for real estate imagery, True Color delivers premium photo editing solutions designed to make every property
                shine. Our detail-oriented team transforms images with creativity and precision.
              </p>
            </div>

            <div>
              <div className="w-full h-[360px] xl:h-[440px] overflow-hidden rounded-xl border border-gray-50 mb-5">
                <Image
                  src="/images/view-5.jpg"
                  alt="VPN design"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <h3 className="text-[22px] leading-[30px] mb-4 font-semibold text-[#161817] md:text-[24px] md:leading-[24px]">
                Professional Real Estate Editing
              </h3>
              <p className="text-gray-600 mt-2">
                Whether you're an agent, photographer, or developer, we help maximize the impact of your property listings. Our expert editing
                showcases your properties in their best light to attract more buyers.
              </p>
            </div>

            <div>
              <div className="w-full h-[360px] xl:h-[440px] overflow-hidden rounded-xl border border-gray-50 mb-5">
                <Image
                  src="/images/view-5.jpg"
                  alt="VPN design"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <h3 className="text-[22px] leading-[30px] mb-4 font-semibold text-[#161817] md:text-[24px] md:leading-[24px]">High-Tech Excellence</h3>
              <p className="text-gray-600 mt-2">
                Using advanced software and proven techniques, our skilled team edits photos quickly and with consistent quality at competitive
                prices, helping thousands of clients boost their business.
              </p>
            </div>
          </div>
          <div className=" space-y-20 md:mt-[60px]">
            <div className="hidden md:block">
              <MainTitle
                title={
                  <>
                    Our{" "}
                    <span className="inline-block bg-gradient-to-r from-[#2D6DFF] to-[#3BE5FF] bg-clip-text text-transparent -webkit-background-clip-text -webkit-text-fill-transparent">
                      Story
                    </span>
                  </>
                }
                subTitle="Passionate About Perfecting Every Shot"
                content="From humble beginnings to a global clientele, True Color delivers vibrant, accurate, and market-ready images that make every property shine."
                align="left"
              />
            </div>
            <div>
              <div className="w-full h-[360px] xl:h-[440px] overflow-hidden rounded-xl border border-gray-50 mb-5">
                <Image
                  src="/images/view-3.jpg"
                  alt="Crypto Exchange"
                  width={440}
                  height={440}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <h3 className="text-[22px] leading-[30px] mb-4 font-semibold text-[#161817] md:text-[24px] md:leading-[24px]">
                Over a Decade of Experience
              </h3>
              <p className="text-gray-600 mt-2">
                With 10+ years in real estate photo editing, we offer services from color correction to virtual staging, day-to-dusk conversion,
                clutter removal, and more to enhance property appeal.
              </p>
            </div>
            <div>
              <div className="w-full h-[360px] xl:h-[440px] overflow-hidden rounded-xl border border-gray-50 mb-5">
                <Image
                  src="/images/view-3.jpg"
                  alt="Crypto Exchange"
                  width={440}
                  height={440}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <h3 className="text-[22px] leading-[30px] mb-4 font-semibold text-[#161817] md:text-[24px] md:leading-[24px]">
                Trusted by Global Clients
              </h3>
              <p className="text-gray-600 mt-2">
                We work with photographers, brokers, and investors worldwide. Many integrate our services into their workflow, trusting us as an
                essential extension of their team.
              </p>
            </div>

            <div>
              <div className="w-full h-[360px] xl:h-[440px] overflow-hidden rounded-xl border border-gray-50 mb-5">
                <Image
                  src="/images/view-3.jpg"
                  alt="Crypto Exchange"
                  width={440}
                  height={440}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <h3 className="text-[22px] leading-[30px] mb-4 font-semibold text-[#161817] md:text-[24px] md:leading-[24px]">
                Tailored for Faster Sales
              </h3>
              <p className="text-gray-600 mt-2">
                Our editing solutions focus on realistic, accurate colors and presentation to capture buyer interest quickly, helping accelerate the
                sales process for homes and luxury properties.
              </p>
            </div>

            <div>
              <div className="w-full h-[360px] xl:h-[440px] overflow-hidden rounded-xl border border-gray-50 mb-5">
                <Image
                  src="/images/view-3.jpg"
                  alt="Crypto Exchange"
                  width={440}
                  height={440}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <h3 className="text-[22px] leading-[30px] mb-4 font-semibold text-[#161817] md:text-[24px] md:leading-[24px]">
                Precision Editing Techniques
              </h3>
              <p className="text-gray-600 mt-2">
                Following a rigorous 21-step process, we ensure every image meets the highest quality standards. From fixing underexposure to
                correcting lens flaws, we deliver flawless results every time. Hỏi ChatGPT
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
