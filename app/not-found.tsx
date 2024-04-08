import Image from "next/image";

export default function NotFound() {
  return (
    <div className="container flex flex-1 flex-col items-center justify-center mx-auto">
      <div className="flex justify-center">
        <Image
          unoptimized
          alt="moving gif of confused john travolta"
          src="/pulp-fiction-john-travolta.gif"
          width={400}
          height={400}
        />
      </div>
      <h2 className="scroll-m-20 pt-4 text-3xl font-semibold tracking-tight first:mt-0">
        404 - Page Not Found!
      </h2>
    </div>
  );
}
