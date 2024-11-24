'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AnimatingTextProps {
  lines: string[];
  delay?: number;
  bgColor: string;
  textColor: string;
  cursorColor: string;
}

const AnimatingText: React.FC<AnimatingTextProps> = ({
  lines,
  delay = 100,
  bgColor,
  textColor,
  cursorColor,
}) => {
  const { ref, inView } = useInView({ triggerOnce: true });
  const [displayedText, setDisplayedText] = useState<string[]>(
    Array(lines.length).fill("")
  );
  const [index, setIndex] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    if (
      inView &&
      lineIndex < lines.length &&
      index <= lines[lineIndex].length
    ) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => {
          const updatedLines = [...prev];
          updatedLines[lineIndex] = lines[lineIndex].slice(0, index + 1);
          return updatedLines;
        });
        setIndex((prevIndex) => prevIndex + 1);

        if (index >= lines[lineIndex].length) {
          setLineIndex((prevLineIndex) => prevLineIndex + 1);
          setIndex(0);
        }
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [inView, index, lineIndex, lines, delay]);

  return (
    <motion.div 
      ref={ref} 
      className="flex flex-col justify-center"
    >
      {displayedText.map((text, i) => (
        <div
          key={i}
          className={`text-4xl md:text-5xl lg:text-6xl px-4 w-fit mt-3 tracking-wide font-spaceGrotesk text-${textColor} bg-${bgColor}`}
        >
          {i === 0 && <span className={`text-${cursorColor} mr-2`}>&#62;</span>}
          {text}
          {i === lineIndex && <span className="text-black">_</span>}
        </div>
      ))}
    </motion.div>
  );
};

export default AnimatingText;