import { SendCrypto } from "@/components/web3/send-crypto";

export default function SendTicketPage() {
  return (
    <>
      <div className="container mx-auto flex flex-1 flex-col items-center justify-center">
        <div className="space-y-2 overflow-scroll">
          <SendCrypto />
        </div>
      </div>
    </>
  );
}
