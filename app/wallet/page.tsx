"use client";

import { SendCrypto } from "@/components/web3/send-crypto";
import { useAccount, useBalance } from "wagmi";

export default function Wallet() {
  const { address, chain } = useAccount();

  const balance = useBalance({
    address,
  });
  return (
    <>
      <h1>Wallet: {address}</h1>
      {chain && <p>Chain: {chain.name}</p>}
      {balance.data && (
        <p>
          Balance: {balance.data.formatted}&nbsp;
          {balance.data.symbol}
        </p>
      )}
      <SendCrypto />
    </>
  );
}
