"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { generateWallet } from "@/lib/web3";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Address, PrivateKeyAccount, privateKeyToAccount } from "viem/accounts";
import { z } from "zod";

const formSchema = z.object({
  key_store_file: z.instanceof(File),
  password: z.string(),
});

type NewWalletDialogProps = {
  handler: (account: PrivateKeyAccount) => void;
};

export function NewWalletDialog({ handler }: NewWalletDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // generate a wallet and add it to wallets in local storage
    const wallet = generateWallet();
    const account = privateKeyToAccount(wallet.privateKey as Address);

    handler(account);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Key store password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Generate</Button>
      </form>
    </Form>
  );
}
