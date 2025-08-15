import FormService from "@/components/Client/Common/FormService";
import HowWeWork from "@/components/Client/Common/HowWeWork";
import Reviews from "@/components/Client/Common/Review";
import HeroBanner from "@/components/Client/Home/HeroBanner";
import Resources from "@/components/Client/Home/Resources";
import Services from "@/components/Client/Home/Services";
import WindowViewStyles from "@/components/Client/Home/WindowViewStyles";
import { createMetadata } from "@/utils/metadata";

export async function generateMetadata() {
  return createMetadata({
    title: "Home",
    description: "Welcome to KenPhotos, your go-to destination for stunning photography and videography services.",
  });
}

export default function Home() {
  return (
    <>
      <HeroBanner />
      <Services dataKey="featuredServices" />
      <Resources />
      <WindowViewStyles />
      <Reviews />
      <HowWeWork />
      <FormService dataKey="formService" />
    </>
  );
}
