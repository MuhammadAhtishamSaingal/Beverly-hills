"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { trackContact, trackInitiateBooking } from "@/lib/metaPixel";
import { CLINIC_WHATSAPP } from "@/data/locations";

interface Concern {
  emoji: string;
  problem: string;
  treatment: string;
  answer: string;
  image: string;
  href: string;
  bookingService: string;
}

const concerns: Concern[] = [
  {
    emoji: "😬",
    problem: "Yellow or uneven teeth",
    treatment: "Smile Makeover",
    answer: "Veneers give you white, even teeth that suit your face, in about 10 days.",
    image: "/images/hollywood-smile-makeover-2.jpg",
    href: "/services/hollywood-smile-makeover",
    bookingService: "Hollywood Smile Makeover",
  },
  {
    emoji: "🦷",
    problem: "Missing tooth",
    treatment: "Dental Implants",
    answer: "A strong new tooth that is fixed in place and feels like your own.",
    image: "/images/dental-implants-2.jpg",
    href: "/services/dental-implants",
    bookingService: "Dental Implants",
  },
  {
    emoji: "😣",
    problem: "Tooth pain",
    treatment: "Root Canal Treatment",
    answer: "We clean the inside of the tooth so the pain goes away and you keep your tooth.",
    image: "/images/root-canal-treatment-1.jpg",
    href: "/services/root-canal-treatment",
    bookingService: "Root Canal Treatment",
  },
  {
    emoji: "📐",
    problem: "Crooked teeth",
    treatment: "Clear Aligners",
    answer: "Clear, almost invisible trays slowly move your teeth into a straight line.",
    image: "/images/clear-aligners-1.jpg",
    href: "/services/clear-aligners",
    bookingService: "Clear Aligner Treatments",
  },
  {
    emoji: "🌫️",
    problem: "Dull, tired skin",
    treatment: "Exosomes Therapy",
    answer: "Helps your skin repair itself, so it looks brighter, smoother and fresh.",
    image: "/images/exosome-therapy-2.jpg",
    href: "/services/exosomes-therapy",
    bookingService: "Exosomes Therapy",
  },
  {
    emoji: "💋",
    problem: "Thin lips",
    treatment: "Lip Fillers",
    answer: "A soft gel adds natural shape and fullness. You see the change the same day.",
    image: "/images/fillers-2.jpg",
    href: "/services/dermal-fillers",
    bookingService: "Fillers: Face, Lips, Hair, Body",
  },
  {
    emoji: "🔴",
    problem: "Acne or acne marks",
    treatment: "Acne & Scar Treatment",
    answer: "We calm active acne and fade the marks it leaves behind, step by step.",
    image: "/images/acne-acne-scars-treatment-1.jpg",
    href: "/services/acne-scars-treatment",
    bookingService: "Acne and Acne Scars Treatments",
  },
  {
    emoji: "🎉",
    problem: "Event coming up",
    treatment: "Red Carpet Facial",
    answer: "Our glow facial with no downtime. Walk out ready for your big day.",
    image: "/images/red-carpet-treatment-2.jpg",
    href: "/services/red-carpet-facial",
    bookingService: "Red Carpet Facial",
  },
];

export default function TreatmentFinder() {
  const [selected, setSelected] = useState(0);
  const c = concerns[selected];
  const resultRef = useRef<HTMLDivElement>(null);

  const pick = (i: number) => {
    setSelected(i);
    const gtag = (window as any).gtag;
    if (typeof gtag === "function") gtag("event", "treatment_finder", { concern: concerns[i].problem });
    // On phones the answer sits below the buttons, so bring it into view
    setTimeout(() => {
      const el = resultRef.current;
      if (el && el.getBoundingClientRect().top > window.innerHeight * 0.55) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 60);
  };

  const book = () => {
    trackInitiateBooking(`Treatment Finder - ${c.treatment}`);
    window.dispatchEvent(new CustomEvent("open-booking", { detail: { service: c.bookingService } }));
  };

  const whatsappUrl = `https://wa.me/${CLINIC_WHATSAPP}?text=${encodeURIComponent(
    `Hello Beverly Hills Clinic, I have ${c.problem.toLowerCase()}. Can you help?`
  )}`;

  return (
    <section id="find-your-treatment" className="py-16 sm:py-24 bg-[#2d221f] text-[#f6ede7] scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c39f75]">Find your treatment</span>
          <h2 className="font-heading text-[2.1rem] sm:text-5xl leading-[1.1]">
            What is <span className="italic text-[#e8ceb1]">bothering</span> you?
          </h2>
          <p className="text-sm text-[#f6ede7]/65">Tap your problem. We will show you the answer.</p>
        </div>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2.5" role="tablist">
          {concerns.map((item, i) => (
            <button
              key={item.problem}
              type="button"
              role="tab"
              aria-selected={selected === i}
              onClick={() => pick(i)}
              className={`flex items-center gap-2.5 text-left rounded-2xl px-3.5 py-3 border transition-colors cursor-pointer ${
                selected === i
                  ? "bg-[#c39f75] border-[#c39f75] text-[#1c1412]"
                  : "bg-white/5 border-white/10 text-[#f6ede7] hover:bg-white/10"
              }`}
            >
              <span className="text-xl" aria-hidden="true">{item.emoji}</span>
              <span className="text-[13px] font-semibold leading-tight">{item.problem}</span>
            </button>
          ))}
        </div>

        <div
          ref={resultRef}
          key={c.problem}
          className="mt-6 bg-[#f6ede7] text-[#1c1412] rounded-[28px] overflow-hidden grid md:grid-cols-2 animate-in fade-in duration-300"
          aria-live="polite"
        >
          <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[340px]">
            <Image src={c.image} alt={`${c.treatment} at Beverly Hills Clinic Karachi`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </div>
          <div className="p-6 sm:p-8 flex flex-col justify-center space-y-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#ab7f51]">We recommend</p>
            <h3 className="font-heading text-3xl sm:text-4xl leading-tight">{c.treatment}</h3>
            <p className="text-[15px] text-[#1c1412]/75 leading-relaxed">{c.answer}</p>
            <div className="space-y-2.5 pt-1">
              <button
                type="button"
                onClick={book}
                className="w-full bg-[#1c1412] hover:bg-[#2d221f] text-[#f6ede7] font-semibold text-sm uppercase tracking-[0.15em] py-4 rounded-full flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#c39f75]" />
                Book {c.treatment}
              </button>
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackContact(`Treatment Finder WhatsApp - ${c.treatment}`)}
                  className="border border-[#25D366] text-[#128C7E] font-semibold text-xs uppercase tracking-wider py-3 rounded-full flex items-center justify-center"
                >
                  Ask on WhatsApp
                </a>
                <Link
                  href={c.href}
                  className="border border-[#1c1412]/20 font-semibold text-xs uppercase tracking-wider py-3 rounded-full flex items-center justify-center gap-1.5"
                >
                  Learn more <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <p className="text-center text-[11px] text-[#f6ede7]/45 mt-4">
          Your doctor confirms the right treatment for you at your consultation.
        </p>
      </div>
    </section>
  );
}
