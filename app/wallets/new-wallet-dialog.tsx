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
import { generateKeyStoreFile, generateWallet } from "@/lib/web3";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Address, PrivateKeyAccount, privateKeyToAccount } from "viem/accounts";
import { KeyStore } from "web3";
import { z } from "zod";

const formSchema = z.object({
  password: z.string(),
});

type NewWalletDialogProps = {
  handler: (account: PrivateKeyAccount) => void;
};

export function NewWalletDialog({ handler }: NewWalletDialogProps) {
  const [keystore, setKeystore] = useState<KeyStore | undefined>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // generate a wallet and add it to wallets in local storage
    const wallet = generateWallet();
    const account = privateKeyToAccount(wallet.privateKey as Address);
    handler(account);

    const keystore = await generateKeyStoreFile(wallet, values.password);
    setKeystore(keystore);
  }

  function downloadKeystore() {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(keystore)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "keystore.json";
    link.click();
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
      {keystore && (
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <Download />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Key Store</p>
            <p className="text-sm text-muted-foreground">
              You should keep this in a safe place.
            </p>
          </div>
          <Button onClick={downloadKeystore}>Download</Button>
        </div>
      )}
    </Form>
  );
}
