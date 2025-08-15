import { fetchApi } from "@/app/api";
import { getImageUrl } from ".";

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

export async function createMetadata({ title, description }: { title?: string; description?: string }) {
  const siteMeta = await fetchSiteMeta();

  const finalTitle = title ? `${title} - ${siteMeta.siteName}` : siteMeta.siteName;
  const finalDescription = description || siteMeta.siteDescription;
  const icon = getImageUrl(siteMeta.siteLogo || "/favicon.ico");

  return {
    title: finalTitle,
    description: finalDescription,
    icons: { icon },
  };
}
