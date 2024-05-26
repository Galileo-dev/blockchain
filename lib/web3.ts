import type { Wallet } from "@/types";
import type { Address, PrivateKeyAccount } from "viem";
import { mnemonicToAccount, privateKeyToAccount } from "viem/accounts";
import { type KeyStore } from "web3";
import {
  create,
  decrypt,
  encrypt,
  type Web3Account,
  privateKeyToAccount as web3PrivateKeyToAccount,
} from "web3-eth-accounts";

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

export function generateKeyStoreFromMnemonic(
  mnemonic: string,
  index: number,
  password: string,
): Promise<Wallet> {
  const account = mnemonicToAccount(mnemonic, {
    accountIndex: 0,
    addressIndex: index,
    changeIndex: 0,
  });

  const privateKey = account.getHdKey().privateKey;
  if (!privateKey) {
    throw new Error("Private key not found in the account");
  }

  // convert Uint8Array to hex string
  const privateKeyHex = Buffer.from(privateKey).toString("hex");

  const web3Account = web3PrivateKeyToAccount("0x" + privateKeyHex);

  return generateKeyStoreFile(web3Account, password);
}
