"use client";

import { Phone, Calendar } from "lucide-react";
import { trackContact, trackInitiateBooking } from "@/lib/metaPixel";
import { CLINIC_PHONE_RAW, CLINIC_WHATSAPP } from "@/data/locations";

const whatsappUrl = `https://wa.me/${CLINIC_WHATSAPP}?text=${encodeURIComponent(
  "Hello Beverly Hills Clinic, I would like to book a consultation."
)}`;

export default function MobileActionBar() {
  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#2d221f]/95 backdrop-blur border-t border-[#ab7f51]/40 grid grid-cols-3 text-[11px] font-semibold uppercase tracking-wide text-[#f6ede7]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        id="mobile-bar-call"
        href={`tel:${CLINIC_PHONE_RAW}`}
        onClick={() => trackContact("Mobile Bar Call")}
        className="meta-track-call flex flex-col items-center justify-center gap-1 py-2.5 active:bg-white/10"
      >
        <Phone className="w-5 h-5 text-[#e8ceb1]" />
        Call
      </a>
      <a
        id="mobile-bar-whatsapp"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackContact("Mobile Bar WhatsApp")}
        className="flex flex-col items-center justify-center gap-1 py-2.5 border-x border-white/10 active:bg-white/10"
      >
        <svg viewBox="0 0 448 512" fill="#25D366" className="w-5 h-5" aria-hidden="true">
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.6-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6z" />
        </svg>
        WhatsApp
      </a>
      <button
        type="button"
        onClick={() => {
          trackInitiateBooking("Mobile Bar Book");
          window.dispatchEvent(new CustomEvent("open-booking"));
        }}
        className="flex flex-col items-center justify-center gap-1 py-2.5 bg-[#ab7f51] text-white active:bg-[#936b42]"
      >
        <Calendar className="w-5 h-5" />
        Book Now
      </button>
    </div>
  );
}
