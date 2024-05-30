"use client";

import { Button } from "@/components/ui/button";
import { ticketTokenConfig } from "@/config/contracts";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
  type BaseError,
} from "wagmi";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { isAddress } from "viem";

const transferTicketFormSchema = z.object({
  recipient: z.custom((val) => isAddress(val as string), "Invalid Address"),
  amount: z.number().min(1, "Amount is required"),
});

type TransferTicketFormValues = z.infer<typeof transferTicketFormSchema>;

export default function TransferTicket() {
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const { address } = useAccount();

  const { data: balance } = useReadContract({
    ...ticketTokenConfig,
    functionName: "balanceOf",
    args: [address],
  });

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  function onSubmit(values: TransferTicketFormValues) {
    writeContract({
      ...ticketTokenConfig,
      functionName: "transfer",
      args: [values.recipient, values.amount],
    });
  }

  const form = useForm<TransferTicketFormValues>({
    resolver: zodResolver(transferTicketFormSchema),
    defaultValues: {
      recipient: "0x2bD9d720D21515909702569E6dF9BcdfD53B8711",
      amount: 1,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid w-full items-center gap-4">
          <FormField
            control={form.control}
            name="recipient"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipient</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {hash && <div>Transaction Hash: {hash}</div>}
          {isConfirming && <div>Waiting for confirmation...</div>}
          {isConfirmed && <div>Transaction confirmed.</div>}
          {error && (
            <div>
              Error: {(error as BaseError).shortMessage || error.message}
            </div>
          )}

          <Button
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
            size="lg"
            type="submit"
          >
            Transfer Ticket
          </Button>
        </div>
      </form>
    </Form>
  );
}
