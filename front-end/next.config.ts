import type { NextConfig } from 'next';

interface WatchOptions {
  ignored: RegExp;
  poll: number;
}

interface CustomWebpackConfig {
  watchOptions: WatchOptions;
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config: CustomWebpackConfig): CustomWebpackConfig => {
    config.watchOptions = {
      ignored: /node_modules/,
      poll: 1000,
    };
    return config;
  },
};

export default nextConfig;