"use client";

import { motion } from "framer-motion";
import { CompareSlider } from "./Old/CompareSlider";
import SectionTitle from "../UI/SectionTitle";
import { ArrowRightIcon } from "../Icons";
import MainTitle from "../UI/Title/MainTitle";
import ServiceCard from "../Service/ServiceCard";

const Services: React.FC = () => {
  const services = [
    {
      id: 1,
      title: "Single Exposure",
      beforeImage: "/images/view-3.jpg",
      afterImage: "/images/view-2.jpg",
      discount: "-20%",
      originalPrice: "US$1",
      newPrice: "US$0.8",
      description:
        "Taken with a phone or camera with one exposure per shot. This method of shooting is for Agents or homeowners take quick photos themselves, without looking out the window.",
      rating: 4.9,
      orders: "17.4k",
    },
    {
      id: 2,
      title: "HDR Bracket",
      beforeImage: "/images/view-3.jpg",
      afterImage: "/images/view-2.jpg",
      discount: "-17%",
      originalPrice: "US$1.2",
      newPrice: "US$1",
      description:
        "This technique helps to showcase the best aspects of a property by ensuring that both the interior and exterior are well-lit and detailed, even in challenging lighting conditions. 5 exposures is the best.",
      rating: 5,
      orders: "16k+",
    },
    {
      id: 3,
      title: "Flambient",
      beforeImage: "/images/view-3.jpg",
      afterImage: "/images/view-2.jpg",
      discount: "-20%",
      originalPrice: "US$1.5",
      newPrice: "US$1.2",
      description:
        'The "flambient" method for shooting real estate photography involves combining both flash and ambient light in your shots. Use multiple flash shots.',
      rating: 4.9,
      orders: "15.7k+",
    },
    {
      id: 4,
      title: "Virtual Staging",
      beforeImage: "/images/view-3.jpg",
      afterImage: "/images/view-2.jpg",
      discount: "-33%",
      originalPrice: "US$29.99",
      newPrice: "US$19.99",
      description:
        "Turn an empty room into a fully furnished room. Home staging is completed quickly on the computer rather than in person, requiring a lot less cost and labor",
      rating: 5,
      orders: "8.7k",
    },
    {
      id: 5,
      title: "Day To Twilight or Dusk",
      beforeImage: "/images/view-3.jpg",
      afterImage: "/images/view-2.jpg",
      discount: "-17%",
      originalPrice: "US$5.99",
      newPrice: "US$4.99",
      description:
        "Creating an artistically advanced sunset photo only from a daytime outdoor photo without requiring you to capture an additional picture.",
      rating: 4.9,
      orders: "6.3k",
    },
    {
      id: 6,
      title: "Water in Pool",
      beforeImage: "/images/view-3.jpg",
      afterImage: "/images/view-2.jpg",
      discount: "-17%",
      originalPrice: "US$5.99",
      newPrice: "US$4.99",
      description:
        "Houses with swimming pools are often valuable, sometimes the pool is dry or surrounded by dirt, we will remove the dirt or replace the water in the pool to help increase the value of your property",
      rating: 4.9,
      orders: "3.5k",
    },
  ];

  return (
    <section className="bg-white relative py-10 md:pt-[70px] md:pb-[120px]">
      <div className="max-w-content mx-auto px-4 text-center">
        <MainTitle
          title={
            <>
              Best Real Estate Services <br />
              Visual{" "}
              <span className="inline-block bg-gradient-to-r from-[#2D6DFF] to-[#3BE5FF] bg-clip-text text-transparent -webkit-background-clip-text -webkit-text-fill-transparent">
                Solutions
              </span>
            </>
          }
          subTitle="Photo Editing • 3D Visualizations • Advanced Editing"
          content="Easy to order, but crafted with mastery. We deliver vibrant, accurate, and captivating property visuals that inspire buyers and accelerate sales."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mt-12">
          {services.map((service, index) => {
            return (
              <ServiceCard
                key={service.id}
                index={index}
                id={service.id}
                beforeImage={service.beforeImage}
                afterImage={service.afterImage}
                title={service.title}
                description={service.description}
                rating={service.rating}
                orders={service.orders}
                discount={service.discount}
                originalPrice={service.originalPrice}
                newPrice={service.newPrice}
              />
            );
          })}
        </div>

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          className="px-[30px] py-[15px] text-[18px] mt-20 bg-[#2D6DFF] min-w-[180px]  text-white rounded-full text-sm font-medium hover:opacity-90"
        >
          View all <ArrowRightIcon className="ml-2" />
        </motion.button>
      </div>
    </section>
  );
};

export default Services;
