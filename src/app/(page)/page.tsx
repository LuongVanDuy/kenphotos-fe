import FormService from "@/components/Common/FormService";
import HowWeWork from "@/components/Common/HowWeWork";
import Resources from "@/components/Home/Resources";
import Reviews from "@/components/Common/Review";
import Services from "@/components/Home/Services";
import WindowViewStyles from "@/components/Home/WindowViewStyles";
import HeroBanner from "@/components/Home/HeroBanner";
import WhyChooseUs from "@/components/Home/Old/WhyChooseUs";

export default function Home() {
  return (
    <>
      <HeroBanner />
      {/* <WhyChooseUs /> */}
      <Services />
      <Resources />
      <WindowViewStyles />
      <Reviews />
      <HowWeWork />
      <FormService />
    </>
  );
}
