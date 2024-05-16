"use client";

import { useEffect } from "react";
import { useDisconnect } from "wagmi";

import ExternalWalletCard from "@/app/(doorman)/doorman/wallets/external-wallet-card";
import InternalWalletCards from "@/app/(doorman)/doorman/wallets/internal-wallet-cards";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useLocalWallet from "@/hooks/use-local-wallets";

export default function Page() {
  const { disconnect } = useDisconnect();

  useEffect(() => {
    disconnect();
  }, [disconnect]);

  const { wallets, openModal, connectWallet } = useLocalWallet();

  return (
    <>
      <div className="space-x container my-5 flex flex-1 flex-col">
        <div className="flex flex-row space-y-0.5">
          <h2 className="text-3xl font-bold tracking-tight">Wallets</h2>
          <div className="ml-auto flex items-center space-x-4">
            <Button onClick={openModal} className="text-sm">
              Add Wallet
            </Button>
          </div>
        </div>
        <Separator className="w-9/10 my-2" />
        <div className="flex flex-1 flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <div className="flex-1 space-y-2">
            <InternalWalletCards wallets={wallets} onClick={connectWallet} />
            <ExternalWalletCard />
          </div>
        </div>
      </div>
    </>
  );
}
