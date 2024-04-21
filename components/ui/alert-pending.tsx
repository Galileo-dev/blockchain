import * as React from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

export const AlertPending = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }
>(({ className, children, ...props }, ref) => (
  <Alert variant="default" className={cn(className)} ref={ref} {...props}>
    <LoaderCircle className="size-4 animate-spin" />
    <AlertTitle>Pending</AlertTitle>
    <AlertDescription>
      {children || "Please wait while we process your request."}
    </AlertDescription>
  </Alert>
));
AlertPending.displayName = "AlertPending";
