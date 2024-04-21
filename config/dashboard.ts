import { DashboardConfig } from "types";

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: "Wallet",
      href: "/dashboard/transactions",
      icon: "ArrowLeftRight",
    },
    { title: "Friends", href: "/dashboard/send", icon: "PersonStanding" },
    {
      title: "Back to Wallets",
      href: "/wallets",
      icon: "ArrowLeft",
      bottom: true,
    },
  ],
};
