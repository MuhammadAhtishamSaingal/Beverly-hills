"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ServiceData } from "@/data/services";
import { trackInitiateBooking } from "@/lib/metaPixel";

interface ServiceSectionsProps {
  service: ServiceData;
}

export default function ServiceSections({ service }: ServiceSectionsProps) {
  const [imageErrorMap, setImageErrorMap] = useState<Record<number, boolean>>({});

  const triggerBooking = () => {
    trackInitiateBooking(`Service Page Consultation CTA - ${service.title}`);
    window.dispatchEvent(
      new CustomEvent("open-booking", {
        detail: { service: service.title }
      })
    );
  };

  // Fallback image pool from existing site images if custom asset fails to load
  const fallbackImages = [
    "/images/image1.webp",
    "/images/image2.webp",
    "/images/DESKTOP2_MARQE_1200.jpg",
    "/images/DESKTOP3_MARQE_1200.webp",
    "/images/space1.webp"
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#faf6f3] space-y-16 sm:space-y-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        {service.sections.map((sec, idx) => {
          // Alternate section layout: Even index = Text Left / Image Right, Odd index = Image Left / Text Right
          const isReverse = idx % 2 !== 0;
          const imageSrc = imageErrorMap[idx]
            ? fallbackImages[idx % fallbackImages.length]
            : sec.image;

          return (
            <div
              key={idx}
              className={`flex flex-col ${
                isReverse ? "lg:flex-row-reverse" : "lg:flex-row"
              } items-center gap-10 lg:gap-16 bg-white border border-brand-secondary/40 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xs hover:shadow-md transition-shadow duration-300`}
            >
              {/* Text Side */}
              <div className="w-full lg:w-1/2 space-y-5">
                <div className="flex items-center space-x-2">
                  <span className="w-8 h-[2px] bg-brand-accent" />
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">
                    Section {idx + 1}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-normal text-brand-text leading-snug">
                  {sec.title}
                </h3>

                <div className="space-y-4 text-sm sm:text-base text-brand-text/75 leading-relaxed font-light">
                  {sec.content.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>

                <div className="pt-3">
                  <button
                    onClick={triggerBooking}
                    className="btn-primary py-3 px-6 text-xs font-semibold tracking-wider uppercase inline-flex items-center space-x-2 shadow-xs hover:scale-102 transition-transform cursor-pointer"
                  >
                    <span>Book Consultation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Image Side */}
              <div className="w-full lg:w-1/2">
                <div className="relative w-full h-[260px] sm:h-[360px] md:h-[400px] rounded-2xl overflow-hidden shadow-md border border-brand-secondary/30 bg-brand-secondary/20">
                  <Image
                    src={sec.image}
                    alt={sec.imageAlt || `${sec.title} at Beverly Hills Clinic Karachi`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
