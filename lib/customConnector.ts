import { Wallet } from "@/types";
import { getWalletClient } from "@wagmi/core";
import {
  custom,
  fromHex,
  getAddress,
  numberToHex,
  RpcRequestError,
  SwitchChainError,
  type Address,
  type EIP1193RequestFn,
  type Hex,
  type Transport,
  type WalletRpcSchema,
} from "viem";
import { rpc } from "viem/utils";
import { ChainNotConfiguredError, createConnector } from "wagmi";
import { config as wagmiConfig } from "./config";
import { getAccountFromKeyStore } from "./web3";

export type CustomConnectorParameters = {
  selected?: Address;
  getPassword?: () => Promise<string>;
};

customConnector.type = "custom" as const;
export function customConnector({
  selected,
  getPassword,
}: CustomConnectorParameters) {
  type Provider = ReturnType<
    Transport<"custom", {}, EIP1193RequestFn<WalletRpcSchema>>
  >;
  let connected = false;
  let connectedChainId: number;
  selected =
    selected && !selected.startsWith("0x") ? `0x${selected}` : selected;

  return createConnector<Provider>((config) => ({
    id: "custom",
    name: "Custom Connector",
    type: customConnector.type,
    async setup() {
      connectedChainId = config.chains[0].id;
    },
    async connect({ chainId } = {}) {
      const provider = await this.getProvider();
      const accounts = await provider.request({
        method: "eth_requestAccounts",
      });

      let currentChainId = await this.getChainId();
      if (chainId && currentChainId !== chainId) {
        const chain = await this.switchChain!({ chainId });
        currentChainId = chain.id;
      }
      connected = true;

      return { accounts, chainId: currentChainId };
    },
    async disconnect() {
      connected = false;
    },
    async getAccounts() {
      const provider = await this.getProvider();
      const accounts = await provider.request({ method: "eth_accounts" });
      return accounts.map((x) => getAddress(x));
    },
    async getChainId() {
      const provider = await this.getProvider();
      const hexChainId = await provider.request({ method: "eth_chainId" });
      console.log("hexChainId", hexChainId);
      return fromHex(hexChainId, "number");
    },
    async isAuthorized() {
      if (!connected) return false;
      const accounts = await this.getAccounts();
      return !!accounts.length;
    },
    async switchChain({ chainId }) {
      const provider = await this.getProvider();
      const chain = config.chains.find((x) => x.id === chainId);
      if (!chain) throw new SwitchChainError(new ChainNotConfiguredError());

      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: numberToHex(chainId) }],
      });
      return chain;
    },
    onAccountsChanged(accounts) {
      if (accounts.length === 0) this.onDisconnect();
      else
        config.emitter.emit("change", {
          accounts: accounts.map((x) => getAddress(x)),
        });
    },
    onChainChanged(chain) {
      const chainId = Number(chain);
      config.emitter.emit("change", { chainId });
    },
    async onDisconnect(_error) {
      config.emitter.emit("disconnect");
      connected = false;
    },
    async getProvider({ chainId } = {}) {
      const chain =
        config.chains.find((x) => x.id === chainId) ?? config.chains[0];
      const url = chain.rpcUrls.default.http[0]!;

      const request: EIP1193RequestFn = async ({ method, params }) => {
        console.log("request", method, params);
        // eth methods
        if (method === "eth_chainId") return numberToHex(connectedChainId);
        if (method === "eth_requestAccounts") {
          const localStorageWallets = localStorage.getItem("wallets");
          if (!localStorageWallets) return [];
          const accounts = JSON.parse(localStorageWallets).map((x: Wallet) => {
            return !x.address.startsWith("0x") ? `0x${x.address}` : x.address;
          });

          if (selected) {
            const index = accounts.findIndex(
              (account) => account.toLowerCase() === selected.toLowerCase(),
            );
            if (index !== -1) {
              const [selectedAccount] = accounts.splice(index, 1);
              accounts.unshift(selectedAccount);
            }
          }
          console.log("accounts", accounts);
          console.log("selected", selected);
          return accounts;
        }
        if (method === "eth_sendTransaction") {
          type Params = [
            { from: Hex; to: Hex; value: Hex; gas: Hex; data: Hex },
          ];
          const transactionParams = (params as Params)[0];
          const localStorageWallets = localStorage.getItem("wallets");
          if (!localStorageWallets)
            throw new Error("Failed to sign message: No wallets found.");

          const wallet: Wallet = JSON.parse(localStorageWallets).find(
            (x: Wallet) =>
              (!x.address.startsWith("0x")
                ? `0x${x.address}`
                : x.address
              ).toLowerCase() === transactionParams.from.toLowerCase(),
          );
          if (!wallet) throw new Error("Matching wallet not found.");

          const password = getPassword ? await getPassword() : "";
          console.log("password", password);
          const account = await getAccountFromKeyStore(wallet, password);
          const client = await getWalletClient(wagmiConfig);
          const transactionHash = await client.sendTransaction({
            account,
            to: transactionParams.to,
            value: BigInt(transactionParams.value),
            gas: BigInt(transactionParams.gas),
          });
          return transactionHash;
        }
        if (method === "eth_signTypedData_v4") {
          // TODO(): Implement this method
          console.log("eth_signTypedData_v4 not implemented");
        }
        if (method === "wallet_switchEthereumChain") {
          type Params = [{ chainId: Hex }];
          connectedChainId = fromHex((params as Params)[0].chainId, "number");
          this.onChainChanged(connectedChainId.toString());
          return;
        }
        // other methods
        if (method === "personal_sign") {
          // Change `personal_sign` to `eth_sign` and swap params
          method = "eth_sign";
          type Params = [data: Hex, address: Address];
          params = [(params as Params)[1], (params as Params)[0]];
        }

        const body = { method, params };
        const { error, result } = await rpc.http(url, { body });
        if (error) throw new RpcRequestError({ body, error, url });

        return result;
      };
      return custom({ request })({ retryCount: 0 });
    },
  }));
}
