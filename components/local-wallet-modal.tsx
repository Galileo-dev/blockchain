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
import { useState } from "react";

interface LocalWalletModalProps {
  closeModal: () => void;
  isModalOpen: boolean;
}

export function LocalWalletModal({
  closeModal,
  isModalOpen,
}: LocalWalletModalProps) {
  const [action, setAction] = useState<ActionType | undefined>();

  function handleOpenChange(open: boolean) {
    if (!open) {
      closeModal();
    }
  }

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Local Wallets</DialogTitle>
            <DialogDescription>
              Local wallets are stored in local storage and are not recoverable
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            {action ? (
              <ShowAction action={ActionType.ADD_WALLET} />
            ) : (
              // space between buttons
              <div className="flex flex-1 space-x-8 justify-center items-center p-8">
                <Button onClick={() => setAction(ActionType.ADD_WALLET)}>
                  Add Wallet
                </Button>
                <Separator orientation="vertical" className="h-20" />
                <Button onClick={() => setAction(ActionType.IMPORT_WALLET)}>
                  Import Wallet
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

enum ActionType {
  ADD_WALLET,
  IMPORT_WALLET,
}

interface ShowActionProps {
  action: ActionType;
}

function ShowAction({ action }: ShowActionProps) {
  switch (action) {
    case ActionType.ADD_WALLET:
      return <NewWalletDialog handler={() => {}} />;
    case ActionType.IMPORT_WALLET:
      return <ImportWalletDialog handler={() => {}} />;
    default:
      return null; // It's a good practice to handle the default case
  }
}
