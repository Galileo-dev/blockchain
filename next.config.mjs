import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
// https://github.com/wevm/wagmi/blob/main/playgrounds/next/next.config.mjs
const nextConfig = {
  experimental: {
    externalDir: true,
  },
  webpack: (config) => {
    // https://docs.walletconnect.com/web3modal/nextjs/about#extra-configuration
    config.externals.push("pino-pretty", "lokijs", "encoding");
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.resolve.extensionAlias = {
      ".js": [".js", ".ts"],
    };
    return config;
  },
};

export default withBundleAnalyzer(nextConfig);
