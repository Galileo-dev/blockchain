"use client";

import { Button } from "@/components/ui/button";
import { ticketTokenConfig } from "@/config/contracts";
import { parseEther } from "viem";
import {
  useWaitForTransactionReceipt,
  useWriteContract,
  type BaseError,
} from "wagmi";

export default function BuyTicket() {
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
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && <div>Waiting for confirmation...</div>}
      {isConfirmed && <div>Transaction confirmed.</div>}
      {error && (
        <div>Error: {(error as BaseError).shortMessage || error.message}</div>
      )}

      <Button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white hover:bg-blue-700"
        size="lg"
      >
        Pay
      </Button>
    </>
  );
}
