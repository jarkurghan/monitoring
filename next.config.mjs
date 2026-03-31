/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/prayer-times-bot',
        permanent: true,
      },
    ];
  },
}

export default nextConfig
