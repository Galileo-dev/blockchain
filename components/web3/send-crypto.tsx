"use client";

import { SendCryptoForm } from "@/components/web3/send-crypto-form";
import { useState } from "react";
import {
  formatEther,
  formatGwei,
  isAddress,
  parseEther,
  parseGwei,
} from "viem";
import {
  useAccount,
  useEstimateGas,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from "wagmi";
import { z } from "zod";

const transactionFormSchema = z.object({
  address: z.custom((val) => isAddress(val as string), "Invalid Address"),
  amount: z.string().min(1, "Amount must be greater than 0"),
  gas: z.string().optional(),
});

type TransactionFormValues = z.infer<typeof transactionFormSchema>;

export function SendCrypto() {
  const [formInputs, setFormInputs] = useState<TransactionFormValues>();
  const { address, chain } = useAccount();
  const { data: estimateGas, error: estimateGasError } = useEstimateGas({
    account: address,
    to: formInputs?.address,
    value: formInputs?.amount ? parseEther(formInputs.amount) : undefined,
  });

  const {
    data: hash,
    error,
    isPending,
    sendTransaction,
  } = useSendTransaction();

  async function onSubmit(values: TransactionFormValues) {
    const to = values.address;
    const value = values.amount;
    sendTransaction({
      to,
      value: parseEther(value),
      gas: values.gas ? parseGwei(values.gas) : estimateGas,
    });
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  async function onChange(values: TransactionFormValues) {
    setFormInputs(values);
  }

  const formatBalance = (balance: bigint) => {
    return parseFloat(formatEther(balance, "wei")).toFixed(4);
  };

  return (
    <SendCryptoForm
      onSubmit={onSubmit}
      onChange={onChange}
      isConfirming={isConfirming}
      isConfirmed={isConfirmed}
      transactionError={error}
      estimateGas={estimateGas ? formatGwei(estimateGas) : null}
      estimateGasError={estimateGasError}
    />
  );
}
