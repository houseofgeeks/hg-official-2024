import React from 'react';
import AnimatingText from '../AnimatingText';

interface Testimonial {
    name: string;
    text: string;
    image: string;
  }
  
  interface Alumni {
    name: string;
    jobTitle: string;
    image: string;
    linkedin: string;
  }

interface TestimonialsProps {
  testimonials: Testimonial[];
  alumnis: Alumni[];
}

const TestimonialsSection: React.FC<TestimonialsProps> = ({ testimonials, alumnis }) => {
  const renderCard = (item: Testimonial | Alumni, isTestimonial: boolean) => {
    return (
      <div className="w-full md:w-[calc(50%-2.5rem)] lg:w-[calc(33.333%-3.33rem)] mb-16 md:mb-10 h-fit bg-[#9A43B1] rounded-lg shadow-lg transition-transform hover:scale-105 cursor-pointer relative pb-6">
        <div className="flex items-center gap-5 justify-center w-full absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img
            src="/assets/icons/double_quotes.png"
            className="h-12 md:h-16 w-12 md:w-16 transform rotate-180"
            alt="double quotes"
          />
          <img 
            src={item.image} 
            className="h-24 w-24 md:h-32 md:w-32 rounded-full object-cover" 
            alt={`${item.name}'s profile`} 
          />
          <img
            src="/assets/icons/double_quotes.png"
            className="h-12 md:h-16 w-12 md:w-16"
            alt="double quotes"
          />
        </div>
        
        <div className="pt-20 md:pt-24 px-4 md:px-10 flex flex-col gap-3 md:gap-5 justify-center items-center font-spaceGrotesk text-center">
          <div className="text-lg md:text-xl text-white font-semibold">{item.name}</div>
          
          {isTestimonial ? (
            <div className="text-[#ffe8ff] text-sm md:text-base px-2">
              {(item as Testimonial).text}
            </div>
          ) : (
            <>
              <div className="text-[#ffe8ff] text-sm md:text-base">
                {(item as Alumni).jobTitle}
              </div>
              <a
                href={(item as Alumni).linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black rounded-full py-2 px-4 mt-3 text-xs md:text-base uppercase font-spaceGrotesk hover:bg-gray-100 transition-colors"
              >
                Follow on LinkedIn
              </a>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="bg-black min-h-screen py-10 px-4 md:px-10 lg:px-20" id="testimonials">
      <div className="mb-24 md:mb-24 text-center md:text-left">
        <AnimatingText
          lines={["Testimonials"]}
          textColor="black"
          bgColor="white"
          cursorColor="[#9A43B1]"
        />
      </div>

      <div className="flex flex-col md:flex-row flex-wrap gap-8 justify-center items-stretch mb-16">
        {testimonials.map((item) => renderCard(item, true))}
      </div>

      <div className="text-3xl md:text-5xl text-black font-semibold mx-auto w-fit flex items-center bg-white px-4 md:px-5 py-2 mb-24">
        <span className="mr-3 md:mr-5 text-green-700">#</span>
        Alumni
      </div>

      <div className="flex flex-col md:flex-row flex-wrap gap-8 justify-center items-stretch">
        {alumnis.map((item) => renderCard(item, false))}
      </div>
    </section>
  );
};

export default TestimonialsSection;