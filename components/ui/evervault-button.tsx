"use client";
import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./button";

export const EvervaultButton = ({
  text,
  href,
  className,
}: {
  text?: string;
  href?: string;
  className?: string;
}) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  const [randomString, setRandomString] = useState("");

  useEffect(() => {
    let str = generateRandomString(1500);
    setRandomString(str);
  }, []);

  function onMouseMove({ currentTarget, clientX, clientY }: any) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);

    const str = generateRandomString(1500);
    setRandomString(str);
  }

  return (
    <div
      className={cn(
        "p-0.5  bg-transparent  flex items-center justify-center w-full h-full relative",
        className
      )}
    >
      <div
        onMouseMove={onMouseMove}
        className="group/card w-full relative overflow-hidden bg-transparent flex items-center justify-center h-full"
      >
        <Button variant="outline" asChild>
          <Link href={href || "#"}>
            <CardPattern
              mouseX={mouseX}
              mouseY={mouseY}
              randomString={randomString}
            />
            <div className="relative z-10 flex items-center justify-center p-0.5">
              <div className="relative flex items-center justify-center text-white">
                <div className="absolute w-full h-full bg-white/[0.8] dark:bg-black/[0.8] blur-sm rounded-sm" />
                <div className="dark:text-white text-black z-20">{text}</div>
              </div>
            </div>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export function CardPattern({ mouseX, mouseY, randomString }: any) {
  let maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`;
  let style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 rounded-md  [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50"></div>
      <motion.div
        className="absolute inset-0 rounded-md bg-gradient-to-r from-green-500 to-blue-700 opacity-0  group-hover/card:opacity-100 backdrop-blur-xl transition duration-500"
        style={style}
      />
      <motion.div
        className="absolute inset-0 rounded-md opacity-0 mix-blend-overlay  group-hover/card:opacity-100"
        style={style}
      >
        <p className="absolute inset-x-0 text-xs h-full break-words whitespace-pre-wrap text-white font-mono font-bold transition duration-500">
          {randomString}
        </p>
      </motion.div>
    </div>
  );
}

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
export const generateRandomString = (length: number) => {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};
