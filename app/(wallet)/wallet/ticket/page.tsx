import BuyTicket from "@/components/web3/buy-ticket";

export default function TicketPage() {
  const contractAddress = process.env.NEXT_PUBLIC_ERC20_CONTRACT_ADDRESS!;

  return (
    <>
      <div className="container mx-auto flex flex-1 flex-col items-center justify-center">
        <div className="space-y-2 overflow-scroll">
          <BuyTicket contractAddress={contractAddress} />
        </div>
      </div>
    </>
  );
}
