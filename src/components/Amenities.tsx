"use client";

import { useState, useEffect, useRef } from "react";
import { Headphones, Tv, Coffee, Wind, Cloud, Heart, RefreshCw, Sun } from "lucide-react";

export default function Amenities() {
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

  const amenitiesList = [
    {
      icon: Headphones,
      title: "Noise-Canceling Headphones",
      description: "Block out drilling and ambient sounds with Sony over-ear headphones playing custom acoustic tracks.",
    },
    {
      icon: Tv,
      title: "Ceiling-Mounted TVs",
      description: "Lay back and catch up on your favorite Netflix, HBO, or YouTube shows during cleaning procedures.",
    },
    {
      icon: Coffee,
      title: "Organic Beverage Bar",
      description: "Refresh beforehand with organic herbal teas, cold-brew coffee, or chilled sparkling water in the lobby.",
    },
    {
      icon: Cloud,
      title: "Weighted Blankets",
      description: "Deep pressure stimulation blankets are available to help ground you and lower heart rates during appointments.",
    },
    {
      icon: Wind,
      title: "Aromatherapy Diffusers",
      description: "Soothing diffusers dispersed with calming organic lavender, eucalyptus, and chamomile essential oils.",
    },
    {
      icon: Heart,
      title: "Stress Therapy Tools",
      description: "Soft tactile stress-relief tools and organic squeeze balms to keep hands comfortable and busy.",
    },
    {
      icon: RefreshCw,
      title: "Steamed Lavender Towels",
      description: "Conclude your appointment with warm, steamed facial cloths infused with organic lavender distillate.",
    },
    {
      icon: Sun,
      title: "Memory Foam Cushions",
      description: "Specialized memory foam headrests and ergonomic knee pillows designed to take pressure off your spine.",
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-brand-primary border-t border-brand-secondary/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center max-w-2xl mx-auto space-y-4 mb-16 transform transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0 filter-none" : "opacity-0 -translate-y-8 blur-[1px]"
        }`}>
          <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">
            Designed for Comfort
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold font-heading text-brand-text">
            Every detail, considered.
          </h2>
          <div className="w-12 h-1 bg-brand-accent/40 mx-auto rounded-full" />
          <p className="text-sm sm:text-base text-brand-text/75">
            Dental visits shouldn&apos;t feel like a chore. We have designed every step of our environment to pamper you and make care a calming ritual.
          </p>
        </div>

        {/* Grid of 8 items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {amenitiesList.map((amenity, idx) => {
            const IconComp = amenity.icon;
            // stagger items in 4 columns
            const delayMs = (idx % 4) * 100 + 150;
            return (
              <div
                key={idx}
                style={{ transitionDelay: isVisible ? `${delayMs}ms` : "0ms" }}
                className={`bg-[#faf6f3] border border-[#e9ded5]/70 rounded-xl p-6 shadow-xs hover:shadow-sm hover:border-brand-accent/30 transition-all duration-1000 ease-out transform ${
                  isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-[0.98]"
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-brand-primary flex items-center justify-center mb-4">
                  <IconComp className="w-5 h-5 text-brand-accent" />
                </div>
                <h3 className="text-base font-normal font-heading text-brand-text mb-2">
                  {amenity.title}
                </h3>
                <p className="text-xs text-brand-text/75 leading-relaxed font-light">
                  {amenity.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
