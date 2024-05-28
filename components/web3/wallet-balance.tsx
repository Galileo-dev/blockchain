import { formatEther } from "viem";
import { useBalance } from "wagmi";

interface WalletBalanceProps {
  address: `0x${string}` | undefined;
  chainId: number | undefined;
}

export function WalletBalance(props: WalletBalanceProps) {
  const { data } = useBalance({ ...props });

  const formatAndRoundEther = (value: bigint, decimals: number = 4) => {
    const etherValue = parseFloat(formatEther(value));
    return etherValue.toFixed(decimals);
  };

  return (
    <div>
      {data && (
        <h1>
          {formatAndRoundEther(data.value)}&nbsp;{data.symbol}
        </h1>
      )}
    </div>
  );
}
