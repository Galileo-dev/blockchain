"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function SiteNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/product"
        className={cn(
          "hover:text-foreground/80 transition-colors",
          pathname?.startsWith("/products")
            ? "text-foreground"
            : "text-foreground/60",
        )}
      >
        Products
      </Link>
      <Link
        href="/about"
        className={cn(
          "hover:text-foreground/80 transition-colors",
          pathname?.startsWith("/about")
            ? "text-foreground"
            : "text-foreground/60",
        )}
      >
        About
      </Link>
      <Link
        href="/mission"
        className={cn(
          "hover:text-foreground/80 transition-colors",
          pathname?.startsWith("/mission")
            ? "text-foreground"
            : "text-foreground/60",
        )}
      >
        Mission
      </Link>
    </nav>
  );
}
