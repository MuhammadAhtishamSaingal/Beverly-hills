"use client";

import { Calendar, Clock, UserCheck } from "lucide-react";
import { ServiceData } from "@/data/services";
import { trackInitiateBooking } from "@/lib/metaPixel";

interface ServiceIntroProps {
  service: ServiceData;
}

export default function ServiceIntro({ service }: ServiceIntroProps) {
  const triggerBooking = () => {
    trackInitiateBooking(`Service Page Consultation CTA - ${service.title}`);
    window.dispatchEvent(
      new CustomEvent("open-booking", {
        detail: { service: service.title }
      })
    );
  };

  return (
    <section className="py-16 sm:py-20 bg-brand-primary border-b border-brand-secondary/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        {/* Intro Heading */}
        <h2 className="text-2xl sm:text-4xl md:text-4xl font-serif font-normal text-brand-text leading-tight max-w-3xl mx-auto">
          {service.introHeading}
        </h2>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center space-x-3">
          <div className="w-12 h-[1px] bg-brand-accent/50" />
          <div className="w-2 h-2 rounded-full bg-brand-accent" />
          <div className="w-12 h-[1px] bg-brand-accent/50" />
        </div>

        {/* Intro Paragraphs */}
        <div className="space-y-4 text-base sm:text-lg text-brand-text/80 leading-relaxed font-light max-w-3xl mx-auto text-left sm:text-center">
          {service.introText.split("\n\n").map((para, pIdx) => (
            <p key={pIdx}>{para}</p>
          ))}
        </div>

        {/* Bullet Benefits List */}
        {service.bulletBenefits && service.bulletBenefits.length > 0 && (
          <div className="pt-4 max-w-2xl mx-auto text-left bg-white/60 border border-brand-secondary/40 rounded-2xl p-5 sm:p-6 shadow-2xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-accent mb-3 text-center sm:text-left">
              Key Clinical Benefits & Advantages:
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-brand-text/80">
              {service.bulletBenefits.map((b, bIdx) => (
                <li key={bIdx} className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-2 flex-shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Metadata Badges (Duration & Suitability) */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs sm:text-sm text-brand-text/80">
          <div className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white/90 border border-brand-secondary/60 px-4 py-2.5 rounded-2xl sm:rounded-full shadow-2xs">
            <Clock className="w-4 h-4 text-brand-accent shrink-0" />
            <span>
              <strong className="font-semibold text-brand-accent">Duration:</strong> {service.duration}
            </span>
          </div>

          <div className="w-full sm:w-auto flex items-start sm:items-center space-x-2 bg-white/90 border border-brand-secondary/60 px-4 py-2.5 rounded-2xl sm:rounded-full shadow-2xs max-w-2xl text-left sm:text-center leading-relaxed">
            <UserCheck className="w-4 h-4 text-brand-accent shrink-0 mt-0.5 sm:mt-0" />
            <span className="break-words">
              <strong className="font-semibold text-brand-accent">Ideal For:</strong> {service.suitability}
            </span>
          </div>
        </div>

        {/* Primary Intro CTA */}
        <div className="pt-6">
          <button
            onClick={triggerBooking}
            className="btn-primary py-3.5 px-8 text-xs sm:text-sm font-semibold tracking-wider uppercase inline-flex items-center space-x-2 shadow-md hover:scale-102 transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Consultation</span>
          </button>
        </div>
      </div>
    </section>
  );
}
