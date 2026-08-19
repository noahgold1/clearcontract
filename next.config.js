/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["pdf-parse"],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // pdf-parse uses 'canvas' optionally — ignore it
      config.externals = config.externals || [];
      config.externals.push("canvas");
    }
    return config;
  },
};

module.exports = nextConfig;
