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
      title: "Token Details",
      href: "/doorman/dashboard/ticket-details",
      icon: "Ticket",
    },
    {
      title: "Change Wallet",
      href: "/doorman/wallets",
      icon: "ArrowLeft",
      bottom: true,
    },
  ],
};
