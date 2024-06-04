import { ticketTokenConfig } from "@/config/contracts";
import { useReadContracts } from "wagmi";

interface TicketBalanceProps {
  address: `0x${string}` | undefined;
}

export function TicketBalance(props: TicketBalanceProps) {
  const { data } = useReadContracts({
    contracts: [
      {
        ...ticketTokenConfig,
        functionName: "balanceOf",
        args: [props.address],
      },
      {
        ...ticketTokenConfig,
        functionName: "symbol",
      },
    ],
  });

  const balance = data?.[0].result;
  const symbol = data?.[1].result;

  return (
    <>
      {balance ? balance.toString() : 0}&nbsp;{symbol}
    </>
  );
}
