import { SendCryptoForm } from "@/components/web3/send-crypto-form";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import {
  BaseError,
  EstimateGasErrorType,
  SendTransactionErrorType,
} from "@wagmi/core";
import { RpcRequestError, TransactionRejectedRpcError } from "viem";

const meta = {
  title: "Web3/SendCrypto",
  component: SendCryptoForm,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    onSubmit: { action: "submitted" },
    onChange: { action: "changed" },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onSubmit: fn(), onChange: fn() },
} satisfies Meta<typeof SendCryptoForm>;

export default meta;
type Story = StoryObj<typeof meta>;

const transactionError = new TransactionRejectedRpcError(
  new RpcRequestError({
    body: {},
    error: { code: -32003, message: "fee cap higher than 2^256-1" },
    url: "",
  })
) as SendTransactionErrorType;

const estimateGasError = new BaseError("Unknown error") as EstimateGasErrorType;
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    isConfirming: false,
    isConfirmed: false,
    estimateGas: "0.00025",
    transactionError: null,
    estimateGasError: null,
  },
};

export const TransactionConfirming: Story = {
  args: {
    isConfirming: true,
    isConfirmed: false,
    estimateGas: "0.00025",
    transactionError: null,
    estimateGasError: null,
  },
};

export const TransactionConfirmed: Story = {
  args: {
    isConfirming: false,
    isConfirmed: true,
    estimateGas: "0.00025",
    transactionError: null,
    estimateGasError: null,
  },
};

export const TransactionFailure: Story = {
  args: {
    isConfirming: false,
    isConfirmed: false,
    estimateGas: "0.00025",
    transactionError,
    estimateGasError: null,
  },
};

export const GasEstimationFailure: Story = {
  args: {
    isConfirming: false,
    isConfirmed: false,
    estimateGas: "0.00025",
    transactionError: null,
    estimateGasError,
  },
};
