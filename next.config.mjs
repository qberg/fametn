/** @type {import('next').NextConfig} */

const nextConfig = {
  i18n: {
    locales: ['en', 'ta'],
    defaultLocale: 'en',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_IMG_ENDPOINT.replace("https://", ""),
        port: '',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
