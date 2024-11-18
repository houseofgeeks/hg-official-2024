import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const ImageCarousel = () => {
  const slides = [
    {
      id: 1,
      image: "/assets/images/event1.jpeg",
      title: "Quasar",
      description:
        "The Quasar Hackathon, IIIT Ranchi's premier tech battleground, ignites coding passion across campus. Organized by House of Geeks, it transforms diverse student teams into innovators during an exhilarating 36-hour sprint. With mentorship, prizes, and real-world challenges, Quasar isn't just a competition—it's where breakthrough ideas take flight.",
    },
    {
      id: 2,
      image: "/assets/images/event2.jpeg",
      title: "Smart India Hackathon",
      description:
        "The Smart India Hackathon Internal Rounds at IIIT Ranchi brought together the brightest minds to tackle real-world challenges. This intense 24-hour competition served as the gateway to SIH 2024, where teams showcased innovative solutions across diverse problem statements. With mentorship and constructive feedback, participants polished their ideas for the national stage.",
    },
    {
      id: 3,
      image: "/assets/images/event3.jpeg",
      title: "Internlay",
      description:
        "Internlay 2024 transformed IIIT Ranchi's tech landscape through its experimental internship program. Over six weeks, students collaborated in weekend sessions, guided by industry mentors, turning innovative ideas into reality. With progress check-ins and exciting rewards, it created a vibrant community of young tech enthusiasts and problem-solvers.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSlideChange = (direction: string) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    if (direction === "next") {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    } else {
      setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    }

    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const getVisibleSlides = () => {
    const visibleSlides = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + slides.length) % slides.length;
      visibleSlides.push({ ...slides[index], position: i });
    }
    return visibleSlides;
  };

  return (
    <div className="w-full max-w-[80rem] mx-auto px-4 font-spaceGrotesk">
      {/* Carousel Container */}
      <div className="relative h-96 mb-8">
        {/* Navigation Buttons */}
        <button
          onClick={() => handleSlideChange("prev")}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors disabled:opacity-50"
          disabled={isTransitioning}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => handleSlideChange("next")}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors disabled:opacity-50"
          disabled={isTransitioning}
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slides */}
        <div className="relative h-full overflow-hidden">
          <div className="absolute w-full h-full flex justify-center items-center">
            {getVisibleSlides().map((slide) => {
              const zIndex =
                slide.position === 0 ? 2 : slide.position === -1 ? 1 : 0;

              return (
                <div
                  key={slide.id}
                  className="absolute transition-all duration-500 ease-in-out"
                  style={{
                    transform: `translateX(${slide.position * 100}%) scale(${
                      slide.position === 0 ? 1 : 0.8
                    })`,
                    zIndex,
                    opacity: isTransitioning && slide.position !== 0 ? 0 : 1,
                  }}
                >
                  <div className="relative group">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      className={`w-[30rem] h-80 object-cover shadow-lg ${
                        slide.position !== 0
                          ? "filter grayscale opacity-50"
                          : ""
                      }`}
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 rounded-lg"></div>

                    {/* Title container with improved visibility */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 rounded-b-lg">
                      <h3 className="text-white text-xl font-bold">
                        {slide.title}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="p-6 mb-10">
        <h2 className="text-5xl text-white font-semibold mb-2 flex items-center bg-black w-fit px-5 py-2">
          <span className="mr-5 text-green-700">#</span>{slides[currentIndex].title}
        </h2>
        <p className="text-black text-lg mt-5">{slides[currentIndex].description}</p>
      </div>
    </div>
  );
};

export default ImageCarousel;
