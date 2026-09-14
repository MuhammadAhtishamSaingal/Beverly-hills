"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { ServiceData } from "@/data/services";

interface RelatedServicesProps {
  relatedServices: ServiceData[];
}

export default function RelatedServices({ relatedServices }: RelatedServicesProps) {
  if (!relatedServices || relatedServices.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 bg-brand-primary border-b border-brand-secondary/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-accent flex items-center justify-center space-x-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Complementary Treatments</span>
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-normal text-brand-text">
            Related Procedures & Aesthetic Care
          </h2>
          <div className="w-12 h-1 bg-brand-accent/40 mx-auto rounded-full" />
          <p className="text-sm text-brand-text/75 font-light">
            Explore related treatments commonly combined to achieve complete oral health and aesthetic balance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedServices.map((srv) => (
            <div
              key={srv.slug}
              className="bg-white border border-brand-secondary/40 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="relative h-44 w-full bg-brand-secondary/20 overflow-hidden">
                <Image
                  src={srv.heroImage || "/images/DESKTOP1_MARQE_1200.webp"}
                  alt={`${srv.title} at Beverly Hills Clinic Karachi`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-brand-primary/90 backdrop-blur-xs text-brand-accent text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-brand-secondary/40">
                  {srv.category === "dentistry" ? "Dental" : "Aesthetic"}
                </div>
              </div>

              <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold font-heading text-brand-text group-hover:text-brand-accent transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-brand-text/70 line-clamp-2 leading-relaxed font-light">
                    {srv.introText}
                  </p>
                </div>

                <Link
                  href={`/services/${srv.slug}`}
                  className="btn-secondary w-full py-2.5 px-4 text-xs font-semibold flex items-center justify-center space-x-1.5 group-hover:!bg-brand-accent group-hover:!text-white transition-all"
                >
                  <span className="transition-colors group-hover:!text-white">Explore Treatment</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-colors group-hover:!text-white" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
