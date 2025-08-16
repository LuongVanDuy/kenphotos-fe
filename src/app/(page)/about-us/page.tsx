import FormService from "@/components/Client/Common/FormService";
import Reviews from "@/components/Client/Common/Review";
import OurStory from "@/components/Client/AboutUs/OurStory";
import OurMission from "@/components/Client/AboutUs/OurMission";
import HeroBanner from "@/components/Client/AboutUs/HeroBanner";
import { createMetadata } from "@/utils/metadata";

export async function generateMetadata() {
  return createMetadata({
    title: "About Us",
    description:
      "Learn more about KenPhotos and our mission to capture stunning moments.",
  });
}

const AboutPage = () => {
  return (
    <>
      <HeroBanner />
      <OurStory />
      <OurMission />
      <Reviews className="!bg-[#fff]" />
      <FormService dataKey="formService" />
    </>
  );
};

export default AboutPage;
