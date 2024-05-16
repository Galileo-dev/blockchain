"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ImportWalletDialog } from "@/components/web3/import-wallet-dialog";
import { NewWalletDialog } from "@/components/web3/new-wallet-dialog";
import { Wallet } from "@/types";
import { useState } from "react";

interface LocalWalletModalProps {
  closeModal: () => void;
  addLocalWallet: (wallet: Wallet) => void;
  isModalOpen: boolean;
}

enum ModalStep {
  SELECT_OPTION,
  CREATE_WALLET,
  IMPORT_WALLET,
}

export function LocalWalletModal({
  closeModal,
  isModalOpen,
  addLocalWallet,
}: LocalWalletModalProps) {
  const [step, setStep] = useState(ModalStep.SELECT_OPTION);

  function handleOpenChange(open: boolean) {
    if (!open) {
      closeModal();
    }
  }

  function handleSelectOption(option: ModalStep) {
    setStep(option);
  }

  function renderStep() {
    switch (step) {
      case ModalStep.SELECT_OPTION:
        return <WalletOptions onSelectOption={handleSelectOption} />;
      case ModalStep.CREATE_WALLET:
        return <NewWalletDialog handler={addLocalWallet} />;
      case ModalStep.IMPORT_WALLET:
        return <ImportWalletDialog handler={addLocalWallet} />;
      default:
        return null;
    }
  }

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          {renderStep()}
        </DialogContent>
      </Dialog>
    </>
  );
}

function WalletOptions({
  onSelectOption,
}: {
  onSelectOption: (option: ModalStep) => void;
}) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Local Wallets</DialogTitle>
        <DialogDescription>
          Local wallets are stored in local storage and encrypted until needed.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-1 items-center justify-center space-x-8 p-8">
        <Button onClick={() => onSelectOption(ModalStep.CREATE_WALLET)}>
          Add Wallet
        </Button>
        <Separator orientation="vertical" className="h-20" />
        <Button onClick={() => onSelectOption(ModalStep.IMPORT_WALLET)}>
          Import Wallet
        </Button>
      </div>
    </>
  );
}
