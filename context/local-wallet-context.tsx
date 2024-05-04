import { LocalWalletModal } from "@/components/local-wallet-modal";
import { customConnector } from "@/lib/customConnector";
import { Wallet } from "@/types";
import { createContext, useState } from "react";
import { useConnect } from "wagmi";

interface LocalWalletContextType {
  wallets: Wallet[];
  addWallet: (wallet: Wallet) => void;
  connectWallet: (wallet: Wallet) => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const LocalWalletContext = createContext<LocalWalletContextType>({
  wallets: [],
  addWallet: () => {},
  connectWallet: () => {},
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

const LocalWalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const connectWallet = (wallet: Wallet) => {
    connect({ connector: customConnector() });
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
        <LocalWalletModal closeModal={closeModal} isModalOpen={isModalOpen} />
      )}
    </LocalWalletContext.Provider>
  );
};

export { LocalWalletContext, LocalWalletProvider };
