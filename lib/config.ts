"use client";

import { getDefaultConfig } from "connectkit";
import { cookieStorage, createConfig, createStorage, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

export const config = createConfig(
  getDefaultConfig({
    chains: [mainnet],
    ssr: true,
    storage: createStorage({
      storage: cookieStorage,
    }),
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    appName: "Orb",
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
    },
  })
);
