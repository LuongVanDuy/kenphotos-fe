"use client";

import React from "react";
import WhyChooseUs from "./WhyChooseUs";
import Banner from "./Banner";
import Services from "./Services";
import Following from "./Following";
import Resources from "./Resources";
import WindowViewStyles from "./WindowViewStyles";
import PhotoEditingGuarantee from "./PhotoEditingGuarantee";
import FreeTestFiles from "./FreeTestFiles";
import TrustedBy from "./Trusted";
import Clients from "./Clients";
import AboutUs from "./AboutUs";
import Work from "./Work";

const Content: React.FC = () => {
  return (
    <div>
      <Banner />
      <WhyChooseUs />
      <Services />
      <Following/>
      <Resources/>
      <WindowViewStyles />
      <TrustedBy/>
      <AboutUs/>
      <Clients/>
      <Work/>
      <PhotoEditingGuarantee />
      <FreeTestFiles />
    </div>
  );
};

export default Content;
