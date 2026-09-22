import type { NextConfig } from "next";

// Set NEXT_PUBLIC_BASE_PATH when deploying under a sub-path (e.g. GitHub Pages
// project site). Leave empty for root deployments (Vercel / Netlify / user pages).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;