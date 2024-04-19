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
import { NewWalletDialog } from "./new-wallet-dialog";

type NewWalletTriggerProps = {
  handler: (wallet: Wallet) => void;
};

export function NewWalletTrigger({ handler }: NewWalletTriggerProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">New</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a wallet</DialogTitle>
          <DialogDescription>
            Create a wallet by generating a key store file encrypted with a
            password.
          </DialogDescription>
        </DialogHeader>
        <NewWalletDialog handler={handler} />
      </DialogContent>
    </Dialog>
  );
}
