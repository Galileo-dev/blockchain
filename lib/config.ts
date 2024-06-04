import { getDefaultConfig } from "connectkit";
import { createConfig, http } from "wagmi";
import { localhost, sepolia } from "wagmi/chains";

const isLocalhost = process.env.NODE_ENV === "development";

export const config = createConfig(
  getDefaultConfig({
    ssr: true,
    chains: isLocalhost ? [localhost] : [sepolia],
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    appName: "Orb",
    transports: isLocalhost
      ? {
          [localhost.id]: http(),
        }
      : {
          [sepolia.id]: http(),
        },
  }),
);

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
