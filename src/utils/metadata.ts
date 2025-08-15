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

export async function createMetadata({ title, description, url, image }: { title?: string; description?: string; url?: string; image?: string }) {
  const site = await fetchSiteMeta();

  const finalTitle = title || site.siteName;
  const finalDescription = description || site.siteDescription;
  const finalUrl = url || site.siteUrl;
  const finalImage = image || site.siteLogo || "/default-preview.jpg";

  return {
    title: finalTitle,
    description: finalDescription,
    icons: { icon: finalImage },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: finalUrl,
      siteName: site.siteName,
      images: [
        {
          url: finalImage,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDescription,
      images: [finalImage],
    },
  };
}

export async function createMetadataFromContent({ content, title, url, image }: { content: string; title?: string; url?: string; image?: string }) {
  const plainText = stripHtml(content);
  const shortDescription = plainText.length > 160 ? plainText.slice(0, 157) + "..." : plainText;

  return createMetadata({
    title,
    description: shortDescription,
    url,
    image,
  });
}
