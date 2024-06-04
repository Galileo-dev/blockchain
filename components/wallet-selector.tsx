"use client";

import { ShowExternalWallets } from "@/components/show-external-wallets";
import { TicketBalance } from "@/components/ticket-balance";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WalletSelectorItems } from "@/components/wallet-selector-items";
import { WalletBalance } from "@/components/web3/wallet-balance";
import { useEffect, useState } from "react";
import { useAccount, useDisconnect } from "wagmi";

interface WalletSelectorProps {
  title?: string;
  children?: React.ReactNode;
}

export default function WalletSelector({
  title,
  children,
}: WalletSelectorProps) {
  const { isConnected, connector, address } = useAccount();
  const [connectorIcon, setConnectorIcon] = useState<string | null>(null);
  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (connector?.icon) {
      setConnectorIcon(connector.icon);
    }
  }, [connector]);

  const isLocalWallet = connector?.id == "custom";

  return (
    <>
      <Card className="w-full space-y-4 rounded-3xl p-4">
        <CardHeader className="flex w-full flex-row items-center justify-between p-2">
          <CardTitle className="text-md">{title}</CardTitle>
          <ShowExternalWallets />
        </CardHeader>
        {!isConnected || isLocalWallet ? (
          <WalletSelectorItems />
        ) : (
          <Card className="w-full">
            <CardHeader className="flex-row items-center space-x-4">
              {connectorIcon && (
                <div className="rounded-lg border p-2 px-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={connectorIcon}
                    className="size-6"
                    alt="wallet icon"
                  />
                </div>
              )}
              <div className="flex select-none flex-col overflow-hidden truncate ">
                <CardTitle className="text-md">{connector?.name}</CardTitle>
                <CardDescription>{address}</CardDescription>
              </div>
              <div className="flex-1" />
              <Button variant="destructive" onClick={() => disconnect()}>
                disconnect
              </Button>
            </CardHeader>
          </Card>
        )}
        {address && (
          <>
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-col space-y-2">
                <CardTitle className="text-md">Ticket Balance:</CardTitle>
                <CardDescription>
                  <TicketBalance address={address} />
                </CardDescription>
              </div>
              <div className="flex flex-col space-y-2 text-right">
                <CardTitle className="text-md">Sepolia Balance:</CardTitle>
                <CardDescription>
                  <WalletBalance address={address} />
                </CardDescription>
              </div>
            </div>
          </>
        )}

        {children}
      </Card>
    </>
  );
}
