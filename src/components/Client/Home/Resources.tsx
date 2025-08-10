"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import MainTitle from "../Common/Title/MainTitle";

const Resources: React.FC = () => {
  const resources = [
    {
      id: 1,
      name: "Big/small Clouds",
      image: "/images/resource-1.jpg",
    },
    {
      id: 2,
      name: "Soft clouds",
      image: "/images/resourse-2.jpg",
    },
    {
      id: 3,
      name: "Clear sky",
      image: "/images/resourse-3.jpg",
    },
    {
      id: 4,
      name: "Sunset/Twilight",
      image: "/images/resourse-4.jpg",
    },
    {
      id: 5,
      name: "Dusk/Night",
      image: "/images/resourse-5.jpg",
    },
    {
      id: 6,
      name: "Grass",
      image: "/images/resourse-6.jpg",
    },
    {
      id: 7,
      name: "Fires",
      image: "/images/resourse-7.jpg",
    },
    {
      id: 8,
      name: "TV screen",
      image: "/images/resourse-8.jpg",
    },
  ];

  return (
    <section className="py-10 md:pt-[120px] md:pb-[120px] bg-[rgba(220,237,248,0.6)] relative">
      <div className="max-w-content mx-auto px-4 text-center">
        <MainTitle
          title={
            <>
              Access a Wide Range of Free and Useful <br />
              <span className="inline-block bg-gradient-to-r from-[#2D6DFF] to-[#3BE5FF] bg-clip-text text-transparent -webkit-background-clip-text -webkit-text-fill-transparent">
                Real Estate
              </span>{" "}
              Visual Resources
            </>
          }
          content="True Color offers a curated collection of high-quality photo editing samples, 3D visualization previews, and advanced retouching examples—all shared completely free.  You can download and use these resources to inspire your marketing projects or to see the transformative impact of our editing techniques."
        />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12"
        >
          {resources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: 0.1 * index,
              }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative w-full aspect-[4/3] rounded-[12px] overflow-hidden shadow-md group"
            >
              <Image
                src={resource.image}
                alt={resource.name}
                width={320}
                height={240}
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                priority
              />

              <div className="absolute bottom-4 left-4">
                <span className="bg-gray-600/70 text-white px-3 py-1 rounded-full shadow-sm backdrop-blur-sm">{resource.name}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Resources;
