"use client";

import ServiceCard from "../Service/ServiceCard";
import { ArrowRightIcon } from "@/components/Icons";
import { connect } from "react-redux";
import MainTitle from "../Common/Title/MainTitle";
import ServiceCardLoading from "../Services/ServiceCardLoading";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { fetchPublicServices } from "@/store/actions/services";

interface ServicesProps {
  dataKey: string;
  serviceList: any[];
  serviceTotal: number;
  serviceLoading: boolean;
  fetchPublicServices: (params: any, key: string) => void;
}

const Services: React.FC<ServicesProps> = ({
  dataKey,
  serviceList,
  serviceTotal,
  serviceLoading,
  fetchPublicServices,
}) => {
  const [visibleCount, setVisibleCount] = useState(6);
  const displayedServiceList = serviceList.slice(0, visibleCount);

  const handleQuery = (key: string, page = 1, itemsPerPage = 6) => {
    fetchPublicServices(
      {
        page,
        itemsPerPage,
        sortBy: "createdTime",
        sortDesc: true,
      },
      key
    );
  };

  const handleViewAll = () => {
    if (serviceList.length < serviceTotal) {
      handleQuery(dataKey, 1, serviceTotal);
    }
    setVisibleCount(serviceTotal);
  };

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
          {serviceLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <ServiceCardLoading key={index} />
              ))
            : displayedServiceList.map((service: any, index: number) => (
                <ServiceCard
                  key={service.id || index}
                  id={service.id}
                  index={index}
                  title={service.title}
                  content={service.content}
                  rating={service.rating}
                  orderCount={service.orderCount}
                  originalPrice={service.originalPrice}
                  discountedPrice={service.discountedPrice}
                  images={service.images}
                  slug={service.slug}
                />
              ))}
        </div>

        {/* Nút View All chỉ hiện nếu còn sản phẩm chưa hiển thị */}
        {visibleCount < serviceTotal && (
          <button
            onClick={handleViewAll}
            className="px-[30px] py-[15px] text-[18px] mt-10 md:mt-20 bg-[#2D6DFF] min-w-[180px] text-white rounded-full text-sm font-medium hover:opacity-90"
          >
            View all <ArrowRightIcon className="ml-2 w-5 h-5 inline-block" />
          </button>
        )}
      </div>
    </section>
  );
};

// mapStateToProps dùng dataKey từ props
const mapStateToProps = (state: any, ownProps: any) => {
  const key = ownProps.dataKey || "defaultKey";
  const publicData = state.services.publicData?.[key] || {};

  return {
    serviceList: publicData.list || [],
    serviceTotal: publicData.total || 0,
    serviceLoading: publicData.loading ?? true,
  };
};

const mapDispatchToProps = {
  fetchPublicServices,
};

export default connect(mapStateToProps, mapDispatchToProps)(Services);
