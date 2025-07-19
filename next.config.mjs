/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    apiUrl: process.env.API_URL,
    apiKey: process.env.API_KEY,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
