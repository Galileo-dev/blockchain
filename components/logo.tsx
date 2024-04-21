import React from "react"
import Link from "next/link"
import { Rotate3D } from "lucide-react"

type LogoProps = React.HTMLAttributes<HTMLElement> & {
  size?: number
}

export default function Logo({ size, className, ...props }: LogoProps) {
  return (
    <div className={className} {...props}>
      <Link href="/" className="flex items-center">
        <Rotate3D size={size} />
        <h3 className="ml-0.5 font-bold">Orb</h3>
      </Link>
    </div>
  )
}
