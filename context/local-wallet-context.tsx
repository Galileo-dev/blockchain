import { LocalWalletModal } from "@/components/local-wallet-modal";
import { customConnector } from "@/lib/customConnector";
import { Wallet, Wallets } from "@/types";
import { createContext, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Address } from "viem";
import { useAccount, useConnect, useDisconnect } from "wagmi";

interface LocalWalletContextType {
  wallets: Wallet[];
  addWallet: (wallet: Wallet) => void;
  connectWallet: (wallet: Wallet) => Promise<void>;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const LocalWalletContext = createContext<LocalWalletContextType>({
  wallets: [],
  addWallet: () => {},
  connectWallet: async () => {},
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

const LocalWalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [wallets, setWallets] = useLocalStorage<Wallets>("wallets", [], {
    initializeWithValue: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect } = useConnect();

  const addWallet = (wallet: Wallet) => {
    setWallets((prevWallets) => [...prevWallets, wallet]);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const connectWallet = async (wallet: Wallet) => {
    if (isConnected) {
      await disconnect();
    }

    await connect({
      connector: customConnector({ selected: wallet.address as Address }),
    });
  };

  return (
    <LocalWalletContext.Provider
      value={{
        wallets,
        addWallet,
        connectWallet,
        isModalOpen,
        openModal,
        closeModal,
      }}
    >
      {children}
      {isModalOpen && (
        <LocalWalletModal
          closeModal={closeModal}
          isModalOpen={isModalOpen}
          addLocalWallet={addWallet}
        />
      )}
    </LocalWalletContext.Provider>
  );
};

export { LocalWalletContext, LocalWalletProvider };
