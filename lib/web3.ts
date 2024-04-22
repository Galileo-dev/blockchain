import type { Wallet } from "@/types"
import type { Address, PrivateKeyAccount } from "viem"
import { privateKeyToAccount } from "viem/accounts"
import { Web3, type KeyStore } from "web3"
import type { Web3Account } from "web3-eth-accounts"

const web3 = new Web3()

export async function getAccountFromKeyStore(
  keyStore: KeyStore,
  password: string
): Promise<PrivateKeyAccount> {
  try {
    const web3Account = await web3.eth.accounts.decrypt(
      JSON.stringify(keyStore),
      password
    )
    const account = privateKeyToAccount(web3Account.privateKey as Address)
    return account
  } catch (error) {
    console.error("Error decrypting the keystore", error)
    throw error
  }
}

export function generateWallet(): Web3Account {
  return web3.eth.accounts.create()
}

export async function generateKeyStoreFile(
  wallet: Web3Account,
  password: string
): Promise<Wallet> {
  return await web3.eth.accounts.encrypt(wallet.privateKey, password)
}
