"use client";

import { ticketTokenConfig } from "@/config/contracts";
import { useReadContract } from "wagmi";

interface ShowTicketBalanceProps {
  address: `0x${string}`;
}

export function ShowTicketBalance({ address }: ShowTicketBalanceProps) {
  const { data: balance } = useReadContract({
    ...ticketTokenConfig,
    functionName: "balanceOf",
    args: [address],
  });

  return (
    <div>
      <h1 className="text-center text-lg font-bold">
        Ticket Balance: {balance?.toString()}
      </h1>
      <p className="text-center text-sm text-gray-500">Address: {address}</p>
    </div>
  );
}
