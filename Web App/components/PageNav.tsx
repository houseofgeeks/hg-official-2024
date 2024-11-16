"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const PageNav = ({ navItems }: { navItems: string[] }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return !isExpanded ? (
    <div className="flex fixed items-center justify-center my-10 w-full z-20">
      <div className="flex items-center justify-start pl-5 w-[200px] bg-[#9A43B1] h-[50px] text-md font-spaceGrotesk text-white border-[3px] border-[#fa88fe] rounded-full">
        <span>INIT</span>
        <span className="relative ml-1 inline-flex">
          <span>.</span>
          <span className="animate-[dot1_1.7s_infinite] opacity-0">.</span>
          <span className="animate-[dot2_1.7s_infinite] opacity-0">.</span>
        </span>
      </div>
    </div>
  ) : (
    <motion.nav
      className="fixed flex h-[50px] bg-[#9A43B1] justify-center top-24 w-[200px] items-center left-1/2 transform -translate-x-1/2 border-[#fa88fe] border-[3px] rounded-3xl shadow-lg z-50"
      animate={{
        height: "5rem",
        top: "2.5rem",
        width: "80%",
      }}
      transition={{
        ease: "backOut",
      }}
    >
      <div className="flex items-center justify-between py-4 px-6">
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={`#${item.toLowerCase()}`}
              className="text-white hover:text-green-300 transition-colors font-spaceGrotesk w-32 text-center"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default PageNav;
