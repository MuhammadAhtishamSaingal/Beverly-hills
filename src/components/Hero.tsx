"use client";

import Image from "next/image";
import { Phone, Calendar } from "lucide-react";
import { trackPixelEvent } from "@/utils/pixel";

export default function Hero() {
  const triggerBooking = () => {
    trackPixelEvent("InitiateCheckout", { content_name: "Hero Book a Visit" });
    window.dispatchEvent(new Event("open-booking"));
  };

  return (
    <section className="relative w-full h-[580px] md:h-auto md:min-h-screen flex items-end md:items-center justify-start overflow-hidden bg-brand-primary pb-10 md:pb-0 pt-[140px] md:pt-0">
      {/* Hero image container */}
      <div className="absolute inset-0 z-10">
        {/* Desktop Hero Image */}
        <Image
          src="/images/hero-studios.webp"
          alt="Beverly Hills Clinic Reception"
          fill
          priority
          sizes="100vw"
          className="hidden md:block object-cover object-center"
        />
        {/* Mobile Hero Image */}
        <div className="block md:hidden absolute inset-0 bg-brand-primary">
          <picture>
            <source media="(max-width: 767px)" srcSet="/images/mobile banners.webp" />
            <img
              src="/images/mobile banners.webp"
              alt="Beverly Hills Clinic Reception Mobile"
              className="w-full h-full object-cover object-center"
            />
          </picture>
        </div>
        {/* Left-side sand/white gradient overlay for text and header legibility */}
        <div className="absolute inset-x-0 bottom-0 h-[65%] md:h-full md:inset-y-0 md:left-0 md:w-[65%] lg:w-[55%] bg-gradient-to-t from-[#f6ede7]/85 via-[#f6ede7]/50 to-transparent md:bg-gradient-to-r md:from-[#f6ede7] md:via-[#f6ede7]/85 z-10" />
        {/* Top-to-bottom sand/white gradient overlay for header navigation links legibility */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#f6ede7]/75 via-[#f6ede7]/25 to-transparent md:from-[#f6ede7]/90 md:via-[#f6ede7]/40 z-10 pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-brand-text font-sans mt-8 md:mt-0">
        <div className="max-w-2xl space-y-6">
          {/* Location Label with preceding line */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-[1.5px] bg-[#3d2e2a]" />
            <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#3d2e2a]/95">
              SHARFABAD &middot; BADAR COMMERCIAL
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-semibold leading-tight font-heading text-brand-text">
            <span className="block text-3xl sm:text-4xl md:text-5xl">
              PREMIUM
            </span>
            <span className="block text-xl sm:text-2xl md:text-3xl text-[#3d2e2a]/80 mt-1 sm:mt-2">
              AESTHETIC & DENTAL CLINIC
            </span>
          </h1>

          {/* Subheading */}
          <p className="hidden md:block text-base sm:text-lg text-brand-text/90 leading-relaxed max-w-xl font-light">
            Experience expert cosmetic dentistry, facial aesthetics, laser therapies,
            Botox, dermal fillers, skin rejuvenation, and body contouring—
            all tailored to help you look and feel your absolute best.</p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 w-full">
            <button
              onClick={triggerBooking}
              className="w-full sm:w-auto btn-primary py-3.5 px-8 text-base font-medium flex items-center justify-center space-x-2.5 shadow-lg shadow-[#3d2e2a]/20 !bg-[#3d2e2a] hover:!bg-[#2d221f]"
            >
              <Calendar className="w-5 h-5" />
              <span>Book a Visit</span>
            </button>

            <a
              href="tel:03070984307"
              onClick={() => trackPixelEvent("Contact", { content_name: "Hero Call Now" })}
              className="w-full sm:w-auto btn-secondary py-3.5 px-8 text-base font-medium flex items-center justify-center space-x-2.5 !text-brand-text !border-[#3d2e2a] hover:!bg-[#3d2e2a]/10"
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
