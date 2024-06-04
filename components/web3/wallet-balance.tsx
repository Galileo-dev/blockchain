import { formatEther } from "viem";
import { useBalance } from "wagmi";

interface WalletBalanceProps {
  address: `0x${string}` | undefined;
}

export function WalletBalance(props: WalletBalanceProps) {
  const { data } = useBalance({ ...props });

  const formatAndRoundEther = (value: bigint, decimals: number = 4) => {
    const etherValue = parseFloat(formatEther(value));
    return etherValue.toFixed(decimals);
  };

  return (
    <>
      {data && (
        <>
          {formatAndRoundEther(data.value)}&nbsp;{data.symbol}
        </>
      )}
    </>
  );
}
