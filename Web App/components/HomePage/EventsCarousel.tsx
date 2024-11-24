import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AnimatingText from "../AnimatingText";
import { events } from "@/utils/constants";

interface Slide {
  id: number;
  image: string;
  title: string;
  description: string;
}

interface VisibleSlide extends Slide {
  position: number;
}

const EventsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const handleSlideChange = (direction: "prev" | "next"): void => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    if (direction === "next") {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    } else {
      setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
    }

    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const getVisibleSlides = (): VisibleSlide[] => {
    const visibleSlides: VisibleSlide[] = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + events.length) % events.length;
      visibleSlides.push({ ...events[index], position: i });
    }
    return visibleSlides;
  };

  return (
    <section className="min-h-screen bg-white py-8 px-4 md:py-16" id="events">
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="mb-8 md:mb-16 px-4 md:px-8">
          <AnimatingText
            lines={["Logs from our event lifecycle"]}
            bgColor="none"
            textColor="[#9A43B1]"
            cursorColor="black"
          />
        </div>

        {/* Carousel Container */}
        <div className="max-w-[80rem] mx-auto">
          <div className="relative h-64 sm:h-80 md:h-96 mb-4 md:mb-8">
            {/* Navigation Buttons */}
            <button
              onClick={() => handleSlideChange("prev")}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-1 md:p-2 rounded-full shadow-lg hover:bg-white transition-colors disabled:opacity-50"
              disabled={isTransitioning}
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
            </button>
            <button
              onClick={() => handleSlideChange("next")}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-1 md:p-2 rounded-full shadow-lg hover:bg-white transition-colors disabled:opacity-50"
              disabled={isTransitioning}
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
            </button>

            {/* Slides */}
            <div className="relative h-full overflow-hidden">
              <div className="absolute w-full h-full flex justify-center items-center">
                {getVisibleSlides().map((slide) => {
                  const zIndex: number =
                    slide.position === 0 ? 2 : slide.position === -1 ? 1 : 0;

                  return (
                    <div
                      key={slide.id}
                      className="absolute transition-all duration-500 ease-in-out"
                      style={{
                        transform: `translateX(${
                          slide.position * 100
                        }%) scale(${slide.position === 0 ? 1 : 0.8})`,
                        zIndex,
                        opacity:
                          isTransitioning && slide.position !== 0 ? 0 : 1,
                      }}
                    >
                      <div className="relative group">
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className={`w-64 sm:w-80 md:w-[30rem] h-56 sm:h-72 md:h-80 object-cover shadow-lg rounded-lg ${
                            slide.position !== 0
                              ? "filter grayscale opacity-50"
                              : ""
                          }`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 rounded-lg"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4 rounded-b-lg">
                          <h3 className="text-white text-lg md:text-xl font-bold">
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

          {/* Description Section */}
          <div className="px-4 md:px-6 mb-6 md:mb-10 font-spaceGrotesk">
            <h2 className="text-3xl md:text-5xl text-white font-semibold mb-2 flex items-center bg-black w-fit px-3 md:px-5 py-1 md:py-2">
              <span className="mr-2 md:mr-5 text-green-700">#</span>
              {events[currentIndex].title}
            </h2>
            <p className="text-black text-base md:text-lg mt-3 md:mt-5">
              {events[currentIndex].description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsCarousel;
