import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    //Cloudinary
    domains: ["res.cloudinary.com"],
  },
  warnings: {
    // Disable duplicate key warning
    react: {
      deprecation: true,
    },
  },
};

export default nextConfig;
