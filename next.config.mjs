/** @type {import('next').NextConfig} */
const nextConfig = {
  // https://docs.walletconnect.com/web3modal/nextjs/about#extra-configuration
  experimental: {
    turbo: {},
  },
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding")
    return config
  },
}

export default nextConfig
