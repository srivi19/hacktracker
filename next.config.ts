import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "devpost.com" },
      { protocol: "https", hostname: "*.devpost.com" },
    ],
  },
};

export default nextConfig;
