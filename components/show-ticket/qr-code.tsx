import CustomQRCode from "connectkit/build/components/Common/CustomQRCode";
import { Rotate3D } from "lucide-react";
import { ReactElement, useMemo } from "react";

export interface QRCodeProps {
  address: string;
}

const QRCode = ({ address }: QRCodeProps): ReactElement => {
  const qrCode = useMemo(() => {
    return <CustomQRCode value={address} image={<Rotate3D />} />;
  }, [address]);

  return qrCode;
};
