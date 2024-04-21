"use client"

import { getDefaultConfig } from "connectkit"
import { cookieStorage, createConfig, createStorage, http } from "wagmi"
import { mainnet, sepolia } from "wagmi/chains"

import { customChain } from "./customChain"

export const config = createConfig(
  getDefaultConfig({
    chains: [customChain],
    ssr: true,
    storage: createStorage({
      storage: cookieStorage,
    }),
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    appName: "Orb",
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
      [customChain.id]: http(),
    },
  })
)
