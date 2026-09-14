"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { ServiceFAQ as ServiceFAQType } from "@/data/services";

interface ServiceFAQProps {
  faqs: ServiceFAQType[];
  serviceTitle: string;
}

export default function ServiceFAQ({ faqs, serviceTitle }: ServiceFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <>
      {/* FAQ JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="py-16 sm:py-24 bg-[#faf6f3] border-b border-brand-secondary/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-4 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-accent flex items-center justify-center space-x-1.5">
              <HelpCircle className="w-4 h-4" />
              <span>Frequently Asked Questions</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-normal text-brand-text">
              Questions About {serviceTitle}
            </h2>
            <div className="w-12 h-1 bg-brand-accent/40 mx-auto rounded-full" />
            <p className="text-sm text-brand-text/75 font-light">
              Get answers to common queries regarding procedure details, safety, and results.
            </p>
          </div>

          {/* Accordions */}
          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-brand-secondary/40 rounded-2xl overflow-hidden shadow-2xs transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none hover:bg-brand-secondary/10 transition-colors cursor-pointer"
                  >
                    <span className="text-base sm:text-lg font-bold font-heading text-brand-text pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-brand-accent transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="border-t border-brand-secondary/20 p-5 sm:p-6 bg-brand-primary/10 text-sm sm:text-base text-brand-text/80 leading-relaxed font-light animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
