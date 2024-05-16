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
      <Card className="w-full space-y-4 rounded-3xl p-4">
        <CardHeader className="flex w-full flex-row items-center justify-between p-2">
          <CardTitle className="text-md">Choose a wallet to verify</CardTitle>
          <ShowMethodExternal />
        </CardHeader>
        {!isConnected || isLocalWallet ? (
          <ShowMethods />
        ) : (
          <Card className="w-full">
            <CardHeader className="flex-row items-center space-x-4">
              {connectorIcon && (
                <div className="rounded-lg border p-2 px-4">
                  <img src={connectorIcon} className="size-6" />
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

        <ShowSubmit />
      </Card>
    </>
  );
}
