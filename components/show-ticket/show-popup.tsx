import { OrbQRCode } from "@/components/show-ticket/orb-qr-code";
import { ShowTicketBalance } from "@/components/show-ticket/show-ticket-balance";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAccount } from "wagmi";

export function ShowPopup() {
  const { address } = useAccount();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="w-full bg-blue-600 text-white hover:bg-blue-700"
          size="lg"
          disabled={!address}
        >
          Open
        </Button>
      </SheetTrigger>
      {address && (
        <SheetContent side="bottom" className="rounded-t-2xl">
          <SheetHeader>
            <SheetTitle>Validate Ticket</SheetTitle>
            <SheetDescription>
              Please present your ticket to the scanner
            </SheetDescription>
          </SheetHeader>

          <div className="mx-auto grid w-[250px] gap-4 py-4">
            <ShowTicketBalance address={address} />
            <OrbQRCode address={address} />
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Done</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      )}
    </Sheet>
  );
}
