import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, 
  images: {
    domains: ["unpkg.com"], 
  },
  experimental: {
    scrollRestoration: true,
  },
};

export default nextConfig;
