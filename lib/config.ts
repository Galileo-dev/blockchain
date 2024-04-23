import { getDefaultConfig } from "connectkit";
import { cookieStorage, createConfig, createStorage, http } from "wagmi";
import { localhost, sepolia } from "wagmi/chains";

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
