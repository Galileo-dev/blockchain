import * as React from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export const AlertError = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }
>(({ className, children, ...props }, ref) => (
  <Alert variant="destructive" className={className} ref={ref} {...props}>
    <AlertCircle className="size-4" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>
      {children || "Something went wrong. Please try again."}
    </AlertDescription>
  </Alert>
));
AlertError.displayName = "AlertError";
