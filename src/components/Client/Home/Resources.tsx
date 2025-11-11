"use client";
import Image from "next/image";
import MainTitle from "../Common/Title/MainTitle";
import Link from "next/link";

const Resources: React.FC = () => {
  const resources = [
    {
      id: 1,
      name: "Big/small Clouds",
      image: "/images/resource-1.jpg",
      link: "https://drive.google.com/drive/folders/1Yq5QonnlAQOC_UB99d2p2Kk_UGRiyuwr?usp=drive_fs",
    },
    {
      id: 2,
      name: "Soft clouds",
      image: "/images/resourse-2.jpg",
      link: "https://drive.google.com/open?id=1ZxzflPytEseGvGoNevKKDTPdDwXkEG1b&usp=drive_fs",
    },
    {
      id: 3,
      name: "Clear sky",
      image: "/images/resourse-3.jpg",
      link: "https://drive.google.com/drive/folders/1YhrCjkFxlnvhOIz4Nrz7VCDrBSXFwKA_?usp=drive_fs",
    },
    {
      id: 4,
      name: "Sunset/Twilight",
      image: "/images/resourse-4.jpg",
      link: "https://drive.google.com/drive/folders/1_3u-JNwKxvwGBSd3yh3eZWRX6-KOBs9A",
    },
    {
      id: 5,
      name: "Dusk/Night",
      image: "/images/resourse-5.jpg",
      link: "https://drive.google.com/drive/folders/1YiZZ67IiQ95nWlNNLjxFJeOUOesnPxcU",
    },
    {
      id: 6,
      name: "Grass",
      image: "/images/resourse-6.jpg",
      link: "https://drive.google.com/drive/folders/1WWSj9tfQjHoqwadmic1Xl-Rog9yP3kPX",
    },
    {
      id: 7,
      name: "Fires",
      image: "/images/resourse-7.jpg",
      link: "https://drive.google.com/drive/folders/1WV5QrU1IsYLejVHJL_VLkuG2Uj1fH_1j",
    },
    {
      id: 8,
      name: "TV screen",
      image: "/images/resourse-8.jpg",
      link: "http://kenphotos.test/wp-content/uploads/2024/03/TV-018-1024x683.jpg",
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12">
          {resources.map((resource, index) => (
            <Link href={resource.link} target="_blank" key={resource.id}>
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

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 md:left-4 md:transform-none md:translate-x-0">
                  <span className="bg-gray-600/70 text-white px-2 py-1 rounded-full shadow-sm backdrop-blur-sm text-center text-xs md:text-sm whitespace-nowrap">
                    {resource.name}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resources;
