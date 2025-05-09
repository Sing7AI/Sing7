// 🚀 Next.js configuration for Sing7 V1.02
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['ipfs.infura.io', 'ipfs.io'],
    formats: ['image/avif', 'image/webp'],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
  // Reduces bundle size by excluding large Web3 libraries from SSR
  experimental: {
    esmExternals: 'loose',
  },
};

module.exports = nextConfig; 