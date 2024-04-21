"use client"

import { useRouter } from "next/navigation"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type WalletCardProps = {
  wallet: {
    address: string
    token: string
  }
  onClick: () => void
}

export default function WalletCard({ wallet, onClick }: WalletCardProps) {
  const router = useRouter()

  return (
    <>
      <Card>
        <CardHeader onClick={onClick}>
          <CardTitle>{wallet.address}</CardTitle>
          <CardDescription>{wallet.token}</CardDescription>
        </CardHeader>
      </Card>
    </>
  )
}
