import { imageHosts } from './image-hosts.config.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,
  distDir: process.env.DIST_DIR || '.next',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: imageHosts,
    minimumCacheTTL: 60,
    qualities: [75, 85],
  },
  experimental: {
    cpus: 1,
    workerThreads: false,
  },
  webpack(config, { dev }) {
    if (dev) {
      config.cache = false;

      const ignoredPaths = (process.env.WATCH_IGNORED_PATHS || '')
        .split(',')
        .map((path) => path.trim())
        .filter(Boolean);

      config.watchOptions = {
        ignored: ignoredPaths.length
          ? ignoredPaths.map((path) => `**/${path.replace(/^\/+|\/+$/g, '')}/**`)
          : undefined,
      };
    }

    return config;
  },
};

export default nextConfig;
