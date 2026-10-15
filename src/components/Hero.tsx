"use client";

import Image from "next/image";
import { Phone, Calendar } from "lucide-react";
import { trackInitiateBooking, trackContact } from "@/lib/metaPixel";

function DesktopHero() {
  const triggerBooking = () => {
    trackInitiateBooking("Hero Book a Visit");
    window.dispatchEvent(new CustomEvent("open-booking"));
  };

  return (
    <section className="hidden md:flex relative w-full min-h-[100svh] md:min-h-screen items-end md:items-center justify-start overflow-hidden bg-brand-primary pb-24 md:pb-0 pt-[120px] md:pt-0">
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
            <source media="(max-width: 767px)" srcSet="/images/mobile-banner.JPG" />
            <img
              src="/images/mobile-banner.JPG"
              alt="Beverly Hills Clinic Reception Mobile"
              className="w-full h-full object-cover object-center"
            />
          </picture>
        </div>
        {/* Left-side sand/white gradient overlay for text and header legibility */}
        <div className="absolute inset-x-0 bottom-0 h-[78%] md:h-full md:inset-y-0 md:left-0 md:w-[65%] lg:w-[55%] bg-gradient-to-t from-[#f6ede7] via-[#f6ede7]/85 to-transparent md:bg-gradient-to-r md:from-[#f6ede7] md:via-[#f6ede7]/85 z-10" />
        {/* Top-to-bottom sand/white gradient overlay for header navigation links legibility */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#f6ede7]/65 via-[#f6ede7]/15 to-transparent md:from-[#f6ede7]/90 md:via-[#f6ede7]/40 z-10 pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-brand-text font-sans mt-8 md:mt-0">
        <div className="max-w-2xl space-y-4 md:space-y-6">
          {/* Location Label with preceding line */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:block w-10 h-[1.5px] bg-[#3d2e2a]" />
            <span className="text-[11px] sm:text-sm font-bold tracking-widest uppercase text-[#3d2e2a] bg-[#f6ede7]/90 md:bg-transparent px-3 py-1 md:p-0 rounded-full">
              DHA &amp; BAHADURABAD, KARACHI
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-semibold leading-tight font-heading text-[#2d221f]">
            <span className="block text-[2rem] sm:text-4xl md:text-5xl">
              Premium Dental &amp; Aesthetic Clinic
            </span>
            <span className="block text-lg sm:text-2xl md:text-3xl text-[#3d2e2a] mt-2 font-normal">
              Your new smile in about 10 days
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-lg text-[#2d221f]/90 leading-relaxed max-w-xl">
            Smile makeovers with E-max &amp; Zirconia veneers and dental implants, plus exosomes,
            lip fillers and signature facials, all under one roof.
          </p>
          <p className="text-xs sm:text-sm font-semibold text-[#3d2e2a]">
            ★ Rated 4.8 on Google · Consultation PKR 3,000
          </p>

          {/* CTA Buttons */}
          <div className="grid grid-cols-2 sm:flex sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4 pt-2 w-full">
            <button
              onClick={triggerBooking}
              className="col-span-2 w-full sm:w-auto btn-primary py-3.5 px-6 sm:px-8 text-base font-medium flex items-center justify-center space-x-2.5 shadow-lg shadow-[#3d2e2a]/20 !bg-[#3d2e2a] hover:!bg-[#2d221f]"
            >
              <Calendar className="w-5 h-5" />
              <span>Book a Visit</span>
            </button>

            <a
              id="hero-call-now"
              href="tel:03070984307"
              onClick={() => trackContact("Hero Phone Call")}
              className="meta-track-call w-full sm:w-auto btn-secondary py-3 sm:py-3.5 px-4 sm:px-8 text-sm sm:text-base font-medium flex items-center justify-center space-x-2.5 !text-brand-text !border-[#3d2e2a] hover:!bg-[#3d2e2a]/10"
            >
              <Phone className="w-5 h-5" />
              <span>Call Now</span>
            </a>

            <a
              id="hero-whatsapp"
              href="https://wa.me/923002271299?text=Hello%20Beverly%20Hills%20Clinic%2C%20I%20would%20like%20to%20inquire%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContact("Hero WhatsApp Click")}
              className="w-full sm:w-auto btn-secondary py-3 sm:py-3.5 px-4 sm:px-8 text-sm sm:text-base font-medium flex items-center justify-center space-x-2.5 !text-white !bg-[#25D366] hover:!bg-[#20ba5a] !border-[#25D366] shadow-lg shadow-[#25D366]/20 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                fill="currentColor"
                className="w-5 h-5 shrink-0"
              >
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.6-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
              </svg>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Decorative scroll indicator */}
      <div className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center space-y-2 opacity-60 animate-bounce">
        <span className="text-[10px] uppercase tracking-widest text-white">Scroll</span>
        <div className="w-1.5 h-6 rounded-full border border-white flex items-start justify-center p-0.5">
          <div className="w-1 h-2 rounded-full bg-white animate-scroll-dot" />
        </div>
      </div>
    </section>
  );
}

function MobileHero() {
  const triggerBooking = () => {
    trackInitiateBooking("Mobile Hero Book Consultation");
    window.dispatchEvent(new CustomEvent("open-booking"));
  };

  return (
    <section className="md:hidden relative w-full min-h-[100svh] bg-[#1c1412] text-[#f6ede7] overflow-hidden flex flex-col justify-end">
      <Image
        src="/images/people-team.webp"
        alt="Beverly Hills Clinic dentists and aesthetic doctors in Karachi"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_20%]"
      />
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#f6ede7]/80 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-[72%] bg-gradient-to-t from-[#1c1412] from-35% via-[#1c1412]/85 to-transparent" />

      <div className="relative z-10 px-5 pb-28 pt-10 space-y-5">
        <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.25em] text-[#e8ceb1] bg-[#1c1412]/55 backdrop-blur-sm px-3 py-1.5 rounded-full">
          DHA Phase 5 · Bahadurabad · Karachi
        </span>
        <h1 className="font-heading text-[2.4rem] leading-[1.05]">
          Beautiful smiles.
          <span className="block italic text-[#e8ceb1]">Radiant skin.</span>
        </h1>
        <p className="text-sm text-[#f6ede7]/80 leading-relaxed max-w-xs">
          Premium smile makeovers in about 10 days, dental implants and signature aesthetic treatments.
        </p>
        <div className="flex items-center gap-2 text-xs text-[#f6ede7]/85">
          <span className="text-[#f5b301] tracking-tight">★★★★★</span>
          <span>4.8 on Google</span>
        </div>
        <button
          type="button"
          onClick={triggerBooking}
          className="w-full bg-[#c39f75] active:bg-[#b08b62] text-[#1c1412] font-semibold text-sm uppercase tracking-[0.15em] py-4 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-black/30"
        >
          <Calendar className="w-4 h-4" />
          Book Consultation
        </button>
        <a
          href="#signature-treatments"
          className="block text-center text-[11px] uppercase tracking-[0.2em] text-[#f6ede7]/70"
        >
          Explore signature treatments ↓
        </a>
      </div>
    </section>
  );
}

export default function Hero() {
  return (
    <>
      <MobileHero />
      <DesktopHero />
    </>
  );
}
