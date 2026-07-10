"use client";

import { Phone, Calendar } from "lucide-react";

export default function CTASection() {
  const triggerBooking = () => {
    window.dispatchEvent(new Event("open-booking"));
  };

  return (
    <section className="py-24 bg-brand-secondary/35 border-t border-brand-secondary/40 text-brand-text relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-brand-secondary/20 filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-brand-accent/5 filter blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">
            Reserve Your Visit
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-heading text-brand-text leading-tight">
            A higher standard of dental care, <br />
            <span className="text-brand-accent font-medium">designed for you.</span>
          </h2>
          <p className="text-sm sm:text-base text-brand-text/75 max-w-xl mx-auto leading-relaxed pt-2">
            Experience comprehensive, comfortable dentistry in our calming Bay Area spaces. Your first visit includes an HD scan review, exam, clean, and customized planning.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-sm sm:max-w-md mx-auto">
          <button
            onClick={triggerBooking}
            className="btn-primary w-full sm:w-auto py-3.5 px-8 text-base font-medium flex items-center justify-center space-x-2.5 shadow-lg shadow-brand-accent/20"
          >
            <Calendar className="w-5 h-5" />
            <span>Book a Visit</span>
          </button>
          
          <a
            href="tel:03070984307"
            className="btn-secondary w-full sm:w-auto py-3.5 px-8 text-base font-medium flex items-center justify-center space-x-2.5 bg-white/50"
          >
            <Phone className="w-5 h-5" />
            <span>Call Now</span>
          </a>
        </div>
      </div>
    </section>
  );
}
