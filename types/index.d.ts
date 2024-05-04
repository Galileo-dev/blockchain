import { type KeyStore } from "web3";

export type Wallet = KeyStore;
// alias wallet with keystore
export type Wallets = Wallet[];

export type BaseError = {
  message: string;
  shortMessage: string;
};

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  bottom?: boolean;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: NavLink[];
    }
);

export type DashboardConfig = {
  sidebarNav: SidebarNavItem[];
};

export type PaymentMethodOptions = PaymentMethodOption[];

export type PaymentMethodOption = {
  title: string;
  onClick: () => void;
};
