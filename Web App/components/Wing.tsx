// Wing.js
import React from "react";

export default function Wing({ title, description, cornerPosition1, cornerPosition2 }: {title: string, description: string, cornerPosition1: string, cornerPosition2: string}) {
  return (
    <div className="w-[35%] relative">
      <div className={`relative min-w-full text-center inline-block p-10 text-3xl font-semibold text-white bg-black font-spaceGrotesk corner-box ${cornerPosition1} ${cornerPosition2}`}>
        {title}
      </div>
      <div className="py-5 pr-10 text-lg font-spaceGrotesk text-[#872ca0] font-semibold">
        <span className="mx-5 text-xl text-black">&#62;</span>
        {description}
      </div>
    </div>
  );
}
