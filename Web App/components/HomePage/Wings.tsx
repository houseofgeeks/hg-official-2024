import React from "react";
import AnimatingText from "../AnimatingText";

const WingsSection: React.FC<{
  wings: Array<{
    title: string;
    description: string;
    cornerPosition1: string;
    cornerPosition2: string;
  }>;
}> = ({ wings }) => {
  return (
    <section className="min-h-screen bg-white" id="wings">
      {/* Header Section */}
      <div className="px-4 md:px-12 lg:px-24 py-8 md:py-12 text-[#9A43B1]">
        <AnimatingText
          lines={["Let's take a look at our wings"]}
          bgColor="none"
          textColor="[#9A43B1]"
          cursorColor="black"
        />
      </div>

      {/* Wings Container */}
      <div className="px-4 md:px-12 lg:px-20 py-8 flex flex-wrap justify-center gap-12 md:gap-16 lg:gap-20">
        {wings.map((wing, index) => (
          <div
            key={index}
            className="w-full sm:w-[80%] md:w-[45%] lg:w-[35%] transition-all duration-300"
          >
            <Wing
              title={wing.title}
              description={wing.description}
              cornerPosition1={wing.cornerPosition1}
              cornerPosition2={wing.cornerPosition2}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

const Wing: React.FC<{
  title: string;
  description: string;
  cornerPosition1: string;
  cornerPosition2: string;
}> = ({ title, description, cornerPosition1, cornerPosition2 }) => {
  return (
    <div className="w-full relative">
      <div
        className={`relative w-full text-center inline-block p-6 md:p-8 lg:p-10 
          text-2xl md:text-3xl font-semibold text-white bg-black 
          font-spaceGrotesk corner-box ${cornerPosition1} ${cornerPosition2}`}
      >
        {title}
      </div>
      <div
        className="py-4 md:py-5 pr-6 md:pr-10 text-base md:text-lg 
        font-spaceGrotesk text-[#872ca0] font-semibold"
      >
        <span className="mx-3 md:mx-5 text-lg md:text-xl text-black">
          &#62;
        </span>
        {description}
      </div>
    </div>
  );
};

export default WingsSection;
