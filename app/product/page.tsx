"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowUpFromLine, Clock2, Code, VenetianMask } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProductPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center space-y-2">
      <div className="container flex flex-1 flex-col items-center justify-center mx-auto space-y-2 my-20">
        {/* Sideways text with motion */}
        <motion.div
          className="fixed top-1/4 -left-20 transform -translate-y-1/2 z-10 hidden lg:flex"
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/product"
            className="flex flex-row items-center justify-center transform -rotate-90 cursor-pointer hover:underline"
          >
            <div className="font-bold whitespace-nowrap mr-2">
              Go back to product page
            </div>
            <ArrowUpFromLine className="rotate-90" size={20} />
          </Link>
        </motion.div>

        {/* Main content */}
        <div className="mx-auto flex flex-col lg:flex-row mt-20 lg:mt-0 lg:space-x-10">
          {/* Text Content */}
          <div className="lg:w-1/2 space-y-10 md:space-y-20 px-4 lg:px-0">
            {/* Title */}
            <motion.h1
              initial={{ x: -25, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              className="text-4xl font-bold"
            >
              <span className="dark:text-purple-200 text-purple-500">
                Orb O1
              </span>{" "}
              is the future of gesture computing
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1,
                type: "spring",
                stiffness: 100,
                delay: 0.5,
              }}
              className="text-lg dark:text-gray-300 text-gray-700"
            >
              Orb is offering a new way to interact with your computer. We use
              cutting-edge machine learning technology to understand your
              gestures and turn them into actions on your computer.
            </motion.p>
          </div>

          {/* Image */}
          <motion.div
            className="lg:flex-grow"
            initial={{ x: 25, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          >
            <Image
              src="/product_image_angle.png"
              alt="Orb O1"
              width={800}
              height={800}
              className="object-cover min-w-[300px] md:min-w-[500px]"
            />
          </motion.div>
        </div>

        {/* Call to Action */}
        <div className="!mt-24 px-4 lg:px-0">
          <button className="p-[3px] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
              Buy Now!
            </div>
          </button>
        </div>
      </div>

      {/*  Bottom Gradient */}
      <motion.div
        className="my-auto bg-gradient-to-r from-indigo-500 to-purple-500 rounded-md min-h-80 w-11/12"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container space-y-10 py-20">
          <div>
            <h1 className="font-bold text-4xl text-neutral-200 text-center">
              Features
            </h1>
            <p className="text-lg text-neutral-300 text-center">
              The Orb O1 is full of feature but here are some of the highlights.
            </p>
          </div>

          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* More Developer Speil */}
            <Card className="w-full max-w-md p-4">
              <CardHeader>
                <CardTitle>
                  <Clock2 size={60} className="mr-2 mb-4" />
                  <span>Effortless</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                Orb o1 use a bult-in camera to feed data to our on device
                machine learning model to understand your gestures. This machine
                learning model has been rigorously trained and worked on by the
                best in the industry. We also make the source code to train the
                model available to developers so they can train their own models
                or contribute to ours. Orb o1 use bluetooth or USB to connect to
                your computer.
              </CardContent>
            </Card>

            {/* Developer Speil */}
            <Card className="w-full max-w-md p-4">
              <CardHeader>
                <CardTitle>
                  <Code size={60} className="mr-2 mb-4" />
                  <span>Developers First</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                We offer developers a fully open-source stack with which to
                develop. We provide SDKs, APIs, Developer Boards, and Even the
                schematics. We rely on developer contributions and focus on
                developing cutting-edge methods of HCI. With developers, we are
                here.
              </CardContent>
            </Card>

            {/* Privacy Speil */}
            <Card className="w-full max-w-md p-4">
              <CardHeader>
                <CardTitle>
                  <VenetianMask size={60} className="mr-2 mb-4" />
                  <span>Privacy</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                Orb O1 uses on device machine learning to understand your
                gestures. This means that your data never leaves your device. We
                are commited to privacy and have regular security audits by
                third party security firms. We are commited to keeping your data
                safe.
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
      <div className="container text-center text-lg p-4 italic font-light !my-44">
        &ldquo;Close your eyes and imagine the future of computer interaction.
        How will you make your computer do what you want it to do? How will you
        interface with the device that you use every day? Will it use sound,
        speech, or touch? At Orb, we are committed to building the future of
        HCI. We want the future to be effortless and intuitive. Today, we offer
        the Orb O1 as a first step towards that future.&rdquo; - Mr. Orb
      </div>
    </div>
  );
}
