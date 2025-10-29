/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable sharp to avoid simple-swizzle dependency
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.html$/,
      type: 'asset/source',
    });
    return config;
  }
};

module.exports = nextConfig;