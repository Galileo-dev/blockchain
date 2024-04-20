"use client";

import { AlertError } from "@/components/ui/alert-error";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { EstimateGasErrorType, SendTransactionErrorType } from "@wagmi/core";
import { Fuel } from "lucide-react";
import { useForm } from "react-hook-form";
import { isAddress } from "viem";
import { type BaseError } from "wagmi";
import { z } from "zod";

const transactionFormSchema = z.object({
  address: z.custom((val) => isAddress(val as string), "Invalid Address"),
  amount: z.string().min(1, "Amount must be greater than 0"),
  gas: z.string().optional(),
});

type TransactionFormValues = z.infer<typeof transactionFormSchema>;

type SendCryptoProps = {
  onSubmit: (values: TransactionFormValues) => void;
  onChange: (values: TransactionFormValues) => void;
  isConfirming: boolean;
  isConfirmed: boolean;
  transactionError: SendTransactionErrorType | null;
  estimateGas: string | null;
  estimateGasError: EstimateGasErrorType | null;
};

export function SendCryptoForm({
  onSubmit,
  onChange,
  isConfirming,
  isConfirmed,
  transactionError,
  estimateGas,
  estimateGasError,
}: SendCryptoProps) {
  const defaultValues: TransactionFormValues = {
    address: "",
    amount: "",
    gas: "",
  };

  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionFormSchema),
    mode: "onChange",
    defaultValues,
  });

  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Send Crypto</CardTitle>
        <CardDescription>Send some crypto to a friend</CardDescription>
      </CardHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onChange={form.handleSubmit(onChange)}
          className="space-y-8"
        >
          <div className="grid w-full items-center gap-4">
            <CardContent>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Receiver Address</FormLabel>
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
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator className="w-full my-8" />
              {estimateGas ? (
                <div className=" flex items-center space-x-4 rounded-md border p-4">
                  <Fuel />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Estimated Gas price
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {estimateGas}
                    </p>
                    <FormField
                      control={form.control}
                      name="gas"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Override</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ) : null}
            </CardContent>
            <CardFooter>
              <Button type="submit">Send &rarr;</Button>
              {isConfirming && <div>Waiting for confirmation...</div>}
              {isConfirmed && <div>Transaction confirmed.</div>}
              {transactionError && (
                <AlertError>
                  {(transactionError as BaseError).shortMessage ||
                    transactionError.message}
                </AlertError>
              )}
            </CardFooter>
          </div>
        </form>
      </Form>
    </Card>
  );
}
