"use client";
import Image from "next/image";
import SectionTitle from "../UI/SectionTitle";

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
    <section className="pt-12 pb-24  md:pt-24 md:pb-40 bg-section relative">
      <div className="max-w-content mx-auto px-4 text-center">
        <span className="notch-top-left" aria-hidden="true"></span>
        {/* <h3 className="text-[25px] md:text-[45px] font-semibold normal-case not-italic no-underline leading-[1.2em] tracking-[0px] text-[#1C244B] mb-6">
          Below are our resources
        </h3>
        <p className="text-gray-600 text-[15px] md:text-[19px]">
          You can choose if you want or let us decide
        </p>
        <p className="text-gray-600 text-[15px] md:text-[19px] mb-4">
          "This resource is shared for free with everyone, you can download and
          use it for free. The power of giving"
        </p>
        <span className="text-blue-600 font-medium cursor-pointer hover:underline mb-12 inline-block">
          (12k downloaded)
        </span> */}

        <SectionTitle
          title=" Below are our resources​"
          topText="resources"
          bottomText="This resource is shared for free with everyone, you can download and
          use it for free. The power of giving"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12">
          {resources.map((resource) => (
            <div
              key={resource.id}
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
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <span className="text-white text-lg md:text-xl font-semibold px-2 text-center drop-shadow-md">
                  {resource.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resources;
