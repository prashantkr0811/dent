// import resend from "@/lib/resend";
// import type { NextConfig } from "next";
// import { env } from "process";

// const nextConfig: NextConfig = {
//   /* config options here */
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "images.unsplash.com",
//       },
//       {
//         protocol: "https",
//         hostname: "avatar.iran.liara.run",
//       },
//       {
//         protocol: "https",
//         hostname: "img.clerk.com",
//       },
//       env:{
//         RESEND_API_KEY: process.env.RESEND_API_KEY,
//       },
//     ],
//     unoptimized: true,
//   },
// };

// export default nextConfig;

// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "avatar.iran.liara.run",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
