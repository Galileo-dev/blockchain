import { Button } from "@/components/ui/moving-border";
import { useReadContracts } from "wagmi";

type BuyTicketProps = {
  contractAddress: string;
};

export default function BuyTicket({ contractAddress }: BuyTicketProps) {
  const result = useReadContracts();

  const ticketPrice;

  return (
    <div>
      <h1 className="md:text-2xl text-xl lg:text-6xl font-bold text-center text-white relative z-20">
        Aceternity
      </h1>
      <h2 className="md:text-lg text-lg lg:text-3xl font-bold text-center text-white relative z-20">
        Current price:&nbsp;{}
      </h2>
      <Button
        borderRadius="1.75rem"
        className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
      >
        Borders are cool
      </Button>
      {contractAddress}
    </div>
  );
}
