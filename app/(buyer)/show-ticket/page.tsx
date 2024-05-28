import { TicketPopup } from "@/components/ticket-popup";
import WalletSelector from "@/components/wallet-selector";

export default function TicketPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center space-y-2">
      <div className="container mx-auto my-20 flex flex-1 flex-col items-center justify-center space-y-2">
        <div className="w-full max-w-2xl space-y-4">
          <WalletSelector title="Choose a wallet to check your ticket">
            <TicketPopup />
          </WalletSelector>
        </div>
      </div>
    </div>
  );
}
