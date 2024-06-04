import { WalletCheckBalance } from "@/components/web3/check-wallet-balance";

export default function CheckTicketPage() {
  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center space-y-2">
        <div className="container mx-auto my-20 flex flex-1 flex-col items-center justify-center space-y-2">
          <div className="w-full max-w-2xl space-y-4">
            <WalletCheckBalance />
          </div>
        </div>
      </div>
    </>
  );
}
