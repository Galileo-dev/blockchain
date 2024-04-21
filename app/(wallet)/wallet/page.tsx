"use client";

import { SendCrypto } from "@/components/web3/send-crypto";

export default function Wallet() {
  return (
    <>
      {/* <h1>Wallet: {address}</h1>
      {chain && <p>Chain: {chain.name}</p>}
      {balance.data && (
        <p>
          Balance: {balance.data.formatted}&nbsp;
          {balance.data.symbol}
        </p>
      )} */}
      <div className="container flex flex-1 flex-col items-center justify-center mx-auto">
        <div className="space-y-2 overflow-scroll">
          <SendCrypto />
        </div>
      </div>
    </>
  );
}
