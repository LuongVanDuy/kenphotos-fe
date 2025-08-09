"use client";

import { motion } from "framer-motion";
import { CompareSlider } from "./CompareSlider";
import SectionTitle from "../UI/SectionTitle";
import { ArrowRightIcon } from "../Icons";

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
    <section className="bg-white pt-12 pb-24  md:pt-24 md:pb-40 relative">
      <div className="max-w-content mx-auto px-4 text-center">
        <span className="notch-top-right" aria-hidden="true"></span>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
        >
          {services.map((service, index) => {
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: 0.1 * index,
                }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="overflow-hidden bg-white rounded-[12px] shadow-lg transition-transform transform hover:bg-gray-100"
              >
                <div className="relative h-80 bg-gray-200">
                  <CompareSlider
                    beforeImage={service.beforeImage}
                    afterImage={service.afterImage}
                  />
                </div>

                <div className="p-6 text-start">
                  <h3 className="text-xl font-bold text-[#1C244B] mb-3 cursor-pointer">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 justify-center">
                      <div className="flex items-center">
                        <span className="text-yellow-400 text-lg">★</span>
                        <span className="font-semibold ml-1">
                          {service.rating}
                        </span>
                      </div>
                      <span className="text-gray-500 text-sm">
                        ({service.orders} orders)
                      </span>
                    </div>

                    <div className="flex items-center justify-center gap-2  text-center">
                      <span className="text-red-500 font-bold">
                        {service.discount}
                      </span>
                      <span className="text-gray-400 line-through">
                        {service.originalPrice}
                      </span>
                      <span className="text-green-600 font-bold text-lg">
                        {service.newPrice}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          className="px-[30px] py-[15px] text-[16px] mt-12 bg-black  text-white rounded-full text-sm font-medium hover:opacity-90 transition-all"
        >
          View all <ArrowRightIcon className="ml-2" />
        </motion.button>
      </div>
    </section>
  );
};

export default Services;
