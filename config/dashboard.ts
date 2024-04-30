import { DashboardConfig } from "types";

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    { title: "Ticket", href: "/wallet/ticket", icon: "Ticket" },
    {
      title: "Utils",
      href: "/wallet/transaction",
      icon: "Wrench",
    },
    {
      title: "Back to Wallets",
      href: "/wallets",
      icon: "ArrowLeft",
      bottom: true,
    },
  ],
};
