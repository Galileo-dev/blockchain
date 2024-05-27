"use client";

import { getDefaultConfig } from "connectkit";
import { createConfig, http } from "wagmi";
import { localhost, sepolia } from "wagmi/chains";

export const config = createConfig(
  getDefaultConfig({
    ssr: true,
    chains: [localhost, sepolia],
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    appName: "Orb",
    transports: {
      [localhost.id]: http(),
      [sepolia.id]: http(),
    },
  }),
);

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
