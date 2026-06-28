"use client";

import Image from "next/image";
import { Phone, Calendar } from "lucide-react";

export default function Hero() {
  const triggerBooking = () => {
    window.dispatchEvent(new Event("open-booking"));
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-brand-primary">
      {/* Full-width hero image with soft overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-studio.png"
          alt="Beverly Hills Clinic Reception"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Soft, light warm-sand gradient overlay matching the reference image */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#f6ede7] via-[#f6ede7]/75 to-transparent z-10" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-brand-text font-sans">
        <div className="max-w-2xl space-y-6">
          {/* Location Label with preceding line */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-[1.5px] bg-[#3d2e2a]" />
            <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#3d2e2a]/95">
              SHARFABAD &middot; BADAR COMMERCIAL
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight font-heading text-brand-text">
            Modern dental care, <br className="hidden sm:inline" />
            <span className="text-[#3d2e2a]/80 font-medium">thoughtfully delivered.</span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-brand-text/90 leading-relaxed max-w-xl font-light">
            Comprehensive dentistry in calm, well-designed spaces across Karachi. We value your peace of mind as much as your smile.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <button
              onClick={triggerBooking}
              className="btn-primary py-3.5 px-8 text-base font-medium flex items-center justify-center space-x-2.5 shadow-lg shadow-[#3d2e2a]/20 !bg-[#3d2e2a] hover:!bg-[#2d221f]"
            >
              <Calendar className="w-5 h-5" />
              <span>Book a Visit</span>
            </button>
            
            <a
              href="tel:03070984307"
              className="btn-secondary py-3.5 px-8 text-base font-medium flex items-center justify-center space-x-2.5 !text-brand-text !border-[#3d2e2a] hover:!bg-[#3d2e2a]/10"
            >
              <Phone className="w-5 h-5" />
              <span>Call Now</span>
            </a>
          </div>
        </div>
      </div>

      {/* Decorative scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 opacity-60 animate-bounce">
        <span className="text-[10px] uppercase tracking-widest text-white">Scroll</span>
        <div className="w-1.5 h-6 rounded-full border border-white flex items-start justify-center p-0.5">
          <div className="w-1 h-2 rounded-full bg-white animate-scroll-dot" />
        </div>
      </div>
    </section>
  );
}
