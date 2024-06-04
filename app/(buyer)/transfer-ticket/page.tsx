"use client";

import TransferTicket from "@/components/transfer-ticket";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import WalletSelector from "@/components/wallet-selector";

export default function TicketPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center space-y-2">
      <div className="container mx-auto my-20 flex flex-1 flex-col items-center justify-center space-y-2">
        <div className="w-full max-w-2xl space-y-4">
          <TransferTicketForm />
          <WalletSelector title="Choose a wallet to check your ticket">
            <TransferTicket />
          </WalletSelector>
        </div>
      </div>
    </div>
  );
}

function TransferTicketForm() {
  return (
    <Card className="w-full rounded-3xl">
      <CardHeader className="flex w-full flex-row items-center justify-between">
        <div className="flex flex-row items-center space-x-2">
          <div className="flex flex-col space-y-2">
            <CardTitle className="text-md">Return ticket to doorman</CardTitle>
            <CardDescription>
              <span>
                In order to enter the event, you must return your ticket to the
                doorman.
              </span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
