import { formatEther } from "viem";
import { useBalance } from "wagmi";

interface WalletBalanceProps {
  address: `0x${string}` | undefined;
  chainId: number | undefined;
}

export function WalletBalance(props: WalletBalanceProps) {
  const { data } = useBalance({ ...props });

  return (
    <div>
      {data && (
        <h1>
          {formatEther(data.value)}&nbsp;{data.symbol}
        </h1>
      )}
    </div>
  );
}
