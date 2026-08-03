// import { imageHosts } from './image-hosts.config.mjs';

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   productionBrowserSourceMaps: true,
//   distDir: process.env.DIST_DIR || '.next',
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   images: {
//     remotePatterns: imageHosts,
//     minimumCacheTTL: 60,
//     qualities: [75, 85, 100],
//   },
//   webpack(
//     config,
//     {
//       dev: dev
//     }
//   ) {
//     if (dev) {
//       config.module.rules.push({
//         test: /\.(jsx|tsx)$/,
//         exclude: [/node_modules/],
//         use: [{
//           loader: '@dhiwise/component-tagger/nextLoader',
//         }],
//       });
//       const ignoredPaths = (process.env.WATCH_IGNORED_PATHS || '')
//         .split(',')
//         .map((p) => p.trim())
//         .filter(Boolean);
//       config.watchOptions = {
//         ignored: ignoredPaths.length
//           ? ignoredPaths.map((p) => `**/${p.replace(/^\/+|\/+$/g, '')}/**`)
//           : undefined,
//       };
//     }
//     return config;
//   },
// };
// export default nextConfig;


import { imageHosts } from './image-hosts.config.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Turned OFF source maps to save massive amounts of RAM during development
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
    qualities: [75, 85], // Dropped 100 quality optimization to save memory cache weights
  },
  
  // 2. Direct core restrictions to slow down memory spikes
  experimental: {
    cpus: 1,              // Force single-thread compilation
    workerThreads: false, // Turn off memory-heavy background processors
  },

  webpack(config, { dev }) {
    if (dev) {
      // 3. Disable local compilation disk-caching to preserve your 200MB storage space
      config.cache = false;

      // 4. REMOVED @dhiwise/component-tagger loader! It parses and injects text 
      // into all 2,000+ files on the fly, which crashes low-RAM devices.

      const ignoredPaths = (process.env.WATCH_IGNORED_PATHS || '')
        .split(',')
        .map((p) => p.trim())
        .filter(Boolean);
      config.watchOptions = {
        ignored: ignoredPaths.length
          ? ignoredPaths.map((p) => `**/${p.replace(/^\/+|\/+$/g, '')}/**`)
          : undefined,
      };
    }
    return config;
  },
};

export default nextConfig;
