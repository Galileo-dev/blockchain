"use client";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useDisconnect } from "wagmi";

export default function Doorman() {
  const { disconnect } = useDisconnect();

  useEffect(() => {
    disconnect();
  }, []);

  redirect("/doorman/wallets");
}
