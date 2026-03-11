/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,
    formats: ["image/webp", "image/avif"],
  },
  compress: true,
  productionBrowserSourceMaps: false,
}

export default nextConfig
