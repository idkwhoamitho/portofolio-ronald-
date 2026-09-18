import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  typescript: {
    // ⚠️ Skips TypeScript errors during build
    ignoreBuildErrors: true,
  },
  eslint: {
    // ⚠️ Skips ESLint errors during build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;