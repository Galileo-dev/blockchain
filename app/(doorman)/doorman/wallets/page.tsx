"use client";

import { useEffect } from "react";
import { useAccount, useDisconnect } from "wagmi";

import InternalWalletCards from "@/app/(doorman)/doorman/wallets/internal-wallet-cards";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import useLocalWallet from "@/hooks/use-local-wallets";
import { useModal } from "connectkit";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const { disconnect } = useDisconnect();
  const { isConnected } = useAccount();

  useEffect(() => {
    disconnect();
  }, [disconnect]);

  useEffect(() => {
    if (isConnected) {
      router.push(`/doorman/dashboard`);
    }
  }, [isConnected, router]);

  const { setOpen } = useModal();

  const show = () => {
    setOpen(true);
  };

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
            <Card>
              <CardHeader onClick={show}>
                <CardTitle>Connect external wallet</CardTitle>
                <CardDescription>
                  use one of the many options to connect an existing wallet
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
