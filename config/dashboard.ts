import { DashboardConfig } from "types";

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: "Check Ticket",
      href: "/doorman/dashboard/check-ticket",
      icon: "ScanBarcode",
    },
    {
      title: "Send Crypto",
      href: "/doorman/dashboard/send-crypto",
      icon: "Send",
    },
    {
      title: "Change Wallet",
      href: "/doorman/wallets",
      icon: "ArrowLeft",
      bottom: true,
    },
  ],
};
