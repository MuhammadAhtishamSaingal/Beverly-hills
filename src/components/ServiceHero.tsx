"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Home } from "lucide-react";
import { ServiceData } from "@/data/services";
import { trackViewContent } from "@/lib/metaPixel";

interface ServiceHeroProps {
  service: ServiceData;
}

export default function ServiceHero({ service }: ServiceHeroProps) {
  useEffect(() => {
    trackViewContent({
      title: service.title,
      category: service.category === "aesthetics" ? "Aesthetic Treatment" : "Dental Service",
    });
  }, [service]);
  // Fallback image in case specific webp asset is loading
  const heroImageSrc = service.heroImage || "/images/DESKTOP1_MARQE_1200.webp";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.beverlyhills.clinic"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://www.beverlyhills.clinic/services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": service.categoryName,
        "item": `https://www.beverlyhills.clinic/services#${service.category}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": service.title,
        "item": `https://www.beverlyhills.clinic/services/${service.slug}`
      }
    ]
  };

  return (
    <>
      {/* Breadcrumb JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero Container */}
      <section className="relative w-full min-h-[440px] sm:min-h-[480px] md:min-h-[520px] flex flex-col justify-between pt-48 sm:pt-44 md:pt-40 pb-12 sm:pb-16 md:pb-20 bg-[#2d221f] text-[#f6ede7] overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImageSrc}
            alt={`${service.title} treatment at Beverly Hills Clinic Karachi`}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center max-w-full"
          />
          {/* Dark Overlay matching reference design */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1c1412]/92 via-[#2d221f]/80 to-[#1c1412]/88 backdrop-blur-[2px]" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-between h-full flex-grow">
          {/* Breadcrumb Navigation Bar */}
          <nav className="w-full flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-[#e8ceb1]/90 mb-6 sm:mb-8 py-1 max-w-full">
            <Link
              href="/"
              className="flex items-center hover:text-white transition-colors space-x-1"
            >
              <Home className="w-3.5 h-3.5 shrink-0" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#ab7f51]/70 shrink-0" />
            <Link
              href="/services"
              className="hover:text-white transition-colors"
            >
              Services
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#ab7f51]/70 shrink-0" />
            <span className="text-[#e8ceb1]/70 font-medium">
              {service.categoryName}
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-[#ab7f51]/70 shrink-0" />
            <span className="font-semibold text-white truncate max-w-[180px] sm:max-w-none">
              {service.title}
            </span>
          </nav>

          {/* Service Title */}
          <div className="my-auto py-4 sm:py-6 space-y-3 sm:space-y-4 max-w-3xl">
            <span className="inline-block px-3.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-widest bg-[#c39f75]/25 text-[#e8ceb1] border border-[#c39f75]/40 backdrop-blur-xs">
              {service.categoryName}
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-normal text-white tracking-wide leading-tight break-words max-w-full">
              {service.title}
            </h1>
            <div className="w-16 sm:w-20 h-1 bg-[#c39f75] rounded-full" />
          </div>
        </div>
      </section>
    </>
  );
}
