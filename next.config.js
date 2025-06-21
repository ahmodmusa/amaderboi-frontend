/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'admin.amaderboi.net',
      'cdn.amaderboi.net'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.amaderboi.net',
        port: '',
        pathname: '/covers/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.amaderboi.net',
        port: '',
        pathname: '/books/**',
      },
    ],
  },
  // Enable TypeScript path aliases
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src'),
    };
    return config;
  },
  // Handle static exports for static site generation
  output: 'standalone',
  // Server components external packages
  serverExternalPackages: ['@prisma/client'],
};

module.exports = nextConfig;
