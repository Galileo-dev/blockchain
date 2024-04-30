import { defineConfig } from "@wagmi/cli";
import { foundry, react } from "@wagmi/cli/plugins";
import { erc20Abi } from "viem";

export default defineConfig({
  out: "contracts/generated.ts",
  contracts: [
    {
      name: "erc20",
      abi: erc20Abi,
    },
  ],
  plugins: [
    foundry({
      project: "./contracts",
      exclude: ["**/*", "!Deploy.s.sol"],
    }),
    react(),
  ],
});
