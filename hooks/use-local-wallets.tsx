import { LocalWalletContext } from "@/context/local-wallet-context";
import { useContext } from "react";

const useLocalWallet = () => {
  const {
    wallets,
    addWallet,
    connectWallet,
    isModalOpen,
    openModal,
    closeModal,
  } = useContext(LocalWalletContext);

  return {
    wallets,
    addWallet,
    connectWallet,
    isModalOpen,
    openModal,
    closeModal,
  };
};

export default useLocalWallet;
