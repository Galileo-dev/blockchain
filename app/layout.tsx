import SiteHeader from "@/components/site-header";
import { Providers } from "@/components/site-providers";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

import "@/styles/globals.css";

import { Inter as FontSans } from "next/font/google";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers>
          <div className="relative flex min-h-screen flex-col bg-background">
            <SiteHeader />
            <main className="flex flex-1 flex-col">{children}</main>
            <Toaster />
          </div>
        </Providers>
      </body>
    </html>
  );
}
