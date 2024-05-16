import { SendCrypto } from "@/components/web3/send-crypto";

export default function SendTicketPage() {
  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center space-y-2">
        <div className="container mx-auto my-20 flex flex-1 flex-col items-center justify-center space-y-2">
          <div className="space-y-4 max-w-2xl w-full">
            <SendCrypto />
          </div>
        </div>
      </div>
    </>
  );
}
