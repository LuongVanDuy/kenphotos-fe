"use client";

import "swiper/css";
import "swiper/css/navigation";
import "../../../../../public/css/ServiceSlide.css";
import FormService from "@/components/Common/FormService";
import HowWeWork from "@/components/Common/HowWeWork";
import Related from "@/components/Service/Related";
import StepGrid from "@/components/Service/StepGrid";
import Info from "@/components/Service/Info";

const ServiceDetail = ({ params }: { params: { slug: string[] } }) => {
  const { slug } = params;

  return (
    <>
      <Info />
      <StepGrid />
      <Related />
      <HowWeWork />
      <FormService />
    </>
  );
};

export default ServiceDetail;
