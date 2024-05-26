"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState, type ReactNode } from "react";
import { State, WagmiProvider } from "wagmi";

import { ThemeProvider } from "@/components/theme-provider";
import { devnetMnemonic } from "@/config/devnet-wallets";
import { LocalWalletProvider } from "@/context/local-wallet-context";
import { config } from "@/lib/config";
import { generateKeyStoreFromMnemonic } from "@/lib/web3";
import { ConnectKitProvider } from "connectkit";

export function Providers(props: {
  children: ReactNode;
  initialState?: State;
}) {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    const injectWallet = async () => {
      const wallet = await generateKeyStoreFromMnemonic(
        devnetMnemonic,
        0,
        "test",
      );
      if (process.env.NODE_ENV === "development") {
        if (typeof window !== "undefined") {
          const wallets = localStorage.getItem("wallets");

          if (!wallets) {
            localStorage.setItem("wallets", JSON.stringify([wallet]));
          } else {
            const parsedWallets = JSON.parse(wallets);
            if (!parsedWallets.find((w) => w.address === wallet.address)) {
              localStorage.setItem(
                "wallets",
                JSON.stringify([...parsedWallets, wallet]),
              );
            }
          }
          console.log("Injected devnet accounts into localStorage");
        }
      }
    };
    injectWallet();
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <WagmiProvider config={config} initialState={props.initialState}>
        <QueryClientProvider client={queryClient}>
          <ConnectKitProvider theme="midnight">
            <LocalWalletProvider>{props.children}</LocalWalletProvider>
          </ConnectKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
}
