import { Button } from "@/components/ui/button";
import {
  Ticket,
  TicketFooter,
  TicketHeader,
  TicketSeparator,
  TicketTitle,
} from "@/components/ui/ticket";
import { QrCode } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const photoUrl = "/images/events/ep.png";

export default function Home() {
  return (
    <>
      <div className="container mx-auto flex flex-1 flex-col items-center justify-center space-y-2">
        <div className="rounded-m flex w-full flex-col items-center justify-center overflow-hidden md:flex-row">
          <div className="flex w-full flex-col items-center space-y-4 p-4 md:w-1/2">
            <h1 className="mb-4 text-center text-3xl font-bold md:text-4xl">
              Don&apos;t Have A Ticket?
            </h1>
            <Ticket className="w-[300px]">
              <TicketHeader>
                <div
                  style={{
                    position: "relative",
                    width: "250px",
                    height: "250px",
                  }}
                  className="overflow-hidden rounded-sm"
                >
                  <Image src={photoUrl} alt="Picture of the author" fill />
                </div>
              </TicketHeader>
              <TicketSeparator />
              <TicketFooter>
                <TicketTitle>Electric Picnic</TicketTitle>
                <div className="flex w-full items-center justify-between gap-2">
                  <Button variant="outline" className="flex-1">
                    Details
                  </Button>
                  <Button className="flex-1" asChild>
                    <Link href="/get-ticket">Buy Now</Link>
                  </Button>
                </div>
              </TicketFooter>
            </Ticket>
          </div>
          <div className="flex w-full flex-col items-center space-y-4 p-4 md:w-1/2">
            <h1 className="mb-4 text-center text-3xl font-bold md:text-4xl">
              Already Have A Ticket?
            </h1>
            <Button size="lg" className="w-full md:w-auto" asChild>
              <Link href="/transfer-ticket">
                <QrCode className="mr-4" /> Validate Ticket
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
