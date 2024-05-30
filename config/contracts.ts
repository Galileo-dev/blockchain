import { Address, erc20Abi } from "viem";

const address = (process.env.NEXT_PUBLIC_TICKET_TOKEN_ADDRESS ||
  "0x5FbDB2315678afecb367f032d93F642f64180aa3") as Address;

const buyTicketAbi = {
  constant: false,
  inputs: [],
  name: "buyTicket",
  outputs: [],
  payable: true,
  stateMutability: "payable",
  type: "function",
};

export const ticketTokenConfig = {
  address,
  abi: [...erc20Abi, buyTicketAbi],
} as const;
