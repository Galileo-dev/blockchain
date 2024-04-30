"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "@/components/logo";

import { SiteNav } from "./site-nav";
import { Button } from "./ui/button";
import { ModeToggle } from "./ui/mode-toggle";

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <div className="flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-2">
          <Logo size={35} className="mx-2" />
          <SiteNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            {!pathname.includes("/wallet") && (
              <Button variant="outline" asChild>
                <Link href="/wallets">Wallet</Link>
              </Button>
            )}
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
