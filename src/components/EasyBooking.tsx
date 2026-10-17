"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Calendar, MessageCircle, Smile } from "lucide-react";
import { trackInitiateBooking } from "@/lib/metaPixel";
import { CONSULTATION_FEE } from "@/data/locations";

const steps = [
  { icon: Calendar, title: "Book", text: "Tap Book Now, call or WhatsApp. It takes 1 minute." },
  { icon: MessageCircle, title: "We confirm", text: "Our team calls or WhatsApps you to confirm your time." },
  { icon: Smile, title: "Meet your doctor", text: "Get a clear plan and price before anything starts." },
];

const faqs = [
  {
    q: "How much is a consultation?",
    a: `${CONSULTATION_FEE}. Your doctor checks you and gives you a clear plan and price for your treatment.`,
  },
  {
    q: "How long does a smile makeover take?",
    a: "Usually 3 visits in about 10 days. Your dentist confirms your exact time at the consultation.",
  },
  {
    q: "Does it hurt?",
    a: "Most treatments are comfortable. We use numbing where needed and explain every step before we start.",
  },
  {
    q: "Where are your clinics?",
    a: "We have two clinics in Karachi: DHA Phase 5 and Bahadurabad. You can also start with an online consultation.",
  },
  {
    q: "Do you do skin and face treatments too?",
    a: "Yes. Exosomes, lip fillers, facials, laser, peels, HIFU and more, all in the same clinic.",
  },
  {
    q: "Can I change my appointment?",
    a: "Yes. Just tell us at least 24 hours before, so we can give your time to another patient.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function EasyBooking() {
  const [open, setOpen] = useState<number | null>(0);

  const book = () => {
    trackInitiateBooking("Easy Booking Steps");
    window.dispatchEvent(new CustomEvent("open-booking"));
  };

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-[#f6ede7] text-[#1c1412]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#ab7f51]">Easy as 1, 2, 3</span>
            <h2 className="font-heading text-[2.1rem] sm:text-5xl leading-[1.1]">
              How to <span className="italic text-[#ab7f51]">get started</span>
            </h2>
          </div>
          <ol className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <li key={s.title} className="flex sm:flex-col items-center sm:text-center gap-4 bg-white rounded-3xl border border-[#e8ceb1] p-5 sm:p-7">
                  <span className="relative shrink-0 w-14 h-14 rounded-full bg-[#1c1412] text-[#e8ceb1] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                    <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#c39f75] text-[#1c1412] text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                  </span>
                  <div>
                    <p className="font-heading text-xl">{s.title}</p>
                    <p className="text-[13px] text-[#1c1412]/70 leading-relaxed mt-0.5">{s.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={book}
              className="w-full sm:w-auto bg-[#1c1412] hover:bg-[#2d221f] text-[#f6ede7] font-semibold text-sm uppercase tracking-[0.15em] py-4 px-10 rounded-full flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#c39f75]" />
              Start with step 1
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="font-heading text-3xl sm:text-4xl text-center">Questions people ask</h3>
          <div className="divide-y divide-[#e8ceb1] bg-white rounded-3xl border border-[#e8ceb1] overflow-hidden">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 text-left px-5 sm:px-7 py-[18px] cursor-pointer"
                  >
                    <span className="text-[15px] font-semibold">{f.q}</span>
                    <ChevronDown className={`w-5 h-5 shrink-0 text-[#ab7f51] transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && <p className="px-5 sm:px-7 pb-5 -mt-1 text-sm text-[#1c1412]/75 leading-relaxed">{f.a}</p>}
                </div>
              );
            })}
          </div>
          <p className="text-center text-sm">
            <Link href="/patients" className="font-semibold text-[#ab7f51] hover:underline">
              More answers in our Patient Guide &rarr;
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
