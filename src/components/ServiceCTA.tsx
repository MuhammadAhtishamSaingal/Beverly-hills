"use client";

import { Calendar, Phone, MapPin } from "lucide-react";
import { trackPixelEvent, trackInitiateBooking } from "@/utils/pixel";

interface ServiceCTAProps {
  serviceTitle: string;
}

export default function ServiceCTA({ serviceTitle }: ServiceCTAProps) {
  const triggerBooking = () => {
    trackInitiateBooking(serviceTitle);
    window.dispatchEvent(
      new CustomEvent("open-booking", {
        detail: { service: serviceTitle }
      })
    );
  };

  return (
    <section className="py-20 bg-[#2d221f] text-[#f6ede7] relative overflow-hidden">
      {/* Subtle background glow decorator */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#c39f75]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#c39f75]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8 relative z-10">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-[#c39f75]/20 text-[#e8ceb1] border border-[#c39f75]/30">
          Beverly Hills Clinic DHA Karachi
        </span>

        <h2 className="text-3xl sm:text-5xl font-serif font-normal text-white leading-tight max-w-3xl mx-auto">
          Ready to experience personalized care for {serviceTitle}?
        </h2>

        <p className="text-sm sm:text-base text-[#e8ceb1]/80 max-w-xl mx-auto font-light leading-relaxed">
          Schedule your private consultation with our specialists in DHA Karachi today. We look forward to welcoming you.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
          <button
            onClick={triggerBooking}
            className="w-full sm:w-auto bg-[#c39f75] hover:bg-[#b08b62] text-white font-semibold text-xs tracking-wider uppercase py-4 px-8 rounded-full transition-all hover:scale-105 shadow-md flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Consultation</span>
          </button>

          <a
            id="service-cta-call-now"
            href="tel:03070984307"
            onClick={() =>
              trackPixelEvent("Contact", {
                content_name: `Service Page Call - ${serviceTitle}`
              })
            }
            className="meta-track-call w-full sm:w-auto bg-transparent border border-[#e8ceb1]/50 hover:bg-[#e8ceb1]/10 text-[#f6ede7] font-semibold text-xs tracking-wider uppercase py-4 px-8 rounded-full transition-all flex items-center justify-center space-x-2"
          >
            <Phone className="w-4 h-4 text-[#e8ceb1]" />
            <span>Call Clinic (0307-0984307)</span>
          </a>
        </div>

        <div className="pt-4 flex items-center justify-center space-x-2 text-xs text-[#e8ceb1]/60 font-light">
          <MapPin className="w-3.5 h-3.5 text-[#c39f75]" />
          <span>2nd Floor, Main Saba Avenue, Phase 5, DHA Karachi</span>
        </div>
      </div>
    </section>
  );
}
