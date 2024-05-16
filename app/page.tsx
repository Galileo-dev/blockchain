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

const photoUrl = "/event01.png";

export default function Home() {
  return (
    <>
      <div className="container mx-auto flex flex-1 flex-col items-center justify-center space-y-2">
        <div className="w-full rounded-m flex flex-col md:flex-row items-center justify-center overflow-hidden">
          <div className="w-full md:w-1/2 flex flex-col items-center space-y-4 p-4">
            <h1 className="text-center text-3xl md:text-4xl font-bold mb-4">
              Don't Have A Ticket?
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
                <div className="w-full flex gap-2 justify-between items-center">
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
          <div className="w-full md:w-1/2 flex flex-col items-center space-y-4 p-4">
            <h1 className="text-center text-3xl md:text-4xl font-bold mb-4">
              Already Have A Ticket?
            </h1>
            <Button size="lg" className="w-full md:w-auto" asChild>
              <Link href="/show-ticket">
                <QrCode className="mr-4" /> Validate Ticket
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
