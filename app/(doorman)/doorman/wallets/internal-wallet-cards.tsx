"use client";

import { Wallet, Wallets } from "@/types";

import WalletCard from "./wallet-card";

type InternalWalletCardsProps = {
  wallets: Wallets;
  onClick: (wallet: Wallet) => void;
};

export default function InternalWalletCards({
  wallets,
  onClick,
}: InternalWalletCardsProps) {
  return (
    <>
      {wallets.map((wallet, index) => (
        <WalletCard
          key={index}
          onClick={() => onClick(wallet)}
          wallet={{ address: wallet.address, token: "seth" }}
        />
      ))}
    </>
  );
}
