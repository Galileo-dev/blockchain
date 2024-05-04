import { CheckoutExternalWallet } from "@/components/checkout/checkout-methods-option-external";
import { CheckoutMethodOptions } from "@/components/checkout/checkout-methods-options";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { LocalWalletProvider } from "@/context/local-wallet-context";

export default function CheckoutMethod() {
  return (
    <Card className="w-full rounded-3xl p-4">
      <CardHeader className="flex flex-row items-center justify-between w-full">
        <CardTitle className="text-md">Payment method</CardTitle>
        <CheckoutExternalWallet />
      </CardHeader>
      <LocalWalletProvider>
        <CheckoutMethodOptions />
      </LocalWalletProvider>
    </Card>
  );
}
