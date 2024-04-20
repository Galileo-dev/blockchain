"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  ArrowLeftRight,
  LucideIcon,
  PersonStanding,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DashboardItem {
  name: string;
  location: string;
  icon: LucideIcon;
  bottom?: boolean;
  isAdmin?: boolean;
}

const getDashboardItems = () => {
  const items: DashboardItem[] = [
    {
      name: "Wallet",
      location: "/dashboard/transactions",
      icon: ArrowLeftRight,
    },
    { name: "Friends", location: "/dashboard/send", icon: PersonStanding },

    {
      name: "Back to Wallets",
      location: "/wallets",
      icon: ArrowLeft,
      bottom: true,
    },
  ];

  return items;
};

export default function WalletOptions() {
  const pathname = usePathname();
  const dashboardItems = getDashboardItems();
  return (
    <>
      <div className="flex h-full flex-1 flex-col justify-start items-center space-y-2">
        {dashboardItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className={cn("flex w-full max-w-screen-sm", {
                "!mt-auto": item.bottom,
              })}
            >
              <Button
                variant={pathname === item.location ? "default" : "ghost"}
                className={cn("mt-0 flex-shrink-0 flex-grow", {
                  "bg-red-700": item.isAdmin && pathname !== item.location,
                })}
                size="lg"
                asChild
              >
                <Link href={item.location}>
                  <Icon size={24} className="mr-2" />
                  {item.name}
                </Link>
              </Button>
            </div>
          );
        })}
      </div>
    </>
  );
}
