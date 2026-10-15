"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { trackInitiateBooking } from "@/lib/metaPixel";

interface Treatment {
  title: string;
  tag: string;
  blurb: string;
  image: string;
  href: string;
  bookingService: string;
  highlight?: string;
}

const groups: Record<"dental" | "aesthetic", { label: string; items: Treatment[] }> = {
  dental: {
    label: "Dentistry",
    items: [
      {
        title: "Hollywood Smile Makeover",
        tag: "3 visits · about 10 days",
        highlight: "Most requested",
        blurb: "Custom E-max or Zirconia veneers, designed around your face for a natural, camera-ready smile.",
        image: "/images/hollywood-smile-makeover-1.jpg",
        href: "/services/hollywood-smile-makeover",
        bookingService: "Hollywood Smile Makeover",
      },
      {
        title: "E-max & Zirconia Veneers",
        tag: "Most natural · Strongest",
        blurb: "Ultra-thin E-max for natural translucency, or Zirconia for maximum strength.",
        image: "/images/dental-veneers-crowns-bridges-1.jpg",
        href: "/services/dental-veneers-crowns-bridges",
        bookingService: "Dental Veneers, Crowns, Bridges",
      },
      {
        title: "Dental Implants",
        tag: "Permanent replacement",
        blurb: "Replace missing teeth with implants that look, feel and chew like your own.",
        image: "/images/dental-implants-1.jpg",
        href: "/services/dental-implants",
        bookingService: "Dental Implants",
      },
    ],
  },
  aesthetic: {
    label: "Aesthetics",
    items: [
      {
        title: "Exosomes Therapy",
        tag: "Skin renewal",
        highlight: "Signature",
        blurb: "Advanced skin rejuvenation for glow, smoother texture and softer fine lines.",
        image: "/images/exosome-therapy-1.jpg",
        href: "/services/exosomes-therapy",
        bookingService: "Exosomes Therapy",
      },
      {
        title: "Lip Fillers",
        tag: "Natural volume",
        blurb: "Soft, balanced lips shaped to suit your face, never overdone.",
        image: "/images/fillers-1.jpg",
        href: "/services/dermal-fillers",
        bookingService: "Fillers: Face, Lips, Hair, Body",
      },
      {
        title: "Red Carpet Facial",
        tag: "Event-ready glow",
        blurb: "Our signature facial for instant radiance before any occasion.",
        image: "/images/red-carpet-treatment-1.jpg",
        href: "/services/red-carpet-facial",
        bookingService: "Red Carpet Facial",
      },
    ],
  },
};

function book(service: string) {
  trackInitiateBooking(`Signature Treatments - ${service}`);
  window.dispatchEvent(new CustomEvent("open-booking", { detail: { service } }));
}

function TreatmentCard({ t, index }: { t: Treatment; index: number }) {
  return (
    <article className="relative aspect-[4/5] md:aspect-[3/4] rounded-[28px] overflow-hidden bg-[#1c1412] shadow-[0_20px_50px_-20px_rgba(28,20,18,0.55)]">
      <Image
        src={t.image}
        alt={`${t.title} at Beverly Hills Clinic Karachi`}
        fill
        sizes="(max-width: 768px) 92vw, 33vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1c1412] via-[#1c1412]/55 to-transparent" />

      <div className="absolute top-4 inset-x-4 flex items-center justify-between">
        <span className="font-heading text-[#e8ceb1]/90 text-sm">0{index + 1}</span>
        {t.highlight && (
          <span className="bg-[#c39f75] text-[#1c1412] text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full">
            {t.highlight}
          </span>
        )}
      </div>

      <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-[#f6ede7] space-y-2.5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#c39f75]">{t.tag}</span>
        <h3 className="font-heading text-[1.7rem] leading-tight">{t.title}</h3>
        <p className="text-[13px] text-[#f6ede7]/75 leading-relaxed">{t.blurb}</p>
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => book(t.bookingService)}
            className="bg-[#f6ede7] active:bg-white text-[#1c1412] text-[11px] font-bold uppercase tracking-[0.15em] py-3 px-5 rounded-full cursor-pointer"
          >
            Book Consultation
          </button>
          <Link
            href={t.href}
            aria-label={`Learn more about ${t.title}`}
            className="w-10 h-10 rounded-full border border-[#f6ede7]/40 flex items-center justify-center text-[#f6ede7]"
          >
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function SignatureTreatments() {
  const [active, setActive] = useState<"dental" | "aesthetic">("dental");

  return (
    <section id="signature-treatments" className="py-16 sm:py-24 bg-[#f6ede7] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#ab7f51]">Signature Treatments</span>
          <h2 className="font-heading text-[2.1rem] sm:text-5xl leading-[1.1] text-[#1c1412]">
            Crafted for your <span className="italic text-[#ab7f51]">smile</span> and your{" "}
            <span className="italic text-[#ab7f51]">skin</span>
          </h2>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="inline-flex bg-white/70 border border-[#e8ceb1] rounded-full p-1" role="tablist">
            {(Object.keys(groups) as ("dental" | "aesthetic")[]).map((key) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={active === key}
                onClick={() => setActive(key)}
                className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.18em] transition-colors cursor-pointer ${
                  active === key ? "bg-[#1c1412] text-[#f6ede7]" : "text-[#1c1412]/70"
                }`}
              >
                {groups[key].label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {groups[active].items.map((t, i) => (
            <TreatmentCard key={t.title} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
