import React from "react";
import AnimatingText from "../AnimatingText";
import TerminalComponent from "./Terminal";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="h-fit bg-[#9A43B1] flex flex-col lg:flex-row items-center justify-center p-4 py-[9rem] gap-8">
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center">
        <AnimatingText
          lines={["House of", "Geeks"]}
          delay={100}
          bgColor="white"
          textColor="black"
          cursorColor="purple-600"
        />
        <p className="text-sm md:text-md lg:text-lg mt-7 px-10 text-white font-spaceGrotesk w-[30rem]">
          House of Geeks is IIIT Ranchi&apos;s coding club, hosting hackathons
          and workshops to build skills and foster innovation among tech
          enthusiasts.
        </p>
      </div>
      <div className="w-full lg:w-1/2 flex justify-center z-10">
        <TerminalComponent />
      </div>
      <div className="absolute w-[60%] h-[50vh] top-0 right-0 max-md:hidden">
        <Image
          src="/assets/images/binary_bg.png"
          className="opacity-50"
          alt="binary_bg.png"
          fill
          objectFit="cover"
        />
      </div>
    </section>
  );
};

export default Hero;
