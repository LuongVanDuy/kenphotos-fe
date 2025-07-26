export function getImageUrl(path?: string) {
    if (!path) return "";
    return `${process.env.NEXT_PUBLIC_IMAGE_URL}${path}`;
  }