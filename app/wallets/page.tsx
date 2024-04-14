"use client";

import { Separator } from "@/components/ui/separator";
import { customConnector } from "@/lib/customConnector";
import useLocalStorage from "@/lib/localstorage";
import { useEffect } from "react";
import { PrivateKeyAccount } from "viem";
import { useConnect, useDisconnect } from "wagmi";
import ExternalWalletCard from "./external-wallet-card";
import { ImportWalletTrigger } from "./import-wallet-trigger";
import InternalWalletCards from "./internal-wallet-cards";
import { NewWalletTrigger } from "./new-wallet-trigger";

export default function Page() {
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    disconnect();
  }, [disconnect]);

  const [wallets, setWallets] = useLocalStorage<PrivateKeyAccount[]>(
    "wallets",
    []
  );

  function addWallet(account: PrivateKeyAccount) {
    setWallets((prevWallets) => [...prevWallets, account]);
  }

  async function connectCustomWallet(account: PrivateKeyAccount) {
    connect({ chainId: 11155111, connector: customConnector() }); // sepolia
  }

  return (
    <>
      <div className="space-x container mb-5 mt-5 flex flex-1 flex-col">
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
            <InternalWalletCards
              wallets={wallets}
              changeWalletHandler={connectCustomWallet}
            />
            <ExternalWalletCard />
          </div>
        </div>
      </div>
    </>
  );
}
