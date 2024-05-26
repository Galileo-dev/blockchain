"use client";

import CheckoutItem from "@/components/checkout/checkout-item";
import { CheckoutMethods } from "@/components/checkout/checkout-methods";
import { CheckoutMethodExternal } from "@/components/checkout/checkout-methods-external";
import { CheckoutSubmit } from "@/components/checkout/checkout-submit";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ticketTokenConfig } from "@/config/contracts";
import { useEffect, useState } from "react";
import { parseEther } from "viem";
import {
  useAccount,
  useDisconnect,
  useWaitForTransactionReceipt,
  useWriteContract,
  type BaseError,
} from "wagmi";

export default function Checkout() {
  const { isConnected, connector, address } = useAccount();
  const [connectorIcon, setConnectorIcon] = useState<string | null>(null);
  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (connector?.icon) {
      setConnectorIcon(connector.icon);
    }
  }, [connector]);

  const isLocalWallet = connector?.id == "custom";

  const { data: hash, error, isPending, writeContract } = useWriteContract();

  function handleSubmit() {
    writeContract({
      ...ticketTokenConfig,
      functionName: "buyTicket",
      value: parseEther("0.00001"),
    });
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return (
    <>
      <CheckoutItem
        title="Electric Picnic"
        info={["02-09-2024", "Stradbally, Co. Laois"]}
        price={250}
      />
      <Card className="w-full space-y-4 rounded-3xl p-4">
        <CardHeader className="flex w-full flex-row items-center justify-between p-2">
          <CardTitle className="text-md">Payment method</CardTitle>
          <CheckoutMethodExternal />
        </CardHeader>
        {!isConnected || isLocalWallet ? (
          <CheckoutMethods />
        ) : (
          <Card className="w-full">
            <CardHeader className="flex-row items-center space-x-4">
              {connectorIcon && (
                <div className="rounded-lg border p-2 px-4">
                  <img
                    src={connectorIcon}
                    alt="wallet provider icon"
                    className="size-6"
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

        {hash && <div>Transaction Hash: {hash}</div>}
        {isConfirming && <div>Waiting for confirmation...</div>}
        {isConfirmed && <div>Transaction confirmed.</div>}
        {error && (
          <div>Error: {(error as BaseError).shortMessage || error.message}</div>
        )}

        <CheckoutSubmit onSubmit={handleSubmit} />
      </Card>
    </>
  );
}
