/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "devpost.com" },
      { protocol: "https", hostname: "*.devpost.com" },
    ],
  },
};

export default nextConfig;
