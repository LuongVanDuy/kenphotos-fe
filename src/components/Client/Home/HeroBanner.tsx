"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "../../../../public/css/ServiceSlide.css";
import { useScrollToForm } from "@/utils/scrollToForm";
import { fetchPublicServices } from "@/store/actions/services";
import { connect } from "react-redux";
import ServiceCard from "./HeroBannerCard";

const HeroBanner = ({
  fetchPublicServices,
  serviceList,
  serviceTotal,
  serviceLoading,
}: any) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  function handleQuery(page = 1, itemsPerPage = 6) {
    fetchPublicServices(
      {
        page,
        itemsPerPage,
        sortBy: "createdTime",
        sortDesc: true,
      },
      "featuredServices"
    );

    setPageNumber(page);
    setPageSize(itemsPerPage);
  }

  useEffect(() => {
    handleQuery(pageNumber, pageSize);
  }, [pageNumber, pageSize]);

  const swiperRef = useRef<SwiperCore | null>(null);
  const scrollToForm = useScrollToForm();

  return (
    <section className="w-full bg-section pt-[100px] md:pt-[180px] overflow-hidden">
      <div className="max-w-content mx-auto px-4">
        <div className="flex flex-col md:flex-row w-full min-h-[580px] pb-16 pt-3 md:py-0 gap-5 md:gap-0">
          <div className="w-[100%] lg:w-[50%] flex-1 h-full overflow-hidden">
            <div className="text-center md:text-left">
              <p className="text-[22px] leading-[30px] text-center md:text-[24px] md:text-left">
                True Color Real Estate Visual Solutions
              </p>
              <h1 className="p-0 my-5 text-[26px] leading-[32px] font-semibold max-w-full text-center md:text-left md:my-[35px] md:mb-[34px] md:text-[60px] md:leading-[66px]">
                Premium Editing & Visualization Services
              </h1>
              <p
                className="font-semibold bg-gradient-to-t from-[#184BF8] to-[#2C6BFF] bg-clip-text text-transparent -webkit-background-clip-text -webkit-text-fill-transparent
                text-[16px] leading-[20px] mt-2 mb-0 text-center
                md:text-[20px] md:leading-[25px] md:mb-6 md:mt-0 md:text-left"
              >
                Transform ordinary shots into stunning visuals that sell.
              </p>
              <p className="text-[18px] md:max-w-[90%]">
                From precise color correction and realistic virtual staging to
                immersive 3D visualizations, True Color transforms ordinary
                property photos into powerful marketing visuals. Our fast
                turnaround and attention to detail help you attract more buyers
                and close deals faster.
              </p>
              <div className="flex items-center flex-col md:flex-row gap-2 mt-8 ">
                <div className="flex items-center  gap-1">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className="w-6 h-6 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="flex items-center gap-1 text-gray-600">
                  <span>With 100+</span>
                  <span className="font-bold text-black">5-star</span>
                  <span>reviews on Google.</span>
                </p>
              </div>
            </div>
          </div>
          <div className="w-[100%] lg:w-[50%] flex-1 h-full overflow-hidden">
            <Swiper
              modules={[Navigation]}
              navigation
              loop={true}
              allowTouchMove={false}
              simulateTouch={false}
              spaceBetween={30}
              slidesPerView={1}
              effect="fade"
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
            >
              {serviceList.map((service: any, index: any) => {
                const beforeImage = service.images?.[0]?.beforeUrl || "";
                const afterImage = service.images?.[0]?.afterUrl || "";
                return (
                  <SwiperSlide key={`slide-${index}`}>
                    <ServiceCard
                      service={service}
                      beforeImage={beforeImage}
                      afterImage={afterImage}
                      swiperRef={swiperRef}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  const key = ownProps.dataKey;
  const publicData = state.services.publicData[key] || {
    list: [],
    total: 0,
    loading: true,
    error: null,
  };

  return {
    serviceList: publicData.list,
    serviceTotal: publicData.total,
    serviceLoading: publicData.loading,
    serviceError: publicData.error,
  };
};

const mapDispatchToProps = {
  fetchPublicServices,
};

export default connect(mapStateToProps, mapDispatchToProps)(HeroBanner);
