import { notFound } from "next/navigation";

import "swiper/css";
import "swiper/css/navigation";
import "../../../../../public/css/ServiceSlide.css";

import FormService from "@/components/Client/Common/FormService";
import HowWeWork from "@/components/Client/Common/HowWeWork";
import Info from "@/components/Client/Service/Info";
import Related from "@/components/Client/Service/Related";
import { createMetadata, fetchServiceMeta } from "@/utils/metadata";
import WhyChooseUs from "@/components/Client/Service/WhyChooseUs";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const service = await fetchServiceMeta(params.slug);
  if (!service) {
    return createMetadata({
      title: "Page Not Found",
      description: "Service information not found.",
    });
  }

  return createMetadata({
    title: service.title,
    description: service.content,
    image: service.images[0].afterUrl,
    url: `https://kenphotos.com/services/${params.slug}`,
  });
}

export default async function ServiceDetails({
  params,
}: {
  params: { slug: string[] | string };
}) {
  const slugPath = Array.isArray(params.slug)
    ? params.slug.join("/")
    : params.slug;
  const service = await fetchServiceMeta(slugPath);

  if (!service) {
    notFound();
  }

  return (
    <>
      <Info serviceDetail={service} />
      <WhyChooseUs steps={service.steps} />
      <Related relatedServices={service.relatedServices} />
      <HowWeWork />
      <FormService dataKey="formService" />
    </>
  );
}
