# Distributed Application (DApp) Report: Ticketing System

## Project Overview

This project involves the creation of a Web3 Distributed Application (DApp) that implements a simple ticketing system utilizing the Ethereum Sepolia Testnet for Solidity smart contract deployments and Nextjs React for the front end.

## Table of Contents

- [Distributed Application (DApp) Report: Ticketing System](#distributed-application-dapp-report-ticketing-system)
  - [Project Overview](#project-overview)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Front End Design](#front-end-design)
    - [Wallet Creation Page](#wallet-creation-page)
    - [Balance Check Page](#balance-check-page)
    - [Ticket Purchase Page](#ticket-purchase-page)
    - [Ticket Transfer Page](#ticket-transfer-page)
  - [Blockchain Backend](#blockchain-backend)
    - [Smart Contract](#smart-contract)
    - [Deployment Details](#deployment-details)
  - [Code Overview](#code-overview)
    - [Front End Code](#front-end-code)
    - [Smart Contract Code](#smart-contract-code)
  - [Design Description](#design-description)
  - [Transaction Links](#transaction-links)
  - [Instructions to Run the Project](#instructions-to-run-the-project)
  - [Conclusion](#conclusion)

## Introduction

This project will demonstrate a potential use case for blockchain technology in event management, specifically ticketing systems. The DApp allows users to create local wallets, check their balance, purchase tickets, and transfer tickets back to the vendor. All deployed on the sepolia testnet

## Front End Design

I have changed the design of the project but it still meets all of the requirements of the project spec.

- the wallet creation is available through a dialog box. when selecting a wallet
- the balance check page is available after selecting a wallet
- the doorman has it's own view where they can check other user balances and make seth transactions.

### Wallet Creation Page

- **Functionality:**
  - [x] Ability to create a wallet.
  - [x] Ability to download the created wallet.
  - [x] Display of wallet details.
- **Implementation:**
  1. Use Web3js to generate a new wallet. [code here](components/web3/new-wallet-dialog.tsx)
  2. Save the generated keystore file to localstorage and offer a download link. [code here](components/web3/new-wallet-dialog.tsx)
  3. When wallet is selected from the radio selection, the wallet details will be displayed.

### Balance Check Page

- **Functionality:**
  - [x] Allow users to check their crypto and ticket token balances.
  - [x] Different views for attendee, doorman, and venue.
- **Implementation:**
  - Users can check their balance after they select a wallet.
  - Doorman can check their balance after they select a wallet.
  - Doorman can check other users balance by entering their address in the doorman balance check form.

### Ticket Purchase Page

- **Functionality:**
  - [x] Allow users to buy tickets (tokens) using Sepolia Ethereum (SETH).
- **Implementation:**
  - I choose to use [Wagmi](https://wagmi.sh/) to handle blockchain interactions, This meant I had to create a [custom connector](lib/customConnector.ts) to splice wagmi and web3js together. This custom connector is based on [wagmi mock connector](https://github.com/wevm/wagmi/blob/6aff9dec2f7d5b9cbb4e3889019f3e3fe5a61dde/packages/core/src/connectors/mock.ts).
  - User is given the option to choose a local wallet or a wagmi wallet (metamask, walletconnect, etc).
  - Once the user hit's the buy button:
    - if the user is using a local wallet, they will be prompted to give their password (this is done so that wallets private keys are stored encrypted at rest in local storage).
    - if the is using a wagmi wallet, they will be prompted to approve the transaction on their wallet of choice.
  - Sign the transaction and send it to the sepolia testnet.
  - Wait for the transaction to be mined and display the transaction hash.
- **Security Risks:**
  - The project spec force that we use the keystore file in the web app, however for a real application the user can not assume the application won't just steal their funds. It's important to only use services like metamask, walletconnect, etc. This is due to the fact that the decrypted keystore file contains the private key of the account which could be used by a malicious app to steal funds.

### Ticket Transfer Page

- **Functionality:**
  - [x] Allow users to transfer tickets back to the vendor.
- **Implementation:**
  - Uses the same wagmi connector as the ticket purchase page meaning it also has the same security risks.
  - Wagmi offers a `useContract` hook that allows us to call the contract functions.
  - `transfer` function is called with the address of the doorman as the recipient.

## Blockchain Backend

### Smart Contract

- **Functionality:**
  - Implementing ERC-20 standard.
  - Allow tickets to be purchased using Sepolia's native cryptocurrency (SETH).
- **Implementation:**
  - Solidity contract with ERC-20 compliance.
  - Additional functions for ticket purchases and transfers.

### Deployment Details

- **Contract Address:**
  - [0xd3C95400B76394f9923C72C017b2f603dc5069A5]
- **Holding Wallets:**
  - Contract Creator: [0x2bD9d720D21515909702569E6dF9BcdfD53B8711]
  - Ticket Purchaser: [0x64e7B67c53C441B483f76193eF6Acc23278414D4]
  - Vendor / Doorman: [0x2bD9d720D21515909702569E6dF9BcdfD53B8711]

## Code Overview

### Front End Code

- **HTML, CSS, JavaScript:**
  - [x] Wallet creation logic.
  - [x] Balance display logic.
  - [x] Ticket purchase and transfer logic.

### Smart Contract Code

- **Solidity:**
  - ERC-20 compliant contract.
  - Custom functions for the ticketing system.
    - A `buyTicket` function to purchase tickets at a set price (0.00001 SETH).

## Design Description

- **Architecture:**
  - Front end built with:
    - [NextJS & React](https://nextjs.org/)
    - [Shadcn UI](https://ui.shadcn.com/)
    - [Tailwind CSS](https://tailwindcss.com/)
    - [Wagmi](https://wagmi.sh/)
    - [Web3js (for keystore)](https://web3js.org/)
  - Backend using Solidity smart contracts deployed on Sepolia Testnet:
    - [Foundry](https://github.com/foundry-rs/foundry)
      - Foundry offered an array of tools that allowed me to quickly develop, test and deploy my smart contract to a devnet on `localhost`. This meant I could test changes without needing to deploy to the sepolia testnet.
      - The ERC-20 contract was based on [solmate's ERC20](https://github.com/transmissions11/solmate/blob/c892309933b25c03d32b1b0d674df7ae292ba925/src/tokens/ERC20.sol). This contract has been designed to use the minimum amount of gas possible:
        - minimizes the use of `require` statements to save gas.
        - `unchecked` has been used for arithmetic operations where it's not possible for an overflow to occur.
        - avoid's state changes when allowence is set to max.
- **Workflow:**
  - User has the choice of purchasing a ticket or verifying their balance
  - Ticket purchase:
    - User can choose from a local wallet or a wagmi wallet (metamask, walletconnect, etc).
    - The user can than purchase a ticket using the buy button
  - Verify balance:
    - User can check their balance after they select a wallet.
  - Doorman has a different view where they can look up other users balances with their address.
  - Doorman can also make seth transactions (send collected funds to another address, perhaps owned by the event organizer).

## Transaction Links

- **Successful Contract Deployment:**
  - [0.0.1](https://sepolia.etherscan.io/address/0xd3C95400B76394f9923C72C017b2f603dc5069A5)
- **Successful Token Purchase Execution:**
  - [Link](https://sepolia.etherscan.io/tx/0x6cf8b9d9fb9e4acd88756cc359bf6e57eacbfe81c815335d16a4aebea7e5ef82)
- **Wallet Top-Up Transactions:**
  - Contract Creator: [Link](https://sepolia.etherscan.io/tx/0x3bc234eca7e22e207e399733b84060587532b100e80d8f486e4da532d3c09dad)
  - Ticket Purchaser: [Link](https://sepolia.etherscan.io/tx/0x301bbc2888cc85846b9b323a3d80661bd1fe11d3cc09def3df2b6d58c0aaaf8d)
  - Vendor / Doorman: [Link]()

## Instructions to Run the Project

Install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Conclusion

This project successfully demonstrates the creation of a Web3 DApp for a ticketing system, leveraging blockchain technology to provide a secure and transparent solution for event management. The implementation includes wallet creation, balance checking, ticket purchasing, and ticket transferring functionalities.
