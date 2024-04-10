"use client";

import { Button } from "@/components/ui/button";
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
import { getAccountFromKeyStore } from "@/lib/web3";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PrivateKeyAccount } from "viem";
import { z } from "zod";

const formSchema = z.object({
  key_store_file: z.instanceof(File),
  password: z.string(),
});

type ImportWalletDialogProps = {
  handler: (account: PrivateKeyAccount) => void;
};

export function ImportWalletDialog({ handler }: ImportWalletDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      key_store_file: undefined,
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // read private key from file
    const reader = new FileReader();
    reader.onload = async function (e) {
      const account = await getAccountFromKeyStore(
        e.target?.result! as string,
        values.password
      );
      handler(account);
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
                  value={undefined}
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
