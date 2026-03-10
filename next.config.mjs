/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
  },
  compress: true,
  swcMinify: true,
  productionBrowserSourceMaps: false,
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
  redirects: async () => [],
  rewrites: async () => [],
}

export default nextConfig
