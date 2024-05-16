import { DashboardConfig } from "types";

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: "Check Ticket",
      href: "/doorman/dashboard/check-ticket",
      icon: "ScanBarcode",
    },
    {
      title: "Send Ticket",
      href: "/doorman/dashboard/send-ticket",
      icon: "TicketPlus",
    },
    {
      title: "Change Wallet",
      href: "/doorman/wallets",
      icon: "ArrowLeft",
      bottom: true,
    },
  ],
};
