"use client";
import { ShowMethod } from "@/components/show-ticket/show-method";
import { Card } from "@/components/ui/card";
import { RadioGroup } from "@/components/ui/radio-group";
import useLocalWallet from "@/hooks/use-local-wallets";
import { Wallet } from "@/types";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export function ShowMethods() {
  const { isDisconnected } = useAccount();
  const { openModal, connectWallet } = useLocalWallet();
  const [selected, setSelected] = useState<Wallet | undefined>();

  useEffect(() => {
    if (selected) {
      connectWallet(selected);
    }
  }, [selected, connectWallet]);

  useEffect(() => {
    if (selected && isDisconnected) {
      setSelected(undefined);
    }
  }, [isDisconnected, selected]);

  const { wallets } = useLocalWallet();

  return (
    <Card className="w-full">
      <RadioGroup
        value={selected ? selected.address : ""}
        className="flex flex-col gap-0"
      >
        {wallets.map((wallet) => (
          <ShowMethod
            key={wallet.address}
            title={wallet.address}
            icon="Wallet"
            isSelect={true}
            onClick={() => {
              setSelected(wallet);
            }}
          />
        ))}
      </RadioGroup>
      <ShowMethod title="Add verify wallet" icon="Plus" onClick={openModal} />
    </Card>
  );
}
