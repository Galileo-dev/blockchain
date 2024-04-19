"use client";

import { customConnector } from "@/lib/customConnector";
import { PrivateKeyAccount } from "viem";
import { useConnect } from "wagmi";
import WalletCard from "./wallet-card";

type InternalWalletCardsProps = {
  wallets: PrivateKeyAccount[];
};

export default function InternalWalletCards({
  wallets,
}: InternalWalletCardsProps) {
  const { connect } = useConnect();

  async function connectCustomWallet(account: PrivateKeyAccount) {
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
