import { Button } from "@/components/ui/button";

interface CheckoutSubmitProps {
  onSubmit: () => void;
}

export function CheckoutSubmit({ onSubmit }: CheckoutSubmitProps) {
  return (
    <Button
      onClick={onSubmit}
      className="w-full bg-blue-600 text-white hover:bg-blue-700"
      size="lg"
    >
      Pay
    </Button>
  );
}
