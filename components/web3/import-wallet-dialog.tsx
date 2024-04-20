"use client";

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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Wallet } from "@/types/wallet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { KeyStore } from "web3";
import { z } from "zod";

type ImportWalletTriggerProps = {
  handler: (wallet: Wallet) => void;
};

export function ImportWalletTrigger({ handler }: ImportWalletTriggerProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Import</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Import a wallet</DialogTitle>
          <DialogDescription>
            Import a wallet by uploading a key store file.
          </DialogDescription>
        </DialogHeader>
        <ImportWalletDialog handler={handler} />
      </DialogContent>
    </Dialog>
  );
}

const importWalletFormSchema = z.object({
  key_store_file: z.any(), // Todo: add validation
  password: z.string(),
});

type ImportWalletFormValues = z.infer<typeof importWalletFormSchema>;

type ImportWalletDialogProps = {
  handler: (account: Wallet) => void;
};

const defaultValues: ImportWalletFormValues = {
  key_store_file: undefined,
  password: "",
};

export function ImportWalletDialog({ handler }: ImportWalletDialogProps) {
  const form = useForm<ImportWalletFormValues>({
    resolver: zodResolver(importWalletFormSchema),
    mode: "onBlur",
    defaultValues,
  });

  function onSubmit(values: ImportWalletFormValues) {
    const reader = new FileReader();
    // read the json file
    reader.onload = async function (e) {
      let keyStore: KeyStore;
      try {
        keyStore = JSON.parse(e.target?.result as string);
      } catch (error) {
        // show error if the file is not json
        form.setError("key_store_file", {
          type: "manual",
          message: "Invalid key store file",
        });
        return;
      }
      handler(keyStore as Wallet);
    };
    reader.readAsText(values.key_store_file);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="key_store_file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Key Store File</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  {...field}
                  value={undefined} // needed for the input to work!
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files) {
                      field.onChange(files[0]);
                    }
                  }}
                />
              </FormControl>
              <FormDescription>
                This is your wallets private key.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
