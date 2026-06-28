"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Testimonial {
  name: string;
  text: string;
}

export default function PatientStories() {
  const testimonials: Testimonial[] = [
    {
      name: "GRACIE A.",
      text: "She came up with a plan for my teeth that I feel really confident and good about. It's also really clean, modern and pretty.",
    },
    {
      name: "MARCUS V.",
      text: "The layout of the studio is gorgeous and looks like a boutique hotel lobby. They walked me through every scan and explained why I needed a filling without any sales pressure.",
    },
    {
      name: "SOPHIA L.",
      text: "Exceptional clinical care and a gorgeous space. I got my porcelain veneers done here. The 3D scanners were so comfortable—no sticky molds! My teeth look incredibly natural.",
    },
    {
      name: "ELAINE K.",
      text: "I have had severe dental anxiety since childhood. Beverly Hills Clinic changed everything. Warmed blankets and Netflix overhead completely distracted me during my clean.",
    },
    {
      name: "DAVID T.",
      text: "From the greeting tea to the hot lavender towel at the end, everything is planned for calm. Their technology is top-notch, and the pricing is completely transparent.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    stopTimer();
    timerRef.current = setInterval(() => {
      handleNext();
    }, 5500);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    if (!isHovered) {
      startTimer();
    } else {
      stopTimer();
    }
    return () => stopTimer();
  }, [isHovered, activeIndex]);

  const handlePrev = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setIsTransitioning(false);
    }, 200);
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
      setIsTransitioning(false);
    }, 200);
  };

  const handleDotClick = (idx: number) => {
    if (idx === activeIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(idx);
      setIsTransitioning(false);
    }, 200);
  };

  return (
    <section
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-[#2d221f] text-[#f6ede7] py-24 border-t border-[#3e322e] overflow-hidden font-sans relative"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Split grid layout (12 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
          
          {/* Left Column: Title, number, name and controls (5/12 width) */}
          <div className="md:col-span-5 space-y-8 flex flex-col justify-center text-left">
            
            {/* Label */}
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#ab7f51]">
              PATIENT STORIES
            </span>

            {/* Slide Index (Serif, large number) */}
            <div className="text-3xl sm:text-4xl font-heading text-[#f6ede7] font-medium leading-none">
              0{activeIndex + 1} <span className="text-lg text-[#f6ede7]/40 font-sans font-light">/ 0{testimonials.length}</span>
            </div>

            {/* Author Name */}
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
              {testimonials[activeIndex].name}
            </h3>

            {/* Navigation Controls Row */}
            <div className="flex items-center space-x-4 pt-4 border-t border-[#3e322e] w-full max-w-xs">
              
              {/* Arrows */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={handlePrev}
                  className="p-1 rounded-full text-[#f6ede7]/70 hover:text-white transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-1 rounded-full text-[#f6ede7]/70 hover:text-white transition-colors"
                  aria-label="Next testimonial"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Vertical Separator */}
              <div className="h-4 w-[1px] bg-[#3e322e]" />

              {/* Dash Progress Indicators */}
              <div className="flex items-center space-x-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDotClick(idx)}
                    className={`h-[2px] w-6 transition-all duration-300 rounded-full ${
                      idx === activeIndex ? "bg-[#ab7f51]" : "bg-[#f6ede7]/15"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

            </div>

          </div>

          {/* Vertical Separator line inside grid (only desktop) */}
          <div className="hidden md:block col-span-1 h-32 w-[1px] bg-[#3e322e] mx-auto" />

          {/* Right Column: Quote contents (6/12 width) */}
          <div className="md:col-span-6 space-y-4 text-left md:pl-4">
            
            {/* Golden Quote Mark */}
            <div className="text-[#ab7f51] text-5xl font-serif leading-none select-none">
              &ldquo;
            </div>

            {/* Quote text block with fade transitions */}
            <div
              className={`transition-all duration-300 transform ${
                isTransitioning
                  ? "opacity-0 translate-y-1"
                  : "opacity-100 translate-y-0"
              }`}
            >
              <p className="text-xl sm:text-2xl font-serif italic text-white/95 leading-relaxed font-light">
                {testimonials[activeIndex].text}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
