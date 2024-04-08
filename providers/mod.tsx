"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { WagmiProvider, type State } from "wagmi";

import { ThemeProvider } from "@/components/theme-provider";
import { config } from "@/lib/config";

type Props = {
  children: ReactNode;
  initialState: State | undefined;
};

const queryClient = new QueryClient();

export function Providers({ children, initialState }: Props) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <WagmiProvider config={config} initialState={initialState}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
}
