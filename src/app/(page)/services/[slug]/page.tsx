"use client";

import "swiper/css";
import "swiper/css/navigation";
import "../../../../../public/css/ServiceSlide.css";
import FormService from "@/components/Client/Common/FormService";
import HowWeWork from "@/components/Client/Common/HowWeWork";
import Info from "@/components/Client/Service/Info";
import StepGrid from "@/components/Client/Service/StepGrid";
import Related from "@/components/Client/Service/Related";

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
