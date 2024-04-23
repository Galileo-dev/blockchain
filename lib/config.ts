import { getDefaultConfig } from "connectkit";
import { cookieStorage, createConfig, createStorage, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

import { localhost } from "wagmi/chains";
import { customChain } from "./customChain";

export const config = createConfig(
  getDefaultConfig({
    chains: [localhost, sepolia],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    appName: "Orb",
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
      [customChain.id]: http(),
    },
  }),
);

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
