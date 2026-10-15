"use client";

import Link from "next/link";
import { Calendar, Check } from "lucide-react";
import { trackInitiateBooking } from "@/lib/metaPixel";
import { CLINIC_WHATSAPP } from "@/data/locations";

const steps = [
  { day: "Visit 1", title: "Consultation & smile design", text: "We study your face, teeth and bite, and plan the shape, shade and length of your new smile with you." },
  { day: "Visit 2", title: "Preparation & trial smile", text: "Your teeth are prepared and you leave with a temporary smile while your veneers are crafted." },
  { day: "Visit 3", title: "Your new smile", text: "Your final veneers are fitted, polished and checked, all within about 10 days of starting." },
];

const veneers = [
  {
    name: "E-max Veneers",
    badge: "Most natural",
    points: [
      "Ultra-thin porcelain with natural translucency",
      "Reflects light like a real tooth",
      "Stain resistant, ideal for front teeth",
    ],
  },
  {
    name: "Zirconia Veneers & Crowns",
    badge: "Strongest",
    points: [
      "Exceptionally strong and long lasting",
      "Covers dark or heavily stained teeth",
      "Great for strong bites and back teeth",
    ],
  },
];

const whatsappUrl = `https://wa.me/${CLINIC_WHATSAPP}?text=${encodeURIComponent(
  "Hello Beverly Hills Clinic, I am interested in a smile makeover."
)}`;

export default function SmileMakeoverSpotlight() {
  const book = () => {
    trackInitiateBooking("Smile Makeover Spotlight");
    window.dispatchEvent(new CustomEvent("open-booking", { detail: { service: "Hollywood Smile Makeover" } }));
  };

  return (
    <section className="py-16 sm:py-24 bg-[#2d221f] text-[#f6ede7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#c39f75]">Smile Makeover Experts</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading leading-tight">
            Your new smile in <span className="text-[#e8ceb1] italic">about 10 days</span>, in just 3 visits
          </h2>
          <p className="text-sm sm:text-base text-[#f6ede7]/75 leading-relaxed">
            Smile makeovers are what we are known for. Every smile is designed around your face, so the result looks
            natural, bright and balanced, never fake.
          </p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {steps.map((s, i) => (
            <li key={s.day} className="relative bg-white/5 border border-[#c39f75]/25 rounded-2xl p-6">
              <span className="absolute -top-3 left-6 bg-[#c39f75] text-[#2d221f] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                {s.day}
              </span>
              <span className="text-4xl font-heading text-[#c39f75]/40">0{i + 1}</span>
              <h3 className="text-lg font-heading mt-1">{s.title}</h3>
              <p className="text-sm text-[#f6ede7]/70 leading-relaxed mt-2">{s.text}</p>
            </li>
          ))}
        </ol>

        <div className="space-y-5">
          <h3 className="text-2xl font-heading">Choose your veneers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {veneers.map((v) => (
              <div key={v.name} className="bg-[#f6ede7] text-brand-text rounded-2xl p-6">
                <div className="flex items-center justify-between gap-3">
                  <h4 className="text-xl font-heading">{v.name}</h4>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#ab7f51] text-white px-3 py-1 rounded-full">
                    {v.badge}
                  </span>
                </div>
                <ul className="mt-4 space-y-2">
                  {v.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-brand-text/80">
                      <Check className="w-4 h-4 text-[#ab7f51] mt-0.5 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#f6ede7]/55">
            Not sure which is right for you? Your dentist will recommend the best option at your consultation. Timelines and
            results vary from patient to patient.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={book}
            className="bg-[#c39f75] hover:bg-[#b08b62] text-[#2d221f] font-semibold text-sm uppercase tracking-wider py-4 px-8 rounded-full flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            Book Smile Consultation
          </button>
          <a
            id="smile-spotlight-whatsapp"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 font-semibold text-sm uppercase tracking-wider py-4 px-8 rounded-full flex items-center justify-center gap-2"
          >
            Ask on WhatsApp
          </a>
          <Link
            href="/services/hollywood-smile-makeover"
            className="text-sm font-semibold text-[#e8ceb1] hover:underline flex items-center justify-center sm:justify-start px-2 py-4"
          >
            Learn more about smile makeovers →
          </Link>
        </div>
      </div>
    </section>
  );
}
