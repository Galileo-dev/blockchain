import { LocalWalletModal } from "@/components/local-wallet/local-wallet-modal";
import { LocalWalletPasswordModal } from "@/components/local-wallet/local-wallet-password-modal";
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
  getPassword: () => Promise<string>;
}

const LocalWalletContext = createContext<LocalWalletContextType>({
  wallets: [],
  addWallet: () => {},
  connectWallet: async () => {},
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
  getPassword: () => Promise.resolve(""),
});

const LocalWalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [wallets, setWallets] = useLocalStorage<Wallets>("wallets", [], {
    initializeWithValue: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordResolver, setPasswordResolver] = useState<
    ((value: string) => void) | null
  >(null);
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

  const openPasswordModal = () => {
    setIsPasswordModalOpen(true);
  };

  const closePasswordModal = () => {
    setIsPasswordModalOpen(false);
  };

  const connectWallet = async (wallet: Wallet) => {
    if (isConnected) {
      await disconnect();
    }

    await connect({
      connector: customConnector({
        selected: wallet.address as Address,
        getPassword,
      }),
    });
  };

  const getPassword = async () => {
    openPasswordModal();
    return new Promise<string>((resolve) => {
      setPasswordResolver(() => resolve);
    });
  };

  const handlePasswordSubmit = (values: { password: string }) => {
    if (passwordResolver) {
      passwordResolver(values.password);
      setPasswordResolver(null);
      closePasswordModal();
    }
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
        getPassword: async () => {
          openPasswordModal();
          return new Promise(() => {});
        },
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
      {isPasswordModalOpen && (
        <LocalWalletPasswordModal
          closeModal={closePasswordModal}
          isModalOpen={isPasswordModalOpen}
          onSubmit={handlePasswordSubmit}
        />
      )}
    </LocalWalletContext.Provider>
  );
};

export { LocalWalletContext, LocalWalletProvider };
