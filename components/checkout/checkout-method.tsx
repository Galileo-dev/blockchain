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
      className="flex-row items-center space-x-4 border-b cursor-pointer"
      onClick={onClick}
    >
      {icon && (
        <div className="rounded-lg p-2 px-4 border">
          <Icon size={24} className="text-muted-foreground" />
        </div>
      )}
      <CardDescription className="overflow-hidden truncate select-none">
        {title}
      </CardDescription>
      <div className="flex-1" />
      {isSelect && <RadioGroupItem value={title} />}
    </CardHeader>
  );
}
