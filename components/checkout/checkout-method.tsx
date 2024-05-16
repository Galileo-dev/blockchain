import { CardDescription, CardHeader } from "@/components/ui/card";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { PaymentMethodOption } from "@/types";
import { icons } from "lucide-react";

type CheckoutMethodOptionProps = PaymentMethodOption & {
  icon?: string;
  isSelect?: boolean;
};

export function CheckoutMethod({
  title,
  isSelect = false,
  icon,
  onClick,
}: CheckoutMethodOptionProps) {
  const Icon = icon && icons[icon];

  return (
    <CardHeader
      className="cursor-pointer flex-row items-center space-x-4 border-b"
      onClick={onClick}
    >
      {icon && (
        <div className="rounded-lg border p-2 px-4">
          <Icon size={24} className="text-muted-foreground" />
        </div>
      )}
      <CardDescription className="select-none overflow-hidden truncate">
        {title}
      </CardDescription>
      <div className="flex-1" />
      {isSelect && <RadioGroupItem value={title} />}
    </CardHeader>
  );
}
