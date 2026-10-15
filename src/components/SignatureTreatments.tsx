"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";
import { trackInitiateBooking } from "@/lib/metaPixel";

interface Treatment {
  title: string;
  tag: string;
  blurb: string;
  image: string;
  href: string;
  bookingService: string;
  featured?: boolean;
}

const dental: Treatment[] = [
  {
    title: "Hollywood Smile Makeover",
    tag: "3 visits · about 10 days",
    blurb: "Custom E-max or Zirconia veneers designed for your face. Walk in with the smile you have, walk out with the smile you want.",
    image: "/images/hollywood-smile-makeover-1.jpg",
    href: "/services/hollywood-smile-makeover",
    bookingService: "Hollywood Smile Makeover",
    featured: true,
  },
  {
    title: "Dental Implants",
    tag: "Permanent tooth replacement",
    blurb: "Replace missing teeth with implants that look, feel and chew like natural teeth.",
    image: "/images/dental-implants-1.jpg",
    href: "/services/dental-implants",
    bookingService: "Dental Implants",
  },
];

const aesthetic: Treatment[] = [
  {
    title: "Exosomes Therapy",
    tag: "Skin renewal",
    blurb: "Next-generation skin rejuvenation for glow, texture and fine lines.",
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
    title: "Signature Facials",
    tag: "Red Carpet & BH Exfoliating",
    blurb: "Our most-loved facials for an instant, event-ready glow.",
    image: "/images/red-carpet-treatment-1.jpg",
    href: "/services/red-carpet-facial",
    bookingService: "Red Carpet Facial",
  },
];

function book(service: string) {
  trackInitiateBooking(`Signature Treatments - ${service}`);
  window.dispatchEvent(new CustomEvent("open-booking", { detail: { service } }));
}

function TreatmentCard({ t }: { t: Treatment }) {
  return (
    <article
      className={`snap-start shrink-0 w-[82%] sm:w-[60%] md:w-auto bg-white border border-brand-secondary/40 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col ${
        t.featured ? "md:col-span-2 md:flex-row" : ""
      }`}
    >
      <div className={`relative w-full ${t.featured ? "h-56 md:h-auto md:w-1/2" : "h-48"}`}>
        <Image src={t.image} alt={`${t.title} at Beverly Hills Clinic Karachi`} fill sizes="(max-width: 768px) 85vw, 40vw" className="object-cover" />
        <span className="absolute top-3 left-3 bg-[#2d221f]/85 text-[#f6ede7] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
          {t.tag}
        </span>
      </div>
      <div className={`p-5 flex flex-col flex-grow ${t.featured ? "md:w-1/2 md:p-8 md:justify-center" : ""}`}>
        <h3 className={`font-heading text-brand-text ${t.featured ? "text-2xl md:text-3xl" : "text-xl"}`}>{t.title}</h3>
        <p className="text-sm text-brand-text/75 leading-relaxed mt-2 flex-grow">{t.blurb}</p>
        <div className="flex items-center gap-4 mt-5">
          <button
            type="button"
            onClick={() => book(t.bookingService)}
            className="bg-[#3d2e2a] hover:bg-[#2d221f] text-white text-xs font-semibold uppercase tracking-wider py-2.5 px-5 rounded-full flex items-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            Book
          </button>
          <Link href={t.href} className="text-xs font-bold uppercase tracking-wider text-brand-accent hover:underline flex items-center gap-1">
            Details <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function Group({ label, title, items }: { label: string; title: string; items: Treatment[] }) {
  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-brand-accent">{label}</span>
          <h3 className="text-2xl sm:text-3xl font-heading text-brand-text mt-1">{title}</h3>
        </div>
        <span className="md:hidden text-[10px] uppercase tracking-wider text-brand-text/50">Swipe →</span>
      </div>
      <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 pb-2 [scrollbar-width:none]">
        {items.map((t) => (
          <TreatmentCard key={t.title} t={t} />
        ))}
      </div>
    </div>
  );
}

export default function SignatureTreatments() {
  return (
    <section id="signature-treatments" className="py-16 sm:py-24 bg-[#fcf8f6] border-t border-brand-secondary/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        <div className="max-w-2xl space-y-3">
          <div className="flex items-center gap-2 text-brand-accent">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Signature Treatments</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-heading text-brand-text leading-tight">
            One clinic for your smile and your skin
          </h2>
          <p className="text-sm sm:text-base text-brand-text/75 leading-relaxed">
            Our dentists and aesthetic doctors work side by side, so your new smile and your skin are planned together.
          </p>
        </div>

        <Group label="Dentistry" title="Smile & Teeth" items={dental} />
        <Group label="Aesthetics" title="Face & Skin" items={aesthetic} />
      </div>
    </section>
  );
}
