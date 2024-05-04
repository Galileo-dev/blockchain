import { CardDescription, CardHeader } from "@/components/ui/card";
import { PaymentMethodOption } from "@/types";
import { icons } from "lucide-react";

// extend the PaymentMethodOption type but add icon
type CheckoutMethodOptionProps = PaymentMethodOption & {
  icon?: string;
  isSelected: boolean;
};

export function CheckoutMethodOption({
  title,
  isSelected,
  icon,
  onClick,
}: CheckoutMethodOptionProps) {
  const Icon = icon && icons[icon];
  return (
    <CardHeader
      className="flex-row items-center space-x-4 border-b"
      onClick={onClick}
    >
      {icon && (
        <div className="rounded-lg p-2 px-4 border">
          <Icon size={24} className="text-muted-foreground" />
        </div>
      )}
      <CardDescription>{title}</CardDescription>
    </CardHeader>
  );
}
