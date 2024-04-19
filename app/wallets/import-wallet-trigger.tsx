import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Wallet } from "@/types/wallet";
import { ImportWalletDialog } from "./import-wallet-dialog";

type ImportWalletTriggerProps = {
  handler: (wallet: Wallet) => void;
};

export function ImportWalletTrigger({ handler }: ImportWalletTriggerProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Import</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Import a wallet</DialogTitle>
          <DialogDescription>
            Import a wallet by uploading a key store file.
          </DialogDescription>
        </DialogHeader>
        <ImportWalletDialog handler={handler} />
      </DialogContent>
    </Dialog>
  );
}
