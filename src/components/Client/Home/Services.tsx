"use client";

import ServiceCard from "../Service/ServiceCard";
import { ArrowRightIcon } from "@/components/Icons";
import { connect } from "react-redux";
import MainTitle from "../Common/Title/MainTitle";
import ServiceCardLoading from "../Services/ServiceCardLoading";
import { useRouter } from "next/navigation";

const Services = ({ serviceList, serviceTotal, serviceLoading }: any) => {
  const router = useRouter();

  const displayedServiceList =
    serviceList.length > 0 ? serviceList : Array(6).fill({});

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
            : serviceList && serviceTotal
            ? displayedServiceList.map((service: any, index: any) => (
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
              ))
            : null}
        </div>

        <button
          onClick={() => router.push("/services")}
          className="px-[30px] py-[15px] text-[18px] mt-10 md:mt-20 bg-[#2D6DFF] min-w-[180px]  text-white rounded-full text-sm font-medium hover:opacity-90"
        >
          View all <ArrowRightIcon className="ml-2" />
        </button>
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
  };

  return {
    serviceList: publicData.list,
    serviceTotal: publicData.total,
    serviceLoading: publicData.loading,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Services);
