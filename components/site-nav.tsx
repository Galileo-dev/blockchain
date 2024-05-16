"use client";

import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function SiteNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    />
  );
}
