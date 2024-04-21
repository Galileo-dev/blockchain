import * as React from "react"
import { LoaderCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

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
))
AlertPending.displayName = "AlertPending"
