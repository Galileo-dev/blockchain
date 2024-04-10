"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

type WalletCardProps = {
  wallet: {
    address: string;
    token: string;
  };
};

export default function WalletCard({ wallet }: WalletCardProps) {
  const router = useRouter();

  return (
    <>
      <Card>
        <CardHeader onClick={() => router.push(`/wallet`)}>
          <CardTitle>{wallet.address}</CardTitle>
          <CardDescription>{wallet.token}</CardDescription>
        </CardHeader>
      </Card>
    </>
  );
}
