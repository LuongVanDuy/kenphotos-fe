/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    apiUrl: process.env.API_URL,
    apiKey: process.env.API_KEY,
    NEXT_PUBLIC_IMAGE_URL:
      process.env.NEXT_PUBLIC_IMAGE_URL || "http://localhost:3000",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
