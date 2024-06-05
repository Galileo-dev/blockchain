"use client";

import { Button } from "@/components/ui/button";
import { ticketTokenConfig } from "@/config/contracts";
import { formatGwei, parseEther } from "viem";
import {
  useAccount,
  useEstimateGas,
  useGasPrice,
  useWaitForTransactionReceipt,
  useWriteContract,
  type BaseError,
} from "wagmi";

export default function BuyTicket() {
  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const { address, chain } = useAccount();
  const { data: estimateGas, error: estimateGasError } = useEstimateGas({
    account: address,
    chainId: chain?.id,
    value: parseEther("0.00001"),
    to: ticketTokenConfig.address,
    data: "0xedca914c",
  });
  const { data: gasPrice } = useGasPrice();

  function handleSubmit() {
    console.log("gas in: ", estimateGas);
    writeContract({
      ...ticketTokenConfig,
      functionName: "buyTicket",
      value: parseEther("0.00001"),
      gas: estimateGas,
    });
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return (
    <>
      <div>Price: 0.00001 ETH</div>
      {estimateGas && <div>Estimated Gas: {formatGwei(estimateGas)} Gwei</div>}
      {gasPrice && <div>Gas Price: {formatGwei(gasPrice)} Gwei</div>}
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && <div>Waiting for confirmation...</div>}
      {isConfirmed && <div>Transaction confirmed.</div>}
      {estimateGasError && (
        <div>Error: {(estimateGasError as BaseError).shortMessage}</div>
      )}
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
