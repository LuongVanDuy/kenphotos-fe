import { notFound } from "next/navigation";

import "swiper/css";
import "swiper/css/navigation";
import "../../../../../public/css/ServiceSlide.css";

import FormService from "@/components/Client/Common/FormService";
import HowWeWork from "@/components/Client/Common/HowWeWork";
import Info from "@/components/Client/Service/Info";
import StepGrid from "@/components/Client/Service/StepGrid";
import Related from "@/components/Client/Service/Related";
import { createMetadata, createMetadataFromContent, fetchServiceMeta, stripHtml } from "@/utils/metadata";
import { getImageUrl } from "@/utils";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = await fetchServiceMeta(params.slug);
  if (!service) {
    return createMetadata({
      title: "Page Not Found",
      description: "Service information not found.",
    });
  }

  return createMetadataFromContent({
    title: service.title,
    content: service.content,
    image: getImageUrl(service.images[0]?.afterUrl) || "/default-preview.jpg",
    url: `https://example.com/services/${params.slug}`,
  });
}

export default async function ServiceDetails({ params }: { params: { slug: string[] | string } }) {
  const slugPath = Array.isArray(params.slug) ? params.slug.join("/") : params.slug;
  const service = await fetchServiceMeta(slugPath);

  if (!service) {
    notFound();
  }

  return (
    <>
      <Info serviceDetail={service} />
      <StepGrid />
      <Related relatedServices={service.relatedServices} />
      <HowWeWork />
      <FormService dataKey="formService" />
    </>
  );
}
