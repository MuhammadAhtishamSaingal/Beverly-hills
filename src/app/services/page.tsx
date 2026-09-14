"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, ShieldCheck, Calendar, Phone, ArrowRight, Clock } from "lucide-react";
import { getServicesByCategory, ServiceData } from "@/data/services";
import { trackInitiateBooking, trackContact } from "@/lib/metaPixel";

export default function ServicesListingPage() {
  const [activeTab, setActiveTab] = useState<"all" | "dentistry" | "aesthetics">("all");
  const dentalServices = getServicesByCategory("dentistry");
  const aestheticServices = getServicesByCategory("aesthetics");

  const triggerBookingForService = (serviceTitle: string) => {
    trackInitiateBooking(serviceTitle);
    window.dispatchEvent(
      new CustomEvent("open-booking", {
        detail: { service: serviceTitle }
      })
    );
  };

  const renderServiceCard = (service: ServiceData) => (
    <div
      key={service.slug}
      id={service.slug}
      className="bg-white border border-brand-secondary/40 rounded-2xl overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
    >
      {/* Card Image */}
      <div className="relative h-48 sm:h-52 w-full bg-brand-secondary/20 overflow-hidden">
        <Image
          src={service.heroImage || "/images/DESKTOP1_MARQE_1200.webp"}
          alt={`${service.title} at Beverly Hills Clinic Karachi`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-brand-primary/90 backdrop-blur-xs text-brand-accent text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-brand-secondary/40">
          {service.category === "dentistry" ? "Dental Care" : "Aesthetics"}
        </div>

        {/* Title overlay on image */}
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <h3 className="text-lg font-serif font-normal drop-shadow-sm group-hover:text-[#e8ceb1] transition-colors">
            {service.title}
          </h3>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex-grow flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <p className="text-xs sm:text-sm text-brand-text/75 line-clamp-3 leading-relaxed font-light">
            {service.introText}
          </p>

          <div className="flex items-center space-x-1.5 text-[11px] text-brand-text/60 font-medium pt-1">
            <Clock className="w-3.5 h-3.5 text-brand-accent flex-shrink-0" />
            <span className="truncate">{service.duration}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 grid grid-cols-2 gap-2">
          <Link
            href={`/services/${service.slug}`}
            className="btn-secondary py-2.5 px-3 text-xs font-semibold flex items-center justify-center space-x-1 text-center truncate"
          >
            <span>View Details</span>
            <ArrowRight className="w-3 h-3 flex-shrink-0" />
          </Link>
          <button
            onClick={() => triggerBookingForService(service.title)}
            className="btn-primary py-2.5 px-3 text-xs font-semibold flex items-center justify-center space-x-1 text-center truncate cursor-pointer"
          >
            <Calendar className="w-3 h-3 flex-shrink-0" />
            <span>Book Care</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col w-full bg-brand-primary min-h-screen">
      {/* 1. Hero Banner */}
      <section className="bg-brand-secondary/20 border-b border-brand-secondary/40 pt-36 pb-16 sm:pt-48 sm:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">
            Beverly Hills Clinic Karachi
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-normal text-brand-text">
            Our Services & Treatments
          </h1>
          <div className="w-16 h-1 bg-brand-accent/40 mx-auto rounded-full" />
          <p className="text-sm sm:text-base text-brand-text/75 max-w-xl mx-auto leading-relaxed font-light">
            Explore our 35 dedicated dental and aesthetic procedures. Each treatment offers personalized clinical care, state-of-the-art technology, and natural results in DHA Karachi.
          </p>

          {/* Filter Category Tabs */}
          <div className="pt-6 flex justify-center space-x-2">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "all"
                  ? "bg-brand-accent text-white shadow-xs"
                  : "bg-white text-brand-text/70 border border-brand-secondary/40 hover:bg-brand-secondary/20"
              }`}
            >
              All Services ({dentalServices.length + aestheticServices.length})
            </button>
            <button
              onClick={() => setActiveTab("dentistry")}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "dentistry"
                  ? "bg-brand-accent text-white shadow-xs"
                  : "bg-white text-brand-text/70 border border-brand-secondary/40 hover:bg-brand-secondary/20"
              }`}
            >
              Dental ({dentalServices.length})
            </button>
            <button
              onClick={() => setActiveTab("aesthetics")}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "aesthetics"
                  ? "bg-brand-accent text-white shadow-xs"
                  : "bg-white text-brand-text/70 border border-brand-secondary/40 hover:bg-brand-secondary/20"
              }`}
            >
              Aesthetics ({aestheticServices.length})
            </button>
          </div>
        </div>
      </section>

      {/* 2. Services Grid Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-20 flex-grow">
        {/* Dental Services Category */}
        {(activeTab === "all" || activeTab === "dentistry") && (
          <section id="dentistry" className="space-y-8">
            <div className="flex items-center space-x-4 border-b border-brand-secondary/40 pb-4">
              <div className="w-10 h-10 rounded-xl bg-brand-secondary/30 flex items-center justify-center text-brand-accent flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-normal text-brand-text">
                  Comprehensive Dental Services
                </h2>
                <p className="text-xs sm:text-sm text-brand-text/60 font-light">
                  Preserving tooth integrity, functional bites, and natural smiles with high-precision restorative care.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {dentalServices.map(renderServiceCard)}
            </div>
          </section>
        )}

        {/* Aesthetic Treatments Category */}
        {(activeTab === "all" || activeTab === "aesthetics") && (
          <section id="aesthetics" className="space-y-8">
            <div className="flex items-center space-x-4 border-b border-brand-secondary/40 pb-4">
              <div className="w-10 h-10 rounded-xl bg-brand-secondary/30 flex items-center justify-center text-brand-accent flex-shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-normal text-brand-text">
                  Advanced Aesthetic Treatments
                </h2>
                <p className="text-xs sm:text-sm text-brand-text/60 font-light">
                  Non-surgical skin resurfacing, facial contouring, and anti-aging treatments using medical-grade laser technology.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {aestheticServices.map(renderServiceCard)}
            </div>
          </section>
        )}
      </div>

      {/* 3. Bottom CTA */}
      <section className="py-16 bg-brand-secondary/30 border-t border-brand-secondary/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-serif font-normal text-brand-text">
            Ready to experience thoughtful care?
          </h2>
          <p className="text-sm text-brand-text/70 max-w-md mx-auto font-light">
            Schedule a consultation at our DHA Karachi clinic today with our expert specialists.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={() => triggerBookingForService("Consultation")}
              className="btn-primary w-full sm:w-auto py-3.5 px-8 text-xs sm:text-sm uppercase font-semibold tracking-wider flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Consultation</span>
            </button>
            <a
              id="services-listing-call-now"
              href="tel:03070984307"
              onClick={() => trackContact("Services Listing Call Clinic")}
              className="meta-track-call btn-secondary w-full sm:w-auto py-3.5 px-8 text-xs sm:text-sm uppercase font-semibold tracking-wider bg-white/60 flex items-center justify-center space-x-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call Clinic</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
