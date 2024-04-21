import SiteHeader from "@/components/site-header";
import { Providers } from "@/components/site-providers";
import { Toaster } from "@/components/ui/toaster";
import { config } from "@/lib/config";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers initialState={initialState}>
          <div className="relative flex min-h-screen flex-col bg-background">
            <SiteHeader />
            <main className="flex flex-col flex-1">{children}</main>
            <Toaster />
          </div>
        </Providers>
      </body>
    </html>
  );
}
