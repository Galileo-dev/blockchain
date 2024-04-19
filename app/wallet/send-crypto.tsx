"use client";

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
import { Fuel } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  formatEther,
  formatGwei,
  isAddress,
  parseEther,
  parseGwei,
} from "viem";
import {
  useAccount,
  useEstimateGas,
  useSendTransaction,
  useWaitForTransactionReceipt,
  type BaseError,
} from "wagmi";
import { z } from "zod";

const formSchema = z.object({
  address: z.custom((val) => isAddress(val as string), "Invalid Address"),
  amount: z.string().min(1, "Amount must be greater than 0"),
  gas: z.string().optional(),
});

export function SendCrypto() {
  const [formInputs, setFormInputs] = useState<z.infer<typeof formSchema>>();
  const { address, chain } = useAccount();
  const { data: estimateGas, error: estimateGasError } = useEstimateGas({
    account: address,
    to: formInputs?.address,
    value: formInputs?.amount ? parseEther(formInputs.amount) : undefined,
  });

  const {
    data: hash,
    error,
    isPending,
    sendTransaction,
  } = useSendTransaction();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      address: "",
      amount: "",
      gas: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const to = values.address;
    const value = values.amount;
    sendTransaction({
      to,
      value: parseEther(value),
      gas: values.gas ? parseGwei(values.gas) : estimateGas,
    });
    // const localStorageWallets = localStorage.getItem("wallets");
    // if (!localStorageWallets) return;
    // console.log("localStorageWallets", localStorageWallets);
    // const wallet: Wallet = JSON.parse(localStorageWallets).find(
    //   (x: Wallet) => x.address === address
    // );
    // if (!wallet) return;
    // console.log("wallet", wallet);
    // // decrypt wallet

    // const account = await getAccountFromKeyStore(wallet, "ilim");
    // if (!account) return;
    // const transactionHash = await account.signTransaction({
    //   to,
    //   value: parseEther(value),
    //   gas: estimateGas,
    // });
    // console.log("transactionHash", transactionHash);
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  async function onChange(values: z.infer<typeof formSchema>) {
    setFormInputs(values);
  }

  const formatBalance = (balance: bigint) => {
    return parseFloat(formatEther(balance, "wei")).toFixed(4);
  };

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
                      {formatGwei(estimateGas)}
                    </p>
                    {/* <FormField
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
                    /> */}
                  </div>
                </div>
              ) : null}
            </CardContent>
            <CardFooter>
              <Button type="submit">Send &rarr;</Button>
              {isConfirming && <div>Waiting for confirmation...</div>}
              {isConfirmed && <div>Transaction confirmed.</div>}
              {error && (
                <div>
                  Error: {(error as BaseError).shortMessage || error.message}
                </div>
              )}
            </CardFooter>
          </div>
        </form>
      </Form>
    </Card>
  );
}
