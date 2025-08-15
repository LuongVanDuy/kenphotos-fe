"use client";

import { fetchPublicServices } from "@/store/actions/services";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import MainTitle from "@/components/Client/Common/Title/MainTitle";
import ServiceCard from "@/components/Client/Service/ServiceCard";
import ServiceFilterBar from "@/components/Client/Services/ServiceFilterBar";
import ServiceCardLoading from "@/components/Client/Services/ServiceCardLoading";
import { Empty } from "antd";

const ServiceList = ({ fetchPublicServices, serviceList, serviceTotal = 1, serviceLoading }: any) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  function handleQuery(search = "", category = 0, page = 1, itemsPerPage = 6) {
    fetchPublicServices(
      {
        search,
        category,
        page,
        itemsPerPage,
        sortBy: "createdTime",
        sortDesc: true,
      },
      "defaultKey"
    );

    setPageNumber(page);
    setPageSize(itemsPerPage);
  }

  useEffect(() => {
    handleQuery(search, category, pageNumber, pageSize);
  }, [pageNumber, pageSize]);

  const onCategoryChange = (value: number) => {
    setCategory(value);
    handleQuery(search, value, 1, pageSize);
  };

  const displayedServiceList = serviceList.length > 0 ? serviceList : Array(6).fill({});

  const totalPages = Math.ceil(serviceTotal / pageSize);

  return (
    <>
      <section className="py-10 md:pt-[180px]">
        <div className="max-w-content px-4 mx-auto">
          <div className="max-w-2xl mb-8">
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
              align="left"
            />
          </div>

          <ServiceFilterBar
            keyword={search}
            onKeywordChange={setSearch}
            onSearch={() => handleQuery(search, category, 1, 6)}
            category={category}
            onCategoryChange={onCategoryChange}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mt-12">
            {serviceLoading
              ? Array.from({ length: 6 }).map((_, index) => <ServiceCardLoading key={index} />)
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

          {!serviceLoading && totalPages === 0 && (
            <div className="w-full flex justify-center py-16">
              <Empty description="No services found" />
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: totalPages }).map((_, idx) => {
                const page = idx + 1;
                const isActive = page === pageNumber;
                return (
                  <button
                    key={page}
                    className={`px-4 w-10 h-10 py-2 rounded ${isActive ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                    onClick={() => handleQuery(search, category, page, pageSize)}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  const key = ownProps.dataKey || "defaultKey";
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

export default connect(mapStateToProps, mapDispatchToProps)(ServiceList);
