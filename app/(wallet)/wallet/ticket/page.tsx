import BuyTicket from "@/components/web3/buy-ticket";
import { ticketToken } from "@/config/contracts";

export default function TicketPage() {
  return (
    <>
      <div className="container mx-auto flex flex-1 flex-col items-center justify-center">
        <div className="space-y-2 overflow-scroll">
          <BuyTicket contracts={ticketToken} />
        </div>
      </div>
    </>
  );
}
