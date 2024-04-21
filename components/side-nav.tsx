"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SidebarNavItem } from "@/types";
import { icons } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SideNavProps {
  items: SidebarNavItem[];
}

export function SideNav({ items }: SideNavProps) {
  const path = usePathname();

  if (!items?.length) {
    return null;
  }

  return (
    <div className="flex h-full flex-1 flex-col items-center justify-start space-y-2">
      {items.map((item, index) => {
        const Icon = icons[item.icon || "HelpCircle"];
        return (
          item.href && (
            <div
              key={index}
              className={cn("flex w-full max-w-screen-sm", {
                "!mt-auto": item.bottom,
              })}
            >
              <Button
                variant={path === item.href ? "default" : "ghost"}
                className={cn(
                  "mt-0 shrink-0 grow",
                  item.disabled && "cursor-not-allowed opacity-80",
                )}
                size="lg"
                asChild
              >
                <Link href={item.disabled ? "/" : item.href}>
                  <Icon size={24} className="mr-2" />
                  {item.title}
                </Link>
              </Button>
            </div>
          )
        );
      })}
    </div>
  );
}
