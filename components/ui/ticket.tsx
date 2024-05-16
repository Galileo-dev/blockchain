import * as React from "react";

import { cn } from "@/lib/utils";

const Ticket = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className,
    )}
    {...props}
  />
));
Ticket.displayName = "Ticket";

const TicketHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
TicketHeader.displayName = "TicketHeader";

const TicketTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight pb-3",
      className,
    )}
    {...props}
  />
));
TicketTitle.displayName = "TicketTitle";

const TicketDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
TicketDescription.displayName = "TicketDescription";

const TicketContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
TicketContent.displayName = "TicketContent";

export const TicketSeparator = (
  { className }: React.HTMLAttributes<HTMLDivElement>,
  ref: React.Ref<HTMLDivElement>,
) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative my-5 pt-5 flex justify-center items-center overflow-visible",
        className,
      )}
    >
      <div className="flex justify-between items-center w-full">
        <div
          className="rounded-full w-7 h-7 bg-card border text-card-foreground shadow-sm"
          style={{
            clipPath: "polygon(45.5% 0%, 100% 0%, 100% 100%, 45.5% 100%)",
            marginLeft: "-0.875rem",
            boxShadow: "inset 0 1px 2px 0 rgba(0, 0, 0, 0.05)",
          }}
        />
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className="w-4 h-4 bg-card rounded-full border" />
        ))}
        <div
          className="rounded-full w-7 h-7 bg-card border text-card-foreground"
          style={{
            clipPath: "polygon(0% 0%, 54.5% 0%, 54.5% 100%, 0% 100%)",
            marginRight: "-0.875rem",
            boxShadow: "inset 0 1px 2px 0 rgba(0, 0, 0, 0.05)",
          }}
        />
      </div>
    </div>
  );
};

const TicketFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col p-6 pt-0", className)}
    {...props}
  />
));
TicketFooter.displayName = "TicketFooter";

export {
  Ticket,
  TicketContent,
  TicketDescription,
  TicketFooter,
  TicketHeader,
  TicketTitle,
};
