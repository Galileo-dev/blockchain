import type { Wallet } from "@/types";
import type { Address, PrivateKeyAccount } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { type KeyStore } from "web3";
import { create, decrypt, encrypt, type Web3Account } from "web3-eth-accounts";

export async function getAccountFromKeyStore(
  keyStore: KeyStore,
  password: string,
): Promise<PrivateKeyAccount> {
  try {
    const web3Account = await decrypt(JSON.stringify(keyStore), password);
    const account = privateKeyToAccount(web3Account.privateKey as Address);
    return account;
  } catch (error) {
    console.error("Error decrypting the keystore", error);
    throw error;
  }
}

export function generateWallet(): Web3Account {
  return create();
}

export async function generateKeyStoreFile(
  wallet: Web3Account,
  password: string,
): Promise<Wallet> {
  return await encrypt(wallet.privateKey, password);
}
