import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // সব হোস্টনেম অনুমোদিত
      },
    ],
  },
};

export default nextConfig;
