"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { fetchPublicPost, fetchPublicPosts } from "@/store/actions/posts";
import { useParams } from "next/navigation";
import { getImageUrl } from "@/utils";
import { message, Spin } from "antd";

type Blog = {
  id: number;
  title: string;
  date: string;
  image: string;
  slug: string;
};

const blogs: Blog[] = [
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

const BlogDetailPage = ({
  fetchPublicPost,
  postDetail,
  fetchPublicPosts,
  postList,
  postLoading,
}: any) => {
  const swiperRef = useRef<SwiperCore>();
  const params = useParams();
  const slug = Array.isArray(params?.slug)
    ? params.slug.join("/")
    : params?.slug;

  const url = `http://localhost:3000/blog/${postDetail.slug}`;

  useEffect(() => {
    if (slug) {
      fetchPublicPost(slug);
    }
  }, [slug]);

  useEffect(() => {
    if (
      postDetail?.slug &&
      Array.isArray(postDetail.categories) &&
      postDetail.categories.length > 0 &&
      postDetail.categories[0].category?.slug
    ) {
      fetchPublicPosts({
        limitWords: 0,
        excludePostSlug: postDetail.slug,
        categorySlug: postDetail.categories[0].category.slug,
        page: 1,
        itemsPerPage: 6,
      });
    }
  }, [postDetail]);

  const handleCopyLink = () => {
    const fullUrl = `http://localhost:3000/blog/${postDetail.slug}`;
    navigator.clipboard
      .writeText(fullUrl)
      .then(() => {
        message.success("Đã sao chép liên kết!");
      })
      .catch(() => {
        message.error("Sao chép liên kết thất bại!");
      });
  };

  if (postLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="max-w-content mx-auto px-4 py-16 text-center">
      <h1 className="text-[20px] md:text-[44px]  font-semibold  text-[#0D0D0D]">
        {postDetail.title}
      </h1>
      {postDetail.excerpt && (
        <p className="text-base md:text-lg text-gray-600 mt-6 max-w-3xl mx-auto">
          {postDetail.excerpt}
        </p>
      )}
      <div className="mt-10 text-sm text-gray-500">
        Written by{" "}
        <span className="font-medium text-gray-700">
          {postDetail.author?.firstName} {postDetail.author?.lastName}
        </span>
        &nbsp;|&nbsp; Updated:{" "}
        {new Date(postDetail.updatedTime).toLocaleDateString("vi-VN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </div>

      {postDetail?.thumbnail && (
        <div className="mt-16 w-full aspect-[5/2] relative overflow-hidden rounded-xl shadow">
          <Image
            src={getImageUrl(postDetail.thumbnail)}
            alt={postDetail.title || "Blog detail image"}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="relative flex gap-10 mt-16">
        <div className="hidden lg:flex flex-col gap-6 sticky top-32 h-fit text-gray-400">
          <a
            href={`https://twitter.com/intent/tweet?url=${url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="inline-flex shrink-0 fill-current"
              focusable="false"
              role="presentation"
              style={{ width: "32px", height: "32px" }}
              width="32"
              height="32"
            >
              <defs>
                <symbol width="32" height="32" viewBox="0 0 32 32" id="x">
                  <path
                    d="M23.2044 4.6665H27.0469L18.652 14.2678L28.528 27.3332H20.7952L14.7387 19.4092L7.8085 27.3332H3.96359L12.9428 17.0634L3.46875 4.6665H11.3979L16.8725 11.9094L23.2044 4.6665ZM21.8557 25.0316H23.9849L10.2409 6.84716H7.95603L21.8557 25.0316Z"
                    fill="#AFAFBD"
                  />
                </symbol>
              </defs>
              <use xlinkHref="#x" />
            </svg>
          </a>

          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="inline-flex shrink-0 fill-current"
              focusable="false"
              role="presentation"
              style={{ width: "32px", height: "32px" }}
              width="32"
              height="32"
            >
              <defs>
                <symbol
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  id="share-fb"
                >
                  <path
                    d="M12.78 28.9412V20.0746H10.0282V15.9998H12.78V14.2442C12.78 9.70576 14.8333 7.60428 19.2866 7.60428C20.1297 7.60428 21.5852 7.76946 22.183 7.93465V11.6258C21.8681 11.5939 21.3185 11.5776 20.6414 11.5776C18.4548 11.5776 17.6118 12.4043 17.6118 14.559V15.9998H21.9697L21.223 20.074H17.6178V29.2368C24.2196 28.437 29.3346 22.8158 29.3346 15.9998C29.3346 8.63613 23.365 2.6665 16.0013 2.6665C8.6376 2.6665 2.66797 8.63613 2.66797 15.9998C2.66797 22.253 6.97214 27.5002 12.78 28.9412Z"
                    fill="#AFAFBD"
                  />
                </symbol>
              </defs>
              <use xlinkHref="#share-fb" />
            </svg>
          </a>

          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="inline-flex shrink-0 fill-current"
              focusable="false"
              role="presentation"
              style={{ width: "32px", height: "32px" }}
              width="32"
              height="32"
            >
              <defs>
                <symbol
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  id="share-in"
                >
                  <path
                    d="M26.2 4H5.8C5.32261 4 4.86477 4.18964 4.52721 4.52721C4.18964 4.86477 4 5.32261 4 5.8V26.2C4 26.6773 4.18964 27.1352 4.52721 27.4728C4.86477 27.8104 5.32261 28 5.8 28H26.2C26.6773 28 27.1352 27.8104 27.4728 27.4728C27.8104 27.1352 28 26.6773 28 26.2V5.8C28 5.32261 27.8104 4.86477 27.4728 4.52721C27.1352 4.18964 26.6773 4 26.2 4ZM11.2 24.4H7.6V13.6H11.2V24.4ZM9.4 11.5C8.98741 11.4882 8.58747 11.3551 8.25011 11.1173C7.91275 10.8795 7.65293 10.5475 7.50316 10.1629C7.35337 9.77832 7.32025 9.35809 7.40793 8.95476C7.4956 8.55144 7.7002 8.18288 7.99613 7.89517C8.29208 7.60745 8.66624 7.41332 9.07188 7.33704C9.47752 7.26075 9.89664 7.30569 10.2769 7.46625C10.6571 7.6268 10.9816 7.89585 11.2098 8.23977C11.438 8.58371 11.5598 8.98725 11.56 9.4C11.5505 9.96441 11.318 10.5021 10.9133 10.8956C10.5085 11.2891 9.96447 11.5064 9.4 11.5ZM24.4 24.4H20.8V18.712C20.8 17.008 20.08 16.396 19.144 16.396C18.8696 16.4143 18.6015 16.4865 18.3551 16.6088C18.1087 16.7309 17.8888 16.9007 17.7081 17.108C17.5276 17.3155 17.3896 17.5565 17.3024 17.8173C17.2152 18.0781 17.1804 18.3536 17.2 18.628C17.194 18.6839 17.194 18.7401 17.2 18.796V24.4H13.6V13.6H17.08V15.16C17.4311 14.626 17.9133 14.1911 18.4807 13.8969C19.048 13.6028 19.6813 13.4592 20.32 13.48C22.18 13.48 24.352 14.512 24.352 17.872L24.4 24.4Z"
                    fill="#AFAFBD"
                  />
                </symbol>
              </defs>
              <use xlinkHref="#share-in" />
            </svg>
          </a>

          <a
            href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
              url
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="inline-flex shrink-0 fill-current"
              focusable="false"
              role="presentation"
              style={{ width: "32px", height: "32px" }}
              width="32"
              height="32"
            >
              <defs>
                <symbol
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  id="share-pin"
                >
                  <path
                    d="M16.0013 2.6665C8.63393 2.6665 2.66797 8.63696 2.66797 16.0098C2.66797 21.6597 6.17148 26.4882 11.1364 28.4316C11.0163 27.3697 10.9162 25.7669 11.1765 24.6049C11.4167 23.563 12.738 17.9733 12.738 17.9733C12.738 17.9733 12.3376 17.1718 12.3376 15.9898C12.3376 14.1265 13.4188 12.7441 14.7401 12.7441C15.8812 12.7441 16.4217 13.6057 16.4217 14.6274C16.4217 15.7694 15.701 17.4925 15.3206 19.0752C15.0002 20.3976 15.9813 21.4794 17.3026 21.4794C19.6649 21.4794 21.4868 18.975 21.4868 15.3688C21.4868 12.1832 19.1845 9.93924 15.9212 9.93924C12.1374 9.93924 9.8952 12.7842 9.8952 15.7293C9.8952 16.8713 10.3356 18.1136 10.8962 18.7746C10.9963 18.9149 11.0163 19.0152 10.9963 19.1553C10.8962 19.5761 10.676 20.4777 10.6359 20.658C10.5759 20.8984 10.4357 20.9585 10.1955 20.8382C8.53384 20.0569 7.4928 17.6326 7.4928 15.6693C7.4928 11.4619 10.5559 7.59513 16.3016 7.59513C20.9262 7.59513 24.5098 10.9009 24.5098 15.2886C24.5098 19.8766 21.6069 23.5832 17.6029 23.5832C16.2616 23.5832 14.9802 22.8818 14.5398 22.0605C14.5398 22.0605 13.8792 24.6049 13.719 25.226C13.4188 26.388 12.5979 27.8305 12.0574 28.7321C13.2986 29.1128 14.62 29.3332 16.0013 29.3332C23.3686 29.3332 29.3346 23.3628 29.3346 15.9898C29.3346 8.63696 23.3686 2.6665 16.0013 2.6665Z"
                    fill="#AFAFBD"
                  />
                </symbol>
              </defs>
              <use xlinkHref="#share-pin" />
            </svg>
          </a>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleCopyLink();
            }}
            className="hover:text-black transition"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="inline-flex shrink-0 fill-current"
              focusable="false"
              role="presentation"
              style={{ width: "32px", height: "32px" }}
              width="32"
              height="32"
            >
              <defs>
                <symbol
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  id="copy-link"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M25.2179 6.78323C22.3956 3.96092 17.8198 3.96092 14.9975 6.78323L13.7088 8.0719C13.3182 8.46241 12.6851 8.4624 12.2945 8.07187C11.904 7.68134 11.904 7.04817 12.2946 6.65766L13.5833 5.36902C17.1866 1.76567 23.0288 1.76566 26.6321 5.36902C30.2354 8.97236 30.2355 14.8145 26.6322 18.4178L25.3407 19.7094C24.9502 20.1 24.317 20.1 23.9265 19.7095C23.536 19.319 23.5359 18.6858 23.9264 18.2953L25.2179 17.0037C28.0402 14.1814 28.0402 9.60553 25.2179 6.78323ZM20.0417 11.9594C20.4323 12.3499 20.4323 12.9831 20.0417 13.3736L13.3751 20.0403C12.9845 20.4308 12.3514 20.4308 11.9609 20.0403C11.5703 19.6497 11.5703 19.0166 11.9609 18.6261L18.6275 11.9594C19.0181 11.5689 19.6512 11.5689 20.0417 11.9594ZM8.08021 12.2862C8.47074 12.6767 8.47075 13.3099 8.08023 13.7004L6.78471 14.996C3.9624 17.8183 3.9624 22.3942 6.7847 25.2165C9.607 28.0387 14.1829 28.0387 17.0051 25.2165L18.2913 23.9303C18.6818 23.5398 19.315 23.5398 19.7055 23.9303C20.096 24.3209 20.096 24.954 19.7055 25.3445L18.4193 26.6307C14.816 30.234 8.97384 30.234 5.37049 26.6307C1.76714 23.0274 1.76712 17.1851 5.37048 13.5818L6.666 12.2862C7.05651 11.8957 7.68968 11.8957 8.08021 12.2862Z"
                    fill="#AFAFBD"
                  />
                </symbol>
              </defs>
              <use xlinkHref="#copy-link" />
            </svg>
          </a>
        </div>

        {/* Contents section */}
        <div
          className="flex-1 text-start m-auto w-full sm:max-w-[592px] md:max-w-[600px] lg:max-w-[690px] xl:max-w-[792px] mb-24"
          dangerouslySetInnerHTML={{ __html: postDetail.content }}
        />
      </div>

      {postList && postList.length > 0 && (
        <div>
          <h3 className="text-[20px] md:text-[44px] text-start font-semibold text-[#0D0D0D]">
            You may also like
          </h3>

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
                delay: 5000,
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
              {postList.map((blog: any) => (
                <SwiperSlide key={blog.id}>
                  <div className="flex flex-col text-start">
                    <Link href={`/blog/${blog.slug}`}>
                      <div className="w-full h-[360px] xl:h-[440px] overflow-hidden rounded-xl border border-gray-50">
                        <img
                          src={getImageUrl(blog.thumbnail)}
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
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(blog.createdTime).toLocaleDateString("vi-VN")}
                    </p>
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
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  postDetail: state.posts.detailPublic,
  postList: state.posts.listPublic,
  postLoading: state.posts.loading,
});

const mapDispatchToProps = {
  fetchPublicPost: fetchPublicPost,
  fetchPublicPosts: fetchPublicPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogDetailPage);
