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
import { zodResolver } from "@hookform/resolvers/zod";
import { Download } from "lucide-react";
import { useForm } from "react-hook-form";
import { isAddress } from "viem";
import { z } from "zod";

const formSchema = z.object({
  address: z.custom<`0x${string}`>(
    (val) => isAddress(val as string),
    "Invalid Address"
  ),
  amount: z.string().min(1, "Amount must be greater than 0"),
});

export function SendCrypto() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      address: "0x00000000000",
      amount: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("SendCrypto onSubmit");
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
