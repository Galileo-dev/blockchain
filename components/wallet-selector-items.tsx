/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useLocalWallet from "@/hooks/use-local-wallets";
import { Wallet } from "@/types";
import { icons } from "lucide-react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export function WalletSelectorItems() {
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
          <WalletSelectorItem
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
      <WalletSelectorItem
        title="Add verify wallet"
        icon="Plus"
        onClick={openModal}
      />
    </Card>
  );
}

function WalletSelectorItem({ title, isSelect = false, icon, onClick }) {
  const Icon = icon && icons[icon];

  return (
    <CardHeader
      className="cursor-pointer flex-row items-center space-x-4 border-b"
      onClick={onClick}
    >
      {icon && (
        <div className="rounded-lg border p-2 px-4">
          <Icon size={24} className="text-muted-foreground" />
        </div>
      )}
      <CardDescription className="select-none overflow-hidden truncate">
        {title}
      </CardDescription>
      <div className="flex-1" />
      {isSelect && <RadioGroupItem value={title} />}
    </CardHeader>
  );
}
