"use client";

import Reviews from "@/components/Home/Review";
import SectionTitle from "@/components/UI/SectionTitle";
import Image from "next/image";

const timelineData = [
  {
    day: "Day 1",
    title: "1. Faith",
    content: `We believe that we will be happy when we develop every day. Development should not
      just be for ourselves but should be for others: that is family, friends, colleagues,
      community and customers, only then can we live a valuable life.`,
  },
  {
    day: "Day 2",
    title: "2. Mission",
    content: `True Color strives to create an environment for each person to be proud of
      themselves and their work, and to bring sustainable value to customers and the
      work community.`,
  },
  {
    day: "Day 3",
    title: "3. Business philosophy",
    content: `What drives us to develop is the trust of customers and partners. As long as
      others believe in True Color's personality, True color will work as if it were for
      itself. Trust from customers helps True Color constantly change to move forward,
      learning every day from useful things to bring even higher value to customers.`,
  },
  {
    day: "Day 4",
    title: "4. High quality standards",
    content: `Quality is our biggest priority, True Color edited photos meet the highest
      standards, satisfying the most demanding customers, we have customers who have
      been working with us for more than 5 years.`,
  },
];

const AboutPage = () => {
  return (
    <div className="">
      <div className="min-h-[350px] bg-white pt-24">
        <div className="max-w-content mx-auto">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="px-4 md:px-0 py-16 text-white text-left">
              <p className="text-[24px] text-gray-400 font-medium mb-4">
                About us
              </p>
              <h1 className="text-[32px] md:text-[48px] leading-tight font-[500] mb-6 text-black">
                We are True Color. A digital
                <br className="hidden md:block" />
                design and editing company
              </h1>
              <p className="max-w-3xl text-base md:text-lg  mb-12 text-black">
                We help our clients build their brand identity, and design,
                develop, launch, and support their digital products. Working
                with startups and real estate businesses from all over the
                world.
              </p>

              <div className="grid grid-cols-3 gap-4 max-w-md">
                <div className="text-left">
                  <p className="text-3xl md:text-4xl font-semibold text-black">
                    150+
                  </p>
                  <p className="text-sm text-gray-400 mt-1">team members</p>
                </div>
                <div className="text-left">
                  <p className="text-3xl md:text-4xl font-semibold text-black">
                    500+
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    completed projects
                  </p>
                </div>
                <div className="text-left">
                  <p className="text-3xl md:text-4xl font-semibold text-black">
                    10
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    years in business
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <div className="relative w-full h-full rounded-xloverflow-hidden">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src="/video.webm" type="video/webm" />
                  <source src="/video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative px-2">
        <div className="max-w-content pt-16 pb-24 md:pt-24 md:pb-36 mx-auto">
          <span className="notch-top-left" aria-hidden="true"></span>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-[160px]">
            {/* Cột trái */}
            <div className="space-y-20">
              <div>
                <div className="w-full h-[360px] xl:h-[440px] overflow-hidden rounded-xl border border-gray-50">
                  <Image
                    src="/images/view-5.jpg"
                    alt="VPN design"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-[#0D0D0D]">
                  Cyber VPN Mobile App Design Concept
                </h3>
                <p className="text-gray-600 mt-2">
                  Built a VPN mobile app design with a touch of cyberpunk and
                  sci-fi styles. Dark aesthetics reduce eye strain, while users
                  enjoy fast internet connections.
                </p>
                <ul className="mt-3 list-disc list-inside text-gray-700 text-sm">
                  <li>5 main screens for mobile app</li>
                  <li>Promotional landing page</li>
                  <li>Presentation-ready animation</li>
                  <li>Development-ready assets</li>
                </ul>
              </div>

              <div>
                <div className="w-full h-[360px] xl:h-[440px] overflow-hidden rounded-xl border border-gray-50">
                  <Image
                    src="/images/view-2.jpg"
                    alt="Coin Prime UI"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-[#0D0D0D]">
                  Crypto Coin Trade Platform UI
                </h3>
                <p className="text-gray-600 mt-2">
                  UI concept for a modern crypto trading platform with
                  simplified trading UX and dashboard analytics.
                </p>
                <ul className="mt-3 list-disc list-inside text-gray-700 text-sm">
                  <li>Clean dashboard UI</li>
                  <li>Multiple user roles</li>
                  <li>Real-time trading simulation</li>
                  <li>Exportable trading reports</li>
                </ul>
              </div>
            </div>
            {/* Cột phải với offset */}
            <div className=" space-y-20 md:mt-[100px]">
              <div className="hidden md:block">
                <h2 className="text-[32px] md:text-[48px] leading-tight text-center font-[500]  text-black">
                  Our Story
                </h2>
              </div>
              <div>
                <div className="w-full h-[360px] xl:h-[440px] overflow-hidden rounded-xl border border-gray-50">
                  <Image
                    src="/images/view-3.jpg"
                    alt="Crypto Exchange"
                    width={440}
                    height={440}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-[#0D0D0D]">
                  Cryptocurrency Exchange Website & Mobile App
                </h3>
                <p className="text-gray-600 mt-2">
                  Designed a cryptocurrency exchange mobile app and its promo
                  landing page for improved marketing strategies.
                </p>
                <ul className="mt-3 list-disc list-inside text-gray-700 text-sm">
                  <li>5 main screens for mobile app</li>
                  <li>Promotional landing page</li>
                  <li>Presentation-ready animation</li>
                  <li>Development-ready assets</li>
                </ul>
              </div>

              <div>
                <div className="w-full h-[360px] xl:h-[440px] overflow-hidden rounded-xl border border-gray-50">
                  <Image
                    src="/images/view-3.jpg"
                    alt="Crypto Exchange"
                    width={440}
                    height={440}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-[#0D0D0D]">
                  Cryptocurrency Exchange Website & Mobile App
                </h3>
                <p className="text-gray-600 mt-2">
                  Designed a cryptocurrency exchange mobile app and its promo
                  landing page for improved marketing strategies.
                </p>
                <ul className="mt-3 list-disc list-inside text-gray-700 text-sm">
                  <li>5 main screens for mobile app</li>
                  <li>Promotional landing page</li>
                  <li>Presentation-ready animation</li>
                  <li>Development-ready assets</li>
                </ul>
              </div>
            </div>
          </div>
          <span className="notch-bottom-right" aria-hidden="true"></span>
        </div>
      </div>

      <div className="pt-16 pb-24 md:pt-24 md:pb-36  bg-white relative">
        <div className="max-w-content mx-auto px-4">
          <span className="notch-top-right" aria-hidden="true"></span>

          <SectionTitle
            title="Just one week from start to finish"
            topText="Step"
            bottomText="Hear what our clients say about working with us"
          />
          <ul className="md:flex mt-16">
            {timelineData.map((item, index) => (
              <li
                key={index}
                className="md:flex-col flex-1 justify-between flex gap-10"
              >
                <div className="md:flex-row flex flex-col items-center gap-[12px] md:gap-[10px]">
                  <div className="h-3 w-3 md:mx-[4px]">
                    <svg
                      fill="none"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        height="23"
                        rx="11.5"
                        stroke="currentColor"
                        width="23"
                        x="0.5"
                        y="0.500488"
                      ></rect>
                      <circle
                        cx="12"
                        cy="12.0005"
                        fill="currentColor"
                        r="6"
                      ></circle>
                    </svg>
                  </div>
                  {/* Chỉ thêm đường kẻ nếu không phải phần tử cuối */}
                  {index !== timelineData.length - 1 && (
                    <div className="md:h-[1px] md:w-full h-full w-[1px] ml-[10px] md:ml-0 md:mt-3 bg-black"></div>
                  )}
                </div>
                <div className="md:pb-0 md:pr-5 pb-8 flex-1">
                  <span className="mb-[8px] block text-[#9D9DAD] text-[16px]">
                    {item.day}
                  </span>
                  <h3 className="mb-[16px] text-[24px] text-black">
                    {item.title}
                  </h3>
                  <p className="text-black text-[16px]">{item.content}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Reviews />
    </div>
  );
};

export default AboutPage;
