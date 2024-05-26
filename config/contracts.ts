import { Address, erc20Abi } from "viem";

const address = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512" as Address;

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
