"use client";

import Image from "next/image";
import MainTitle from "../Common/Title/MainTitle";

import {
  RocketOutlined,
  HeartOutlined,
  CameraOutlined,
  LaptopOutlined,
  CalendarOutlined,
  GlobalOutlined,
  ThunderboltOutlined,
  SafetyOutlined,
} from "@ant-design/icons";

const data = [
  {
    title: "Get Started Today",
    description:
      "The way to get started is to quit talking and begin doing. At True Color, we understand that in the dynamic world of real estate, captivating visuals are paramount. We are a dedicated team committed to providing top-tier photo editing and visualization services that elevate your property listings.",
    icon: RocketOutlined,
    image: "view-1.jpg",
  },
  {
    title: "Passion for Perfection",
    description:
      "Founded with a love for real estate imagery, True Color delivers premium photo editing solutions designed to make every property shine. Our detail-oriented team transforms images with creativity and precision.",
    icon: HeartOutlined,
    image: "view-2.jpg",
  },
  {
    title: "Professional Real Estate Editing",
    description:
      "Whether you're an agent, photographer, or developer, we help maximize the impact of your property listings. Our expert editing showcases your properties in their best light to attract more buyers.",
    icon: CameraOutlined,
    image: "view-3.jpg",
  },
  {
    title: "High-Tech Excellence",
    description:
      "Using advanced software and proven techniques, our skilled team edits photos quickly and with consistent quality at competitive prices, helping thousands of clients boost their business.",
    icon: LaptopOutlined,
    image: "view-4.jpg",
  },
  {
    title: "Over a Decade of Experience",
    description:
      "With 10+ years in real estate photo editing, we offer services from color correction to virtual staging, day-to-dusk conversion, clutter removal, and more to enhance property appeal.",
    icon: CalendarOutlined,
    image: "view-5.jpg",
  },
  {
    title: "Trusted by Global Clients",
    description:
      "We work with photographers, brokers, and investors worldwide. Many integrate our services into their workflow, trusting us as an essential extension of their team.",
    icon: GlobalOutlined,
    image: "view-6.jpg",
  },
  {
    title: "Tailored for Faster Sales",
    description:
      "Our editing solutions focus on realistic, accurate colors and presentation to capture buyer interest quickly, helping accelerate the sales process for homes and luxury properties.",
    icon: ThunderboltOutlined,
    image: "view-7.jpg",
  },
  {
    title: "Precision Editing Techniques",
    description:
      "Following a rigorous 21-step process, we ensure every image meets the highest quality standards. From fixing underexposure to correcting lens flaws, we deliver flawless results every time.",
    icon: SafetyOutlined,
    image: "view-8.jpg",
  },
];

const OurStory: React.FC = () => {
  return (
    <section className="relative py-10 px-5 md:px-0 md:pt-[70px] md:pb-[120px]">
      <div className="max-w-content mx-auto">
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
        />
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-12 mt-12">
          {data.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index}>
                <div className="w-full h-[360px] xl:h-[440px] overflow-hidden rounded-xl border border-gray-50 mb-5">
                  <Image
                    src={`/images/${item.image}`}
                    alt={item.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <h3 className="text-[22px] leading-[30px] mb-4 font-semibold text-[#161817] md:text-[24px] md:leading-[24px] flex items-center gap-2">
                  <Icon style={{ color: "#2D6DFF" }} /> {item.title}
                </h3>
                <p className="text-gray-600 mt-2">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurStory;
