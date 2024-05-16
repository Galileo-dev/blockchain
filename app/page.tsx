import { Button } from "@/components/ui/button";
import {
  Ticket,
  TicketFooter,
  TicketHeader,
  TicketSeparator,
  TicketTitle,
} from "@/components/ui/ticket";
import Image from "next/image";
import Link from "next/link";

const photoUrl = "/event01.png";

export default function Home() {
  return (
    <>
      <div className="container mx-auto flex flex-1 flex-col items-center justify-center space-y-2">
        <div className="w-ful rounded-m flex h-[40rem] flex-col items-center justify-center overflow-hidden">
          <h1 className="text-center text-4xl font-bold mb-4">
            Available Tickets:
          </h1>

          <Ticket className="w-[300px]">
            <TicketHeader>
              <div
                style={{
                  position: "relative",
                  width: "250px",
                  height: "250px",
                }}
                className="rounded-sm overflow-hidden"
              >
                <Image src={photoUrl} alt="Picture of the author" fill />
              </div>
            </TicketHeader>
            <TicketSeparator />
            <TicketFooter>
              <TicketTitle>Electric Picnic</TicketTitle>
              {/* space between and center */}
              <div className="w-full flex gap-2 justify-between items-center">
                <Button variant="outline" className="flex-1">
                  <Link href="/show-ticket">Show</Link>
                </Button>
                <Button className="flex-1" asChild>
                  <Link href="/get-ticket">Buy Now</Link>
                </Button>
              </div>
            </TicketFooter>
          </Ticket>
        </div>
      </div>
    </>
  );
}
