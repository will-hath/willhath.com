/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep Turbopack scoped to this site when a parent directory also has a lockfile.
  turbopack: {
    root: __dirname,
  },
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
