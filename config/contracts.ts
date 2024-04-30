import { erc20Abi } from "viem";

const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const ticketToken = {
  allowFailure: false,
  contracts: [
    {
      address,
      abi: erc20Abi,
      functionName: "decimals",
    },
    {
      address,
      abi: erc20Abi,
      functionName: "name",
    },
    {
      address,
      abi: erc20Abi,
      functionName: "symbol",
    },
    {
      address,
      abi: erc20Abi,
      functionName: "totalSupply",
    },
  ],
};
