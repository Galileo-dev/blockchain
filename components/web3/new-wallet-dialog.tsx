"use client";

import { Wallet } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { type KeyStore } from "web3";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

type NewWalletTriggerProps = {
  handler: (wallet: Wallet) => void;
};

export function NewWalletTrigger({ handler }: NewWalletTriggerProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">New</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <NewWalletDialog handler={handler} />
      </DialogContent>
    </Dialog>
  );
}

export function NewWalletHeader() {
  return (
    <DialogHeader>
      <DialogTitle>Create a wallet</DialogTitle>
      <DialogDescription>
        Create a wallet by generating a key store file encrypted with a
        password.
      </DialogDescription>
    </DialogHeader>
  );
}

const newWalletFormSchema = z.object({
  password: z.string(),
});

type NewWalletFormValues = z.infer<typeof newWalletFormSchema>;

type NewWalletDialogProps = {
  handler: (wallet: Wallet) => void;
};

export function NewWalletDialog({ handler }: NewWalletDialogProps) {
  const [keystore, setKeystore] = useState<KeyStore | undefined>();

  const form = useForm<NewWalletFormValues>({
    resolver: zodResolver(newWalletFormSchema),
    mode: "onBlur",
    defaultValues: {
      password: "",
    },
  });

  function downloadKeystore() {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(keystore),
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "keystore.json";
    link.click();
  }

  async function onSubmit(values: NewWalletFormValues) {
    // generate a wallet and add it to wallets in local storage
    const wallet = generateWallet();
    const keystore = await generateKeyStoreFile(wallet, values.password); // Todo: check this is secure
    handler(keystore);
    setKeystore(keystore);
  }

  return (
    <>
      <NewWalletHeader />
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
    </>
  );
}
