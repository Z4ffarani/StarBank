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
  i18n: {
    locales: ['en', 'zh', 'hi', 'es', 'pt-BR', 'ru', 'fr', 'de', 'ja', 'it'],
    defaultLocale: 'en',
    localeDetection: false
  },

  webpack: (config: CustomWebpackConfig): CustomWebpackConfig => {
    config.watchOptions = {
      ignored: /node_modules/,
      poll: 1000,
    };
    return config;
  },
};

export default nextConfig;