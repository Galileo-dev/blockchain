"use client";

import { ShowMethods } from "@/components/show-ticket/show-methods";
import { ShowMethodExternal } from "@/components/show-ticket/show-methods-external";
import { ShowSubmit } from "@/components/show-ticket/show-submit";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useAccount, useDisconnect } from "wagmi";

export default function Show() {
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
      <Card className="w-full rounded-3xl p-4 space-y-4">
        <CardHeader className="flex flex-row items-center justify-between w-full p-2">
          <CardTitle className="text-md">Choose a wallet to verify</CardTitle>
          <ShowMethodExternal />
        </CardHeader>
        {!isConnected || isLocalWallet ? (
          <ShowMethods />
        ) : (
          <Card className="w-full">
            <CardHeader className="flex-row items-center space-x-4">
              {connectorIcon && (
                <div className="rounded-lg p-2 px-4 border">
                  <img src={connectorIcon} className="w-6 h-6" />
                </div>
              )}
              <div className="flex flex-col truncate select-none overflow-hidden ">
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

        <ShowSubmit />
      </Card>
    </>
  );
}
