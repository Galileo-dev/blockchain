"use client";
import { CheckoutMethod } from "@/components/checkout/checkout-method";
import { Card } from "@/components/ui/card";
import { RadioGroup } from "@/components/ui/radio-group";
import useLocalWallet from "@/hooks/use-local-wallets";
import { Wallet } from "@/types";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export function CheckoutMethods() {
  const { isDisconnected } = useAccount();
  const { openModal, connectWallet, wallets } = useLocalWallet();
  const [selected, setSelected] = useState<Wallet | undefined>();

  useEffect(() => {
    if (selected) {
      connectWallet(selected);
    }
  }, [selected]);

  useEffect(() => {
    if (isDisconnected && selected) {
      setSelected(undefined);
    }
  }, [isDisconnected]);

  return (
    <Card className="w-full">
      <RadioGroup
        value={selected ? selected.address : ""}
        className="flex flex-col gap-0"
      >
        {wallets.map((wallet) => (
          <CheckoutMethod
            key={wallet.address}
            title={wallet.address}
            icon="Wallet"
            isSelect={true}
            onClick={() => setSelected(wallet)}
          />
        ))}
      </RadioGroup>
      <CheckoutMethod
        title="Add payment method"
        icon="Plus"
        onClick={openModal}
      />
    </Card>
  );
}
