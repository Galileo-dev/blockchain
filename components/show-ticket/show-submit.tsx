import { Button } from "@/components/ui/button";

interface ShowSubmitProps {
  onSubmit: () => void;
}

export function ShowSubmit({ onSubmit }: ShowSubmitProps) {
  return (
    <Button
      onClick={onSubmit}
      className="w-full bg-blue-600 text-white hover:bg-blue-700"
      size="lg"
    >
      Show
    </Button>
  );
}
