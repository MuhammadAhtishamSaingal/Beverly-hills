"use client";



export default function Studios() {
  const leftImages = [
    { desktop: "/images/DESKTOP1_MARQE_1200.webp", mobile: "/images/MOBILE1_MARQE.webp" },
    { desktop: "/images/DESKTOP2_MARQE_1200.jpg", mobile: "/images/MOBILE2_MARQE.jpg" },
    { desktop: "/images/DESKTOP3_MARQE_1200.webp", mobile: "/images/MOBILE3_MARQE.webp" },
  ];

  const rightImages = [
    { desktop: "/images/DESKTOP4_MARQE_1200.webp", mobile: "/images/MOBILE4_MARQE.webp" },
    { desktop: "/images/DESKTOP1_MARQE_1200.webp", mobile: "/images/MOBILE1_MARQE.webp" },
    { desktop: "/images/DESKTOP2_MARQE_1200.jpg", mobile: "/images/MOBILE2_MARQE.jpg" },
  ];

  // Duplicate items to ensure seamless infinite looping scroll
  const leftMarqueeItems = [...leftImages, ...leftImages, ...leftImages];
  const rightMarqueeItems = [...rightImages, ...rightImages, ...rightImages];

  return (
    <section className="py-24 bg-brand-primary border-t border-brand-secondary/40 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left max-w-3xl space-y-4 mb-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-[1px] bg-brand-accent" />
            <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">
              THE STUDIOS
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-semibold font-heading text-brand-text leading-tight">
            Spaces designed to put you at ease
          </h2>
          
          <p className="text-sm sm:text-base text-brand-text/75 max-w-2xl leading-relaxed">
            Warm light, natural materials, and quiet detail &mdash; every studio is shaped to calm the nervous system the moment you step inside.
          </p>
        </div>

        {/* Dual Vertical Marquee Gallery */}
        <div className="relative h-[650px] overflow-hidden rounded-3xl border border-brand-secondary/35 bg-white/40 p-6 sm:p-10 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          
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
