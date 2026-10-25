/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["pdf-parse"],
  },
  // /pricing was live and sat in the sitemap, so search engines have it
  // indexed. Now that the product is free, send that URL somewhere useful
  // instead of letting an indexed page turn into a 404.
  async redirects() {
    return [
      { source: "/pricing", destination: "/app", permanent: true },
    ];
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
