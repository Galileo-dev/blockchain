import { getDefaultConfig } from "connectkit";
import { createConfig, http } from "wagmi";
import { localhost, sepolia } from "wagmi/chains";

const isLocalhost =
  process.env.NODE_ENV === "development" &&
  typeof process.env.NEXT_PUBLIC_TICKET_TOKEN_ADDRESS === undefined;

const sepoliaBetterRpc = {
  ...sepolia,
  rpcUrls: {
    default: {
      http: ["https://sepolia.infura.io/v3/e64e0f234c6c45a3b55011391da6fe61"],
    },
  },
};

export const config = createConfig(
  getDefaultConfig({
    ssr: true,
    chains: isLocalhost ? [localhost] : [sepoliaBetterRpc],
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    appName: "Orb",
    transports: isLocalhost
      ? {
          [localhost.id]: http(),
        }
      : {
          [sepoliaBetterRpc.id]: http(),
        },
  }),
);

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
