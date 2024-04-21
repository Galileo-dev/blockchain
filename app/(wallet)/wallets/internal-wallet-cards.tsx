"use client"

import { useConnect } from "wagmi"

import { Wallet, Wallets } from "@/types/wallet"
import { customConnector } from "@/lib/customConnector"

import WalletCard from "./wallet-card"

type InternalWalletCardsProps = {
  wallets: Wallets
}

export default function InternalWalletCards({
  wallets,
}: InternalWalletCardsProps) {
  const { connect } = useConnect()

  async function connectCustomWallet(wallet: Wallet) {
    connect({ connector: customConnector() })
  }

  return (
    <>
      {wallets.map((wallet, index) => (
        <WalletCard
          key={index}
          onClick={() => connectCustomWallet(wallet)}
          wallet={{ address: wallet.address, token: "seth" }}
        />
      ))}
    </>
  )
}
