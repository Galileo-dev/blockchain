"use client"

import type { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ConnectKitProvider } from "connectkit"
import { WagmiProvider, type State } from "wagmi"

import { config } from "@/lib/config"
import { ThemeProvider } from "@/components/theme-provider"

type Props = {
  children: ReactNode
  initialState: State | undefined
}

const queryClient = new QueryClient()

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
          <ConnectKitProvider theme="midnight">{children}</ConnectKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  )
}
