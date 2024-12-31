"use client";

import AnimatingText from "@/components/AnimatingText";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    // Ensure this runs only on the client side
    setWindowHeight(window.innerHeight);
  }, []);

  return (
    <div className="flex min-h-screen h-fit">
      <div className="hidden lg:flex lg:w-1/2 justify-end">
        <div className="p-20 w-[calc(100%-1.25rem)] flex flex-col items-start justify-center gap-10">
          <AnimatingText
            lines={["Join Us"]}
            bgColor="black"
            cursorColor="green-500"
            textColor="white"
          />
          <p className="font-spaceGrotesk text-black text-xl">
            &quot;Become a part of the House of Geeks and step into a realm of
            innovation, collaboration, and endless possibilities. Let&apos;s
            shape the future, together!&quot;
          </p>
        </div>
        <div className="h-screen w-5">
          <Image
            src="/assets/images/login_separator2.png"
            alt="separator"
            width={20}
            height={windowHeight}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="w-full lg:w-1/2 bg-[#9A43B1] flex">
        <div className="h-screen w-5 hidden lg:block">
          <Image
            src="/assets/images/login_separator2.png"
            alt="separator"
            width={20}
            height={windowHeight}
            className="h-full w-full object-cover"
          />
        </div>
        {children}
      </div>
    </div>
  );
}
