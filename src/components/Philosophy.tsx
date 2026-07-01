"use client";

import { useState, useEffect, useRef } from "react";
import { Heart, Sparkles, Leaf, Compass } from "lucide-react";

export default function Philosophy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const column1 = [
    {
      icon: Heart,
      title: (
        <>
          Comprehensive<br />care
        </>
      ),
      description: "Personalized treatment plans that combine advanced dentistry and aesthetic medicine for complete facial wellness.",
    },
    {
      icon: Leaf,
      title: (
        <>
          Calm, restful<br />spaces
        </>
      ),
      description: "Designed by us to put you at ease from the moment you arrive.",
    },
  ];

  const column2 = [
    {
      icon: Sparkles,
      title: (
        <>
          The latest<br />technology
        </>
      ),
      description: "Modern tools, used with precision and the time to do it well.",
    },
    {
      icon: Compass,
      title: (
        <>
          Decisions<br />that are yours
        </>
      ),
      description: "We help you understand your health and your options, then leave the choice to you.",
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-brand-primary border-t border-brand-secondary/40 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Heading Copy (5/12 width) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            {/* Tagline label with horizontal line prefix */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-[1px] bg-[#ab7f51]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#ab7f51]">
                OUR COMMITMENT
              </span>
            </div>

            {/* Large Serif Stacked Heading */}
            <h2 className="text-4xl sm:text-5xl font-semibold leading-[1.15] font-heading text-brand-text max-w-sm">
              Enhancing Natural Beauty, Elevating Everyday Confidence.
            </h2>

            {/* Brand Subtext */}
            <p className="text-sm sm:text-base text-brand-text/70 leading-relaxed max-w-md pt-1">
              Every treatment is thoughtfully tailored using advanced dental care, aesthetic medicine, and modern technology to deliver refined, natural-looking results in a calm, luxurious environment.
            </p>
          </div>

          {/* Right Column: Staggered Cards Box (7/12 width) */}
          <div className="lg:col-span-7 flex justify-center lg:justify-start lg:pl-10 xl:pl-14 w-full">
            {/* Rounded outer box container with exact gradient, borders, and drop shadow */}
            <div className="bg-gradient-to-b from-[#efe6df] to-[#e4d3c6] border border-[#e5d4c8]/30 rounded-3xl p-7 sm:p-10 shadow-[0_25px_50px_rgba(45,34,31,0.12)] max-w-[580px] w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7 items-start">

                {/* Column 1 (Left): Starts immediately */}
                <div className="space-y-6 sm:space-y-7">
                  {column1.map((card, idx) => {
                    const IconComp = card.icon;
                    const delayClass = idx === 0 ? "delay-[100ms]" : "delay-[400ms]";
                    return (
                      <div
                        key={`col1-${idx}`}
                        className={`bg-white/95 border border-[#e5d4c8]/20 rounded-2xl p-7 sm:p-8 shadow-[0_8px_20px_rgba(45,34,31,0.04)] hover:shadow-[0_12px_24px_rgba(45,34,31,0.06)] transition-all duration-1000 ease-out transform hover:-translate-y-1 ${
                          isVisible
                            ? "opacity-100 scale-100 translate-y-0 blur-0"
                            : "opacity-0 scale-110 translate-y-8 blur-[2px]"
                        } ${delayClass}`}
                      >
                        {/* Golden Outline Icon Wrapper */}
                        <div className="w-11 h-11 rounded-xl bg-[#fdfbf9] border border-[#f0e6dd] flex items-center justify-center mb-5">
                          <IconComp className="w-5 h-5 text-[#ab7f51]" />
                        </div>

                        {/* Title (stacked) */}
                        <h3 className="text-lg sm:text-xl font-bold font-heading text-brand-text leading-tight mb-3">
                          {card.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-brand-text/75 leading-relaxed">
                          {card.description}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Column 2 (Right): Staggered Offset downward on desktop */}
                <div className="space-y-6 sm:space-y-7 sm:pt-14">
                  {column2.map((card, idx) => {
                    const IconComp = card.icon;
                    const delayClass = idx === 0 ? "delay-[250ms]" : "delay-[550ms]";
                    return (
                      <div
                        key={`col2-${idx}`}
                        className={`bg-white/95 border border-[#e5d4c8]/20 rounded-2xl p-7 sm:p-8 shadow-[0_8px_20px_rgba(45,34,31,0.04)] hover:shadow-[0_12px_24px_rgba(45,34,31,0.06)] transition-all duration-1000 ease-out transform hover:-translate-y-1 ${
                          isVisible
                            ? "opacity-100 scale-100 translate-y-0 blur-0"
                            : "opacity-0 scale-110 translate-y-8 blur-[2px]"
                        } ${delayClass}`}
                      >
                        {/* Golden Outline Icon Wrapper */}
                        <div className="w-11 h-11 rounded-xl bg-[#fdfbf9] border border-[#f0e6dd] flex items-center justify-center mb-5">
                          <IconComp className="w-5 h-5 text-[#ab7f51]" />
                        </div>

                        {/* Title (stacked) */}
                        <h3 className="text-lg sm:text-xl font-bold font-heading text-brand-text leading-tight mb-3">
                          {card.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-brand-text/75 leading-relaxed">
                          {card.description}
                        </p>
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
