"use client";

import { Heart, Sparkles, Leaf, Compass } from "lucide-react";

export default function Philosophy() {
  const column1 = [
    {
      icon: Heart,
      title: (
        <>
          Comprehensive<br />care
        </>
      ),
      description: "Evidence-based dentistry, delivered by a team that genuinely listens.",
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
    <section className="py-24 bg-brand-primary border-t border-brand-secondary/40 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading Copy (5/12 width) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            {/* Tagline label with horizontal line prefix */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-[1px] bg-[#ab7f51]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#ab7f51]">
                OUR PHILOSOPHY
              </span>
            </div>

            {/* Large Serif Stacked Heading */}
            <h2 className="text-4xl sm:text-5xl font-semibold leading-[1.15] font-heading text-brand-text max-w-sm">
              Exceptional<br />
              comprehensive<br />
              care, delivered<br />
              with care<br />
              and calm.
            </h2>

            {/* Brand Subtext */}
            <p className="text-sm text-brand-text/70 leading-relaxed max-w-xs pt-1">
              Beverly Hills Clinic is built for people who value both.
            </p>
          </div>

          {/* Right Column: Staggered Cards Box (7/12 width) */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            {/* Rounded outer box container with exact gradient, borders, and drop shadow */}
            <div className="bg-gradient-to-b from-[#efe6df] to-[#e4d3c6] border border-[#e5d4c8]/30 rounded-3xl p-6 sm:p-8 shadow-[0_25px_50px_rgba(45,34,31,0.12)] max-w-[460px] w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-start">
                
                {/* Column 1 (Left): Starts immediately */}
                <div className="space-y-5">
                  {column1.map((card, idx) => {
                    const IconComp = card.icon;
                    return (
                      <div
                        key={`col1-${idx}`}
                        className="bg-white/95 border border-[#e5d4c8]/20 rounded-2xl p-6 shadow-[0_8px_20px_rgba(45,34,31,0.04)] hover:shadow-[0_12px_24px_rgba(45,34,31,0.06)] transition-all duration-300 hover:-translate-y-0.5"
                      >
                        {/* Golden Outline Icon Wrapper */}
                        <div className="w-9 h-9 rounded-lg bg-[#fdfbf9] border border-[#f0e6dd] flex items-center justify-center mb-4">
                          <IconComp className="w-4.5 h-4.5 text-[#ab7f51]" />
                        </div>
                        
                        {/* Title (stacked) */}
                        <h3 className="text-base font-bold font-heading text-brand-text leading-tight mb-2">
                          {card.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-brand-text/70 leading-relaxed">
                          {card.description}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Column 2 (Right): Staggered Offset downward on desktop */}
                <div className="space-y-5 sm:pt-14">
                  {column2.map((card, idx) => {
                    const IconComp = card.icon;
                    return (
                      <div
                        key={`col2-${idx}`}
                        className="bg-white/95 border border-[#e5d4c8]/20 rounded-2xl p-6 shadow-[0_8px_20px_rgba(45,34,31,0.04)] hover:shadow-[0_12px_24px_rgba(45,34,31,0.06)] transition-all duration-300 hover:-translate-y-0.5"
                      >
                        {/* Golden Outline Icon Wrapper */}
                        <div className="w-9 h-9 rounded-lg bg-[#fdfbf9] border border-[#f0e6dd] flex items-center justify-center mb-4">
                          <IconComp className="w-4.5 h-4.5 text-[#ab7f51]" />
                        </div>
                        
                        {/* Title (stacked) */}
                        <h3 className="text-base font-bold font-heading text-brand-text leading-tight mb-2">
                          {card.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-brand-text/70 leading-relaxed">
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
