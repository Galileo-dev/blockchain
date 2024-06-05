"use client";

import { ticketTokenConfig } from "@/config/contracts";
import { useReadContracts } from "wagmi";

export function TicketDetails() {
  const { data } = useReadContracts({
    contracts: [
      {
        ...ticketTokenConfig,
        functionName: "totalSupply",
      },
      {
        ...ticketTokenConfig,
        functionName: "symbol",
      },
      {
        ...ticketTokenConfig,
        functionName: "name",
      },
      {
        ...ticketTokenConfig,
        functionName: "decimals",
      },
    ],
  });

  const totalSupply = data?.[0].result;
  const symbol = data?.[1].result as string;
  const name = data?.[2].result as string;
  const decimals = data?.[3].result as number;

  return (
    <div>
      <h3 className="text-2xl font-bold tracking-tight">
        Ticket Token Contract
      </h3>
      <div className="mt-8">
        <p className="text-lg font-medium">Contract Address:</p>
        <p className="text-lg">{ticketTokenConfig.address}</p>
      </div>
      <div className="mt-8">
        <p className="text-lg font-medium">Name:</p>
        <p className="text-lg">{name}</p>
      </div>
      <div className="mt-8">
        <p className="text-lg font-medium">Symbol:</p>
        <p className="text-lg">{symbol}</p>
      </div>
      <div className="mt-8">
        <p className="text-lg font-medium">Decimals:</p>
        <p className="text-lg">{decimals}</p>
      </div>
      <div className="mt-8">
        <p className="text-lg font-medium">Total Supply:</p>
        <p className="text-lg">
          {totalSupply ? totalSupply.toString() : 0}&nbsp;{symbol}
        </p>
      </div>
    </div>
  );
}
