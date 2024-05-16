"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { State, WagmiProvider } from "wagmi";

import { ThemeProvider } from "@/components/theme-provider";
import { LocalWalletProvider } from "@/context/local-wallet-context";
import { config } from "@/lib/config";
import { ConnectKitProvider } from "connectkit";

export function Providers(props: {
  children: ReactNode;
  initialState?: State;
}) {
  const [queryClient] = useState(() => new QueryClient());

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
