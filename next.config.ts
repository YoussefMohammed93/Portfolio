import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "unique-marlin-401.convex.cloud",
        port: "",
        pathname: "/api/storage/**",
      },
    ],
  },
};

export default nextConfig;
