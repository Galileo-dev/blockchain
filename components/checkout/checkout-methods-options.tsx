"use client";

import { CheckoutMethodOption } from "@/components/checkout/checkout-methods-option";
import { Card } from "@/components/ui/card";
import useLocalWallet from "@/hooks/use-local-wallets";
import { useModal } from "connectkit";

export function CheckoutMethodOptions() {
  const { setOpen } = useModal();
  const { openModal } = useLocalWallet();

  const show = () => {
    setOpen(true);
  };

  const { wallets } = useLocalWallet();

  return (
    <Card className="w-full">
      {wallets.map((wallet) => (
        <CheckoutMethodOption
          key={wallet.address}
          title={wallet.address}
          icon="Wallet"
          isSelected={false}
          onClick={() => {}}
        />
      ))}
      <CheckoutMethodOption
        title="Add payment method"
        icon="Plus"
        onClick={openModal}
        isSelected={false}
      />
    </Card>
  );
}
