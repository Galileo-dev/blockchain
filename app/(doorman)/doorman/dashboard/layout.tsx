"use client";

import { SideNav } from "@/components/side-nav";
import { TicketBalance } from "@/components/ticket-balance";
import { Separator } from "@/components/ui/separator";
import { WalletBalance } from "@/components/web3/wallet-balance";
import { dashboardConfig } from "@/config/dashboard";

import "@/styles/globals.css";

import { redirect } from "next/navigation";
import { useAccount } from "wagmi";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // redirect to /wallets if no wallet is selected
  const { isConnected, address, chain } = useAccount();
  if (!isConnected) {
    return redirect("/doorman/wallets");
  }

  return (
    <>
      <div className="space-x container my-5 flex flex-1 flex-col">
        <div className="flex flex-row justify-between space-y-0.5">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex flex-1 justify-center">
            <h2 className="text-2xl font-bold tracking-tight">{address}</h2>
          </div>
          <div className="mr-8 flex">
            <TicketBalance address={address} />
          </div>
          <div className="flex justify-end">
            <WalletBalance address={address} />
          </div>
        </div>
        <Separator className="w-9/10 my-2" />
        <div className="flex flex-1 flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/5">
            <SideNav items={dashboardConfig.sidebarNav} />
          </aside>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </>
  );
}
