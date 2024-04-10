import { Address, PrivateKeyAccount } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { KeyStore, Web3 } from "web3";
import { type Web3Account } from "web3-eth-accounts";
const web3 = new Web3();

export async function getAccountFromKeyStore(
  keyStore: string,
  password: string
): Promise<PrivateKeyAccount> {
  const web3Account = await web3.eth.accounts.decrypt(keyStore, password);
  const account = privateKeyToAccount(web3Account.privateKey as Address);
  return account;
}

export function generateWallet(): Web3Account {
  return web3.eth.accounts.create();
}

export async function generateKeyStoreFile(
  wallet: Web3Account,
  password: string
): Promise<KeyStore> {
  return await web3.eth.accounts.encrypt(wallet.privateKey, password);
}
