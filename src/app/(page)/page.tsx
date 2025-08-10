import FormService from "@/components/Client/Common/FormService";
import HowWeWork from "@/components/Client/Common/HowWeWork";
import Reviews from "@/components/Client/Common/Review";
import HeroBanner from "@/components/Client/Home/HeroBanner";
import Resources from "@/components/Client/Home/Resources";
import Services from "@/components/Client/Home/Services";
import WindowViewStyles from "@/components/Client/Home/WindowViewStyles";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <Services />
      <Resources />
      <WindowViewStyles />
      <Reviews />
      <HowWeWork />
      <FormService />
    </>
  );
}
