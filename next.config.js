/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
  },
  async redirects() {
    return [
      { source: '/home-4', destination: '/about', permanent: true },
    ];
  },
};

module.exports = nextConfig;
