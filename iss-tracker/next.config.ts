import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, 
  swcMinify: true,      
  output: "export",
  images: {
    domains: ["unpkg.com"], 
  },
  experimental: {
    scrollRestoration: true,
  },
};

export default nextConfig;
