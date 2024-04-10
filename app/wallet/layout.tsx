"use client";

import { Separator } from "@/components/ui/separator";
import "@/styles/globals.css";
import { redirect } from "next/navigation";
import { useAccount } from "wagmi";
import DashboardMenu from "./wallet-menu";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // redirect to /wallets if no wallet is selected
  const { isConnected } = useAccount();
  if (!isConnected) {
    return redirect("/wallets");
  }
  return (
    <>
      <div className="space-x container mb-5 mt-5 flex flex-1 flex-col">
        <div className="space-y-0.5">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <Separator className="w-9/10 my-2" />
        <div className="flex flex-1 flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/5">
            <DashboardMenu />
          </aside>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </>
  );
}
