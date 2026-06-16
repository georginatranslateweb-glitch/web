/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
    ],
  },
  experimental: {
  },
  async redirects() {
    return [
      { source: '/home-4', destination: '/about', permanent: true },
      { source: '/home-5', destination: '/', permanent: true },
      { source: '/home-2', destination: '/', permanent: true },
      { source: '/home-3', destination: '/', permanent: true },
      { source: '/home-6', destination: '/', permanent: true },
      { source: '/home', destination: '/', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/favicon.ico',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
        ],
      },
      {
        source: '/favicon-32x32.png',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
        ],
      },
      {
        source: '/apple-touch-icon.png',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
