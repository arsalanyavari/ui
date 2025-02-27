// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
