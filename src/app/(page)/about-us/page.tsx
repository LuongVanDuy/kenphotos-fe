"use client";

import FormService from "@/components/Client/Common/FormService";
import Reviews from "@/components/Client/Common/Review";
import OurStory from "@/components/Client/AboutUs/OurStory";
import OurMission from "@/components/Client/AboutUs/OurMission";
import HeroBanner from "@/components/Client/AboutUs/HeroBanner";

const AboutPage = () => {
  return (
    <>
      <HeroBanner />
      <OurStory />
      <OurMission />
      <Reviews className="!bg-[#fff]" />
      <FormService />
    </>
  );
};

export default AboutPage;
