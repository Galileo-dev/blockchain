"use client";

import { useAccount } from "wagmi";

export default function Wallet() {
  const { address, chain } = useAccount();
  return (
    <>
      <h1>Wallet: {address}</h1>
      {chain && <p>Chain: {chain.name}</p>}
    </>
  );
}
