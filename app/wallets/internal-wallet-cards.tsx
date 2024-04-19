"use client";

import { customConnector } from "@/lib/customConnector";
import { Wallet } from "@/types/wallet";
import { useConnect } from "wagmi";
import { KeyStore } from "web3";
import WalletCard from "./wallet-card";

type InternalWalletCardsProps = {
  wallets: KeyStore[];
};

export default function InternalWalletCards({
  wallets,
}: InternalWalletCardsProps) {
  const { connect } = useConnect();

  async function connectCustomWallet(wallet: Wallet) {
    connect({ chainId: 32382, connector: customConnector() }); // sepolia
  }

  return (
    <>
      {wallets.map((wallet, index) => (
        <WalletCard
          key={index}
          onClick={() => connectCustomWallet(wallet)}
          wallet={{ address: wallet.address, token: "seth" }}
        />
      ))}
    </>
  );
}
