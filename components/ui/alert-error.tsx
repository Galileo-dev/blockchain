import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import React from "react";

const AlertError = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <Alert variant="destructive" className={className} {...props}>
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription ref={ref}>
      This error has not been handled properly. Please try again.
    </AlertDescription>
  </Alert>
));
AlertError.displayName = "AlertError";

export { AlertError };
