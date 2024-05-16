"use client";

import Checkout from "@/components/checkout/checkout";
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
        <div className="space-y-4 max-w-2xl w-full">
          <Checkout />
        </div>
      </div>
    </div>
  );
}
