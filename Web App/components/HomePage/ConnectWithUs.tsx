import React from "react";
import AnimatingText from "../AnimatingText";

const ConnectWithUs = () => {
  return (
    <section
      className="w-full h-fit bg-black flex flex-col lg:flex-row lg:gap-20 pb-40 lg:pb-52 px-4 lg:px-0"
      id="connect"
    >
      <div className="mx-4 lg:mx-24 lg:mt-0 p-4 lg:p-10 relative lg:top-40 h-fit mt-20">
        <AnimatingText
          lines={["Connect with", "us for updates"]}
          textColor="black"
          bgColor="white"
          cursorColor="[#9A43B1]"
        />
        <div className="text-base lg:text-xl font-spaceGrotesk font-semibold text-white max-w-[600px] mt-6 lg:mt-10">
          Join IIIT Ranchi's House of Geeks! Sign up to connect with tech
          enthusiasts, work on exciting projects, and access exclusive events
          and workshops. Let's innovate together!
        </div>
      </div>

      <div className="flex justify-center w-full lg:w-[30%] relative lg:top-48 h-fit mt-10 lg:mt-0">
        <div className="relative w-full max-w-[400px] text-center p-6 lg:p-10 text-base lg:text-lg font-semibold text-white bg-[#9A43B1] font-spaceGrotesk rounded-lg lg:corner-all">
          <div>
            Connect with IIIT Ranchi's House of Geeks! Let's innovate and build
            the future of technology together—follow us on LinkedIn!
          </div>
          <button className="w-full lg:w-auto bg-white text-black rounded-full py-2 lg:py-3 px-4 lg:px-5 mt-4 lg:mt-5 text-sm lg:text-base uppercase font-spaceGrotesk hover:bg-gray-100 transition-colors duration-300">
            Connect on LinkedIn
          </button>
        </div>
      </div>
    </section>
  );
};

export default ConnectWithUs;