"use client"

import type { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ConnectKitProvider } from "connectkit"
import { WagmiProvider } from "wagmi"

import { config } from "@/lib/config"
import { ThemeProvider } from "@/components/theme-provider"

type Props = {
  children: ReactNode
}

const queryClient = new QueryClient()

export function Providers({ children }: Props) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ConnectKitProvider theme="midnight">{children}</ConnectKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  )
}
