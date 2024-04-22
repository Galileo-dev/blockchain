"use client"

import { useEffect } from "react"
import { Wallet, Wallets } from "@/types"
import { useLocalStorage } from "usehooks-ts"
import { useDisconnect } from "wagmi"

import { Separator } from "@/components/ui/separator"
import { ImportWalletTrigger } from "@/components/web3/import-wallet-dialog"
import { NewWalletTrigger } from "@/components/web3/new-wallet-dialog"

import ExternalWalletCard from "./external-wallet-card"
import InternalWalletCards from "./internal-wallet-cards"

export default function Page() {
  const { disconnect } = useDisconnect()

  useEffect(() => {
    disconnect()
  }, [disconnect])

  const [wallets, setWallets] = useLocalStorage<Wallets>("wallets", [])

  function addWallet(wallet: Wallet) {
    setWallets((prevWallets) => [...prevWallets, wallet])
  }

  return (
    <>
      <div className="space-x container my-5 flex flex-1 flex-col">
        <div className="flex flex-row space-y-0.5">
          <h2 className="text-3xl font-bold tracking-tight">Wallets</h2>
          <div className="ml-auto flex items-center space-x-4">
            <NewWalletTrigger handler={addWallet} />
            <ImportWalletTrigger handler={addWallet} />
          </div>
        </div>
        <Separator className="w-9/10 my-2" />
        <div className="flex flex-1 flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <div className="flex-1 space-y-2">
            <InternalWalletCards wallets={wallets} />
            <ExternalWalletCard />
          </div>
        </div>
      </div>
    </>
  )
}
