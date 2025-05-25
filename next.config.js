/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  // Disable ESLint during builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Exclude admin routes from static export
  excludeDefaultMomentLocales: true,
  experimental: {
    // Don't require static params for these routes
    outputFileTracingExcludes: {
      '/admin/**': true,
    },
  },
};

module.exports = nextConfig;
