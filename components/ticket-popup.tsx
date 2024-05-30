"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ticketTokenConfig } from "@/config/contracts";
import { useAccount, useReadContract } from "wagmi";

export function TicketPopup() {
  const { address } = useAccount();

  const { data: balance } = useReadContract({
    ...ticketTokenConfig,
    functionName: "balanceOf",
    args: [address],
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="w-full bg-blue-600 text-white hover:bg-blue-700"
          size="lg"
          disabled={!address}
        >
          Open
        </Button>
      </SheetTrigger>
      {address && (
        <SheetContent side="bottom" className="rounded-t-2xl">
          <SheetHeader>
            <SheetTitle>Validate Ticket</SheetTitle>
            <SheetDescription>
              Please present your ticket to the scanner
            </SheetDescription>
          </SheetHeader>

          <div className="mx-auto grid w-[250px] gap-4 py-4">
            <div>
              <h1 className="text-center text-lg font-bold">
                Ticket Balance: {balance?.toString()}
              </h1>
              <p className="text-center text-sm text-gray-500">
                Address: {address}
              </p>
            </div>
            {/* <QRCode address={address} /> */}
            <h2 className="text-center text-lg font-bold">
              Transfer to Doorman
            </h2>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Done</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      )}
    </Sheet>
  );
}
