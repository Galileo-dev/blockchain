"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { EstimateGasErrorType, SendTransactionErrorType } from "@wagmi/core";
import { useForm } from "react-hook-form";
import { isAddress } from "viem";
import { z } from "zod";

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
import EstimateGas from "@/components/web3/estimate-gas";
import { BaseError } from "types";

const transactionFormSchema = z.object({
  address: z.custom((val) => isAddress(val as string), "Invalid Address"),
  amount: z.string().min(1, "Amount must be greater than 0"),
  gas: z.string().optional(),
});

type TransactionFormValues = z.infer<typeof transactionFormSchema>;

interface SendCryptoFormProps {
  onSubmit: (values: TransactionFormValues) => void;
  onChange: (values: TransactionFormValues) => void;
  isConfirming: boolean;
  isConfirmed: boolean;
  transactionError: SendTransactionErrorType | null;
  estimateGas: string | null;
  estimateGasError: EstimateGasErrorType | null;
}

export function SendCryptoForm({
  onSubmit,
  onChange,
  isConfirming,
  isConfirmed,
  transactionError,
  estimateGas,
  estimateGasError,
}: SendCryptoFormProps) {
  const defaultValues: TransactionFormValues = {
    address: "",
    amount: "",
    gas: "",
  };

  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues,
  });

  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Send Crypto</CardTitle>
        <CardDescription>
          Can be used to send crypto from a doorman wallet back to a venue
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onChange={(e) => onChange(form.getValues())}
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
              <Separator className="my-8 w-full" />

              <EstimateGas
                estimateGas={estimateGas}
                estimateGasError={estimateGasError as BaseError}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit">Send &rarr;</Button>
              {isConfirming && <div>Waiting for confirmation...</div>}
              {isConfirmed && <div>Transaction confirmed.</div>}
              {transactionError && (
                <AlertError>
                  {(transactionError as BaseError).shortMessage}
                </AlertError>
              )}
            </CardFooter>
          </div>
        </form>
      </Form>
    </Card>
  );
}
