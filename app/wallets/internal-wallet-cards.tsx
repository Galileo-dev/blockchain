"use client";

import { PrivateKeyAccount } from "viem";
import WalletCard from "./wallet-card";

const fakeWallets: {
  name: string;
  balance: number;
  token: string;
  address: string;
}[] = [
  {
    name: "My Wallet",
    balance: 1000,
    token: "ETH",
    address: "0x1234...5678",
  },
  {
    name: "My Wallet",
    balance: 1000,
    token: "ETH",
    address: "0x1234...5678",
  },
];

type InternalWalletCardsProps = {
  wallets: PrivateKeyAccount[];
};

export default function InternalWalletCards({
  wallets,
}: InternalWalletCardsProps) {
  return (
    <>
      {wallets.map((wallet, index) => (
        <WalletCard
          key={index}
          wallet={{ address: wallet.address, token: "seth" }}
        />
      ))}
    </>
  );
}
