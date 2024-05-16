import Show from "@/components/show-ticket/show";

export default function TicketPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center space-y-2">
      <div className="container mx-auto my-20 flex flex-1 flex-col items-center justify-center space-y-2">
        <div className="space-y-4 max-w-2xl w-full">
          <Show />
        </div>
      </div>
    </div>
  );
}
