"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "connectkit";
import { ExternalLink } from "lucide-react";

export function CheckoutExternalWallet() {
  const { setOpen } = useModal();

  const show = () => {
    setOpen(true);
  };

  return (
    <Button variant="outline" size="sm" onClick={show}>
      <ExternalLink />
    </Button>
  );
}
