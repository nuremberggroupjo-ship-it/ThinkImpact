import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["cdn-icons-png.flaticon.com", "thumbs.dreamstime.com", "t4.ftcdn.net"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
  },
  terser: isProd
    ? {
        compress: {
          drop_console: true, 
        },
      }
    : {},
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
