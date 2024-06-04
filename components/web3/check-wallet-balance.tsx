"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { isAddress } from "viem";
import { z } from "zod";

import { TicketBalance } from "@/components/ticket-balance";
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
import { WalletBalance } from "@/components/web3/wallet-balance";
import { useState } from "react";

const walletCheckFormSchema = z.object({
  address: z.custom((val) => isAddress(val as string), "Invalid Address"),
});

type WalletCheckFormValues = z.infer<typeof walletCheckFormSchema>;

export function WalletCheckBalance() {
  const [formInputs, setFormInputs] = useState<WalletCheckFormValues | null>(
    null,
  );

  const defaultValues: WalletCheckFormValues = {
    address: "",
  };

  const form = useForm<WalletCheckFormValues>({
    resolver: zodResolver(walletCheckFormSchema),
    defaultValues,
  });

  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Check Wallet Balance</CardTitle>
        <CardDescription>view the balance of an attendee</CardDescription>
      </CardHeader>

      <Form {...form}>
        <form
          onChange={(e) => setFormInputs(form.getValues())}
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
            </CardContent>
            <CardFooter>
              <WalletBalance address={form.getValues().address} />
              <br />
              <TicketBalance address={form.getValues().address} />
            </CardFooter>
          </div>
        </form>
      </Form>
    </Card>
  );
}
