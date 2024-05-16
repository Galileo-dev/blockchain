import { Rotate3D } from "lucide-react";
import { ReactElement, useMemo } from "react";
import { QR } from "react-qr-rounded";

export interface OrbQRCode {
  address: string;
}

export const OrbQRCode = ({ address }: OrbQRCode): ReactElement => {
  const qrCode = useMemo(() => {
    return (
      <QR rounding={80} cutout cutoutElement={<Rotate3D size="100%" />}>
        {address}
      </QR>
    );
  }, [address]);

  return qrCode;
};
