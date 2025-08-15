import ServiceList from "@/components/Client/Services/ServiceList";
import { createMetadata } from "@/utils/metadata";

export async function generateMetadata() {
  return createMetadata({
    title: "Our Services",
    description: "Explore the range of services offered by KenPhotos.",
  });
}

const ServicePage = () => {
  return <ServiceList />;
};

export default ServicePage;
