"use client";

import BuyTicket from "@/components/buy-ticket";
import { ImagePlaceholder } from "@/components/image-placeholder";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import WalletSelector from "@/components/wallet-selector";
import { useEffect } from "react";
import { useDisconnect } from "wagmi";

export default function TicketPage() {
  const { disconnect } = useDisconnect();

  useEffect(() => {
    disconnect();
  }, [disconnect]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center space-y-2">
      <div className="container mx-auto my-20 flex flex-1 flex-col items-center justify-center space-y-2">
        <div className="w-full max-w-2xl space-y-4">
          <CheckoutItem
            title="Electric Picnic"
            info={["02-09-2024", "Stradbally, Co. Laois"]}
            price={250}
          />
          <WalletSelector title="Choose a wallet to buy a ticket">
            <BuyTicket />
          </WalletSelector>
        </div>
      </div>
    </div>
  );
}

function CheckoutItem({ title, info, price }) {
  return (
    <Card className="w-full rounded-3xl">
      <CardHeader className="flex w-full flex-row items-center justify-between">
        <div className="flex flex-row items-center space-x-2">
          <div className="size-14">
            <ImagePlaceholder />
          </div>
          <div className="flex flex-col space-y-2">
            <CardTitle className="text-md">{title}</CardTitle>
            <CardDescription>
              {info.map((i) => (
                <span key={i}>
                  {i}
                  <br />
                </span>
              ))}
            </CardDescription>
          </div>
        </div>
        <div className="text-1xl font-semibold leading-none tracking-tight">
          &euro;{price}
        </div>
      </CardHeader>
    </Card>
  );
}
