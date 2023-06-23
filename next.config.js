/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // ! weird fix for webpack issue
  webpack: (config) => {
    config.externals.push('pino-pretty', 'encoding', 'lokijs'); // * failing to resolve depdencies from itself nextjs
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
};

module.exports = nextConfig;
