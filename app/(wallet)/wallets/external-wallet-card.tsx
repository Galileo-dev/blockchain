"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { ConnectKitButton } from "connectkit"
import { useDisconnect } from "wagmi"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type ExternalWalletCardProps = {}

export default function ExternalWalletCard({}: ExternalWalletCardProps) {
  const router = useRouter()
  const { disconnect } = useDisconnect()

  useEffect(() => {
    disconnect()
  }, [disconnect])

  return (
    <>
      <ConnectKitButton.Custom>
        {({ isConnected, show }) => {
          if (isConnected) {
            router.push(`/wallet`)
          }

          return (
            <Card>
              <CardHeader onClick={show}>
                <CardTitle>Connect external wallet</CardTitle>
                <CardDescription>
                  use one of the many options to connect an existing wallet
                </CardDescription>
              </CardHeader>
            </Card>
          )
        }}
      </ConnectKitButton.Custom>
    </>
  )
}
