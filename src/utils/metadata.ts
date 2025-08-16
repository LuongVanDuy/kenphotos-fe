import { fetchApi } from "@/app/api";
import { getImageUrl } from "./imageUrl";

const defaultImage = "/default-preview.jpg";

export async function fetchSiteMeta() {
  try {
    const data = await fetchApi("public/settings/general", "GET");
    return {
      siteName: data.siteName || "KenPhotos",
      siteDescription: data.siteDescription || "Welcome to KenPhotos",
      siteLogo: data.siteLogo || "/favicon.ico",
      siteUrl: data.siteUrl || "",
    };
  } catch {
    return {
      siteName: "KenPhotos",
      siteDescription: "Welcome to KenPhotos",
      siteLogo: "/favicon.ico",
      siteUrl: "",
    };
  }
}

export async function fetchServiceMeta(slug: string) {
  try {
    return await fetchApi(`public/services/${slug}`, "GET");
  } catch {
    return null;
  }
}

export async function fetchPostMeta(slug: string) {
  try {
    return await fetchApi(`public/posts/${slug}`, "GET");
  } catch {
    return null;
  }
}

export function stripHtml(html: string) {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export async function createMetadata({
  title,
  description,
  url,
  image,
  type = "website",
}: {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  type?: string;
}) {
  const siteMeta = await fetchSiteMeta();

  const finalTitle = title
    ? `${title} - ${siteMeta.siteName}`
    : siteMeta.siteName;

  const plainText = stripHtml(description || siteMeta.siteDescription);
  const finalDescription =
    plainText.length > 160 ? plainText.slice(0, 157) + "..." : plainText;

  const icon = getImageUrl(siteMeta.siteLogo || "/favicon.ico");
  const shareImage =
    getImageUrl(image) || getImageUrl(siteMeta.siteLogo) || defaultImage;

  return {
    title: finalTitle,
    description: finalDescription,
    icons: { icon },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      image: shareImage,
      type,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDescription,
      image: shareImage,
    },
  };
}
