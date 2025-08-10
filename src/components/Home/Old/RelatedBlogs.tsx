"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import SectionTitle from "../UI/SectionTitle";

const blogs = [
  {
    id: 1,
    title: "Best real estate video apps",
    date: "Feb 26, 2025",
    image: "/images/blog-2.jpg",
    slug: "best-real-estate-video-apps",
  },
  {
    id: 2,
    title: "Free furniture staging app",
    date: "Feb 26, 2025",
    image: "/images/blog-1.jpg",
    slug: "free-furniture-staging-app",
  },
  {
    id: 3,
    title: "Real Estate Photography Tips",
    date: "Feb 26, 2025",
    image: "/images/blog-3.jpg",
    slug: "real-estate-photography-tips",
  },
  {
    id: 4,
    title: "Mobile App UI/UX Design Trends 2025",
    date: "Mar 12, 2025",
    image: "/images/blog-4.jpg",
    slug: "mobile-app-ui-ux-trends-2025",
  },
  {
    id: 5,
    title: "Top Real Estate Marketing Strategies",
    date: "Mar 25, 2025",
    image: "/images/blog-3.jpg",
    slug: "top-real-estate-marketing-strategies",
  },
  {
    id: 6,
    title: "How to Take Better Interior Photos",
    date: "Apr 5, 2025",
    image: "/images/blog-2.jpg",
    slug: "how-to-take-better-interior-photos",
  },
  {
    id: 7,
    title: "Staging Techniques That Sell Homes",
    date: "Apr 18, 2025",
    image: "/images/blog-1.jpg",
    slug: "staging-techniques-that-sell",
  },
];

const RelatedBlogs = () => {
  const swiperRef = useRef<SwiperCore>();

  return (
    <div className="py-24 relative px-[10px]">
      <div className="max-w-content mx-auto  text-center ">
        <span className="notch-top-right" aria-hidden="true"></span>
        {/* <h3 className='text-[20px] md:text-[44px] text-start font-semibold text-[#0D0D0D]'>
          You may also like
        </h3> */}

        <SectionTitle
          title="Blog"
          bottomText="Explore ideas, tips, and stories from our team"
        />

        <div className="relative mt-8">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-0 md:-left-5 top-1/2 -translate-y-1/2 z-10 text-[32px] text-[#333] border border-[#eee] bg-white shadow-lg w-9 h-9 rounded-full flex items-center justify-center"
          >
            &lt;
          </button>
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={false}
            spaceBetween={20}
            slidesPerView={1.2}
            loop={true}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 1.5 },
              768: { slidesPerView: 2.5 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 3 },
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {blogs.map((blog) => (
              <SwiperSlide key={blog.id}>
                <div className="flex flex-col text-start">
                  <Link href={`/blog/${blog.slug}`}>
                    <div className="w-full h-[360px] xl:h-[440px] overflow-hidden rounded-xl border border-gray-50">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </Link>
                  <Link href={`/blog/${blog.slug}`}>
                    <h3 className="mt-3 text-xl font-semibold hover:text-[#00A3FF] cursor-pointer transition">
                      {blog.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-500 mt-1">{blog.date}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-0 md:-right-5 top-1/2 -translate-y-1/2 z-10 text-[32px] text-[#333] shadow-lg border border-[#eee] bg-white font-thin w-9 h-9 rounded-full flex items-center justify-center"
          >
            &gt;
          </button>
        </div>
        {/* <span className='notch-bottom-right' aria-hidden='true'></span> */}
      </div>
    </div>
  );
};

export default RelatedBlogs;
