/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  distDir: '../../.next', // Ensure this is set correctly
};

module.exports = nextConfig;
