import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  return (
    <>
      <div className="space-x container mb-5 mt-5 flex flex-1 flex-col">
        <div className="flex flex-row space-y-0.5">
          <h2 className="text-3xl font-bold tracking-tight">Wallets</h2>
          {/* push to end */}
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="outline">New</Button>
            <Button variant="outline">Import</Button>
          </div>
        </div>
        <Separator className="w-9/10 my-2" />
        <div className="flex flex-1 flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <div className="flex-1"></div>
        </div>
      </div>
    </>
  );
}
