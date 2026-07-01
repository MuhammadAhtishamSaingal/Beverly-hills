"use client";

import { useState, useEffect, useRef } from "react";

export default function Studios() {
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
  const leftImages = [
    { desktop: "/images/space1.webp", mobile: "/images/space1.webp" },
    { desktop: "/images/space2.webp", mobile: "/images/space2.webp" },
    { desktop: "/images/space3.webp", mobile: "/images/space3.webp" },
    { desktop: "/images/space4.webp", mobile: "/images/space4.webp" },
  ];

  const rightImages = [
    { desktop: "/images/space4.webp", mobile: "/images/space4.webp" },
    { desktop: "/images/space3.webp", mobile: "/images/space3.webp" },
    { desktop: "/images/space2.webp", mobile: "/images/space2.webp" },
    { desktop: "/images/space1.webp", mobile: "/images/space1.webp" },
  ];

  // Duplicate items to ensure seamless infinite looping scroll
  const leftMarqueeItems = [...leftImages, ...leftImages, ...leftImages];
  const rightMarqueeItems = [...rightImages, ...rightImages, ...rightImages];

  return (
    <section ref={sectionRef} className="py-24 bg-brand-primary border-t border-brand-secondary/40 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className={`text-left max-w-3xl space-y-4 mb-16 transform transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0 filter-none" : "opacity-0 -translate-y-8 blur-[1px]"
        }`}>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-[1px] bg-brand-accent" />
            <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">
              THE CLINICS
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-semibold font-heading text-brand-text leading-tight">
            Spaces designed to put you at ease
          </h2>
          
          <p className="text-sm sm:text-base text-brand-text/75 max-w-2xl leading-relaxed">
            Warm light, natural materials, and quiet detail &mdash; every clinic is shaped to calm the nervous system the moment you step inside.
          </p>
        </div>

        {/* Dual Vertical Marquee Gallery */}
        <div className={`relative h-[650px] overflow-hidden rounded-3xl border border-brand-secondary/35 bg-white/40 p-6 sm:p-10 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch transform transition-all duration-1000 delay-[250ms] ease-out ${
          isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-[0.99]"
        }`}>
          
          {/* Top & Bottom Blur Overlays for Faded Screen Look */}
          <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-brand-primary to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-brand-primary to-transparent z-10 pointer-events-none" />

          {/* Left Column Marquee: Scrolls UP, Pauses on Hover */}
          <div className="flex flex-col h-full overflow-hidden relative">
            <div className="animate-marquee-up hover:[animation-play-state:paused] flex flex-col space-y-6">
              {leftMarqueeItems.map((item, idx) => {
                // Alternating aspect ratios for a organic staggered look
                const isTall = idx % 2 === 1;
                return (
                  <div
                    key={`left-${idx}`}
                    className={`relative w-full rounded-2xl overflow-hidden border border-brand-secondary/30 shadow-xs hover:border-brand-accent/40 transition-colors ${
                      isTall ? "h-80 sm:h-[440px]" : "h-48 sm:h-64"
                    }`}
                  >
                    <picture className="absolute inset-0">
                      <source media="(max-width: 767px)" srcSet={item.mobile} />
                      <img
                        src={item.desktop}
                        alt="Beverly Hills Clinic Calming Space Left"
                        className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
                        loading="lazy"
                      />
                    </picture>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column Marquee: Scrolls DOWN, Pauses on Hover */}
          <div className="hidden md:flex flex-col h-full overflow-hidden relative">
            <div className="animate-marquee-down hover:[animation-play-state:paused] flex flex-col space-y-6">
              {rightMarqueeItems.map((item, idx) => {
                const isTall = idx % 2 === 1;
                return (
                  <div
                    key={`right-${idx}`}
                    className={`relative w-full rounded-2xl overflow-hidden border border-brand-secondary/30 shadow-xs hover:border-brand-accent/40 transition-colors ${
                      isTall ? "h-80 sm:h-[440px]" : "h-48 sm:h-64"
                    }`}
                  >
                    <picture className="absolute inset-0">
                      <source media="(max-width: 767px)" srcSet={item.mobile} />
                      <img
                        src={item.desktop}
                        alt="Beverly Hills Clinic Calming Space Right"
                        className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
                        loading="lazy"
                      />
                    </picture>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
