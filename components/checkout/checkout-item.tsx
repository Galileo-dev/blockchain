import { ImagePlaceholder } from "@/components/image-placeholder";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CheckoutItemProps {
  title: string;
  info: string[];
  price: number;
}

export default function CheckoutItem({
  title,
  info,
  price,
}: CheckoutItemProps) {
  return (
    <Card className="w-full rounded-3xl">
      <CardHeader className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-row items-center space-x-2">
          <div className="h-14 w-14">
            <ImagePlaceholder />
          </div>
          <div className="flex flex-col space-y-2">
            <CardTitle className="text-md">{title}</CardTitle>
            <CardDescription>
              {info.map((i) => (
                <span key={i}>
                  {i}
                  <br />
                </span>
              ))}
            </CardDescription>
          </div>
        </div>
        <div className="text-1xl font-semibold leading-none tracking-tight">
          &euro;{price}
        </div>
      </CardHeader>
    </Card>
  );
}
