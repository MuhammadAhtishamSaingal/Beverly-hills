"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Sparkles,
  ShieldCheck,
  Award,
  ChevronRight,
  HeartHandshake,
  Cpu,
  Smile,
  Zap,
} from "lucide-react";
import { trackViewContent, trackInitiateBooking } from "@/lib/metaPixel";

export default function ClinicTourClient() {
  useEffect(() => {
    trackViewContent({ title: "Clinic Tour", category: "Clinic Information" });
  }, []);

  const handleOpenBooking = () => {
    trackInitiateBooking("Clinic Tour CTA");
    window.dispatchEvent(new CustomEvent("open-booking"));
  };

  const galleryImages = [
    {
      src: "/images/space1.webp",
      alt: "Beverly Hills Clinic DHA Karachi Reception & Waiting Lounge",
      title: "Reception & Luxury Lounge",
      category: "Patient Comfort",
      span: "col-span-1 md:col-span-2 row-span-2",
    },
    {
      src: "/images/space2.webp",
      alt: "Modern Dental & Aesthetic Consultation Room at Beverly Hills Clinic",
      title: "Private Specialist Consultation Suite",
      category: "Consultation",
      span: "col-span-1 md:col-span-1 row-span-1",
    },
    {
      src: "/images/space3.webp",
      alt: "Advanced Dental Operating Suite with Ergonomic Chairs",
      title: "Advanced Operating Bay",
      category: "Dental Surgery",
      span: "col-span-1 md:col-span-1 row-span-1",
    },
    {
      src: "/images/space4.webp",
      alt: "Luxury Patient Care Corridor and Sterilization Suite",
      title: "Sterilization & Diagnostics Suite",
      category: "Clinical Safety",
      span: "col-span-1 md:col-span-2 row-span-1",
    },
    {
      src: "/images/hero-studio.webp",
      alt: "Beverly Hills Clinic Main Clinical Facility Interior",
      title: "Main Clinical Facility",
      category: "Interior Design",
      span: "col-span-1 md:col-span-1 row-span-1",
    },
    {
      src: "/images/studio-hallway.webp",
      alt: "Sterile Clinical Hallway and Digital Diagnostics Area",
      title: "Clinical Corridor",
      category: "Facility",
      span: "col-span-1 md:col-span-1 row-span-1",
    },
    {
      src: "/images/studio-sf.webp",
      alt: "Aesthetic Treatment Bay with Modern Lasers in DHA Karachi",
      title: "Laser Aesthetic Treatment Suite",
      category: "Aesthetic Care",
      span: "col-span-1 md:col-span-2 row-span-1",
    },
    {
      src: "/images/DESKTOP1_MARQE_1200.webp",
      alt: "Beverly Hills Clinic 3D Imaging & Digital Scanner Setup",
      title: "3D CBCT Digital Diagnostics Lab",
      category: "Technology",
      span: "col-span-1 md:col-span-2 row-span-1",
    },
  ];

  const techFeatures = [
    {
      icon: Cpu,
      title: "Advanced Digital Dentistry",
      desc: "High-definition 3D CBCT scanners and intraoral digital cameras provide ultra-precise 3D diagnostics with micro-millimeter precision, eliminating messy traditional impression molds.",
    },
    {
      icon: Smile,
      title: "Unmatched Patient Comfort",
      desc: "Designed to relieve dental anxiety, our luxury private suites feature painless gentle numbing, ergonomic memory foam chairs, noise-canceling headphones, and relaxing tea lounges.",
    },
    {
      icon: ShieldCheck,
      title: "Hospital-Grade Sterilization",
      desc: "We follow strict international clinical sterilization protocols using medical Class-B autoclaves, sterile disposable packs, and continuous air purification systems.",
    },
    {
      icon: Award,
      title: "Expert Specialist Care",
      desc: "Our UK and US-trained dental surgeons and aesthetic physicians curate personalized, multi-disciplinary treatment plans in a soothing, private atmosphere.",
    },
  ];

  const trustPoints = [
    {
      icon: HeartHandshake,
      title: "Patient-Centered Experience",
      desc: "Every appointment is structured around one patient at a time, ensuring zero rush and complete clinical attention.",
    },
    {
      icon: Sparkles,
      title: "Bespoke Aesthetic Standards",
      desc: "Bringing Beverly Hills clinical protocols and natural cosmetic refinement to DHA Karachi.",
    },
    {
      icon: Zap,
      title: "Minimal Downtime Procedures",
      desc: "Utilizing atraumatic surgical techniques and gentle laser energy to accelerate natural healing.",
    },
  ];

  return (
    <div className="flex flex-col w-full bg-[#2d221f] text-[#f6ede7]">
      {/* 1. Hero Banner */}
      <section className="relative w-full min-h-[520px] md:min-h-[600px] pt-32 pb-20 md:pt-48 md:pb-28 flex items-center justify-center overflow-hidden border-b border-[#3e322e]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-studio.webp"
            alt="Beverly Hills Clinic DHA Karachi Interior"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2d221f] via-[#2d221f]/85 to-[#2d221f]/60 z-10" />
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center justify-center space-x-2 text-xs font-medium text-[#e8ceb1]/80 tracking-wider uppercase">
            <Link href="/" className="hover:text-[#f6ede7] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#ab7f51]" />
            <span className="text-[#ab7f51] font-semibold">Clinic Tour</span>
          </nav>

          <span className="text-xs font-bold uppercase tracking-widest text-[#ab7f51] block">
            LUXURY CLINICAL ENVIRONMENT
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#f6ede7] leading-tight max-w-4xl mx-auto">
            Explore Beverly Hills Clinic Through Our Clinic Tour
          </h1>

          <div className="w-16 h-[2px] bg-[#ab7f51]/60 mx-auto rounded-full" />

          <p className="text-sm sm:text-base text-[#f6ede7]/85 max-w-2xl mx-auto leading-relaxed font-light">
            Experience our modern dental and aesthetic facility in DHA Karachi, designed with advanced technology, patient comfort, and international clinical standards.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleOpenBooking}
              className="bg-gradient-to-r from-[#ab7f51] to-[#e8ceb1] text-[#2d221f] text-xs font-semibold py-3.5 px-8 rounded-full shadow-lg hover:brightness-110 active:scale-[0.99] transition-all duration-300 flex items-center space-x-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Your Private Tour & Consultation</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Masonry / Grid Gallery Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#ab7f51]">
            FACILITY GALLERY
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#f6ede7]">
            Inside Our DHA Karachi Studio
          </h2>
          <p className="text-xs sm:text-sm text-[#f6ede7]/75 font-light">
            Take a visual tour of our state-of-the-art treatment suites, sterile operating bays, and calming patient lounge.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 auto-rows-[240px]">
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl overflow-hidden group border border-[#3e322e] shadow-md transition-all duration-300 hover:border-[#ab7f51]/60 ${img.span}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="lazy"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2d221f]/90 via-[#2d221f]/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 right-4 z-10 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#ab7f51]">
                  {img.category}
                </span>
                <h3 className="text-sm font-semibold text-[#f6ede7] font-serif group-hover:text-[#e8ceb1] transition-colors">
                  {img.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Advanced Technology & Patient Care */}
      <section className="py-20 bg-[#241a18] border-y border-[#3e322e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ab7f51]">
              CLINICAL INNOVATION
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#f6ede7]">
              Advanced Technology & Patient Care
            </h2>
            <p className="text-xs sm:text-sm text-[#f6ede7]/75 font-light">
              We combine world-class diagnostic equipment with luxury hospitality to make every visit painless and transparent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {techFeatures.map((tech, idx) => {
              const IconComponent = tech.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#2d221f] border border-[#3e322e] hover:border-[#ab7f51]/50 p-6 rounded-2xl space-y-4 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#ab7f51]/15 border border-[#ab7f51]/30 flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-[#e8ceb1]" />
                  </div>
                  <h3 className="text-base font-semibold text-[#e8ceb1] font-serif">
                    {tech.title}
                  </h3>
                  <p className="text-xs text-[#f6ede7]/75 leading-relaxed font-light">
                    {tech.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Why Choose Our Clinic Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-gradient-to-br from-[#3e322e]/40 via-[#2d221f] to-[#3e322e]/30 border border-[#ab7f51]/30 rounded-3xl p-8 sm:p-12 shadow-xl">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ab7f51]">
              EXCELLENCE IN CARE
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#f6ede7]">
              Why Choose Beverly Hills Clinic Karachi?
            </h2>
            <p className="text-xs sm:text-sm text-[#f6ede7]/80 font-light">
              Elevating clinical dentistry and aesthetic medicine with uncompromised ethics, precision, and safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustPoints.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-[#ab7f51]/20 border border-[#ab7f51]/40 flex items-center justify-center shrink-0 mt-1">
                    <IconComp className="w-5 h-5 text-[#e8ceb1]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-[#e8ceb1] font-serif">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#f6ede7]/75 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Booking CTA Section */}
      <section className="py-16 bg-[#241a18] border-t border-[#3e322e] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#ab7f51]">
            READY TO VISIT US?
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#f6ede7]">
            Schedule Your Consultation Today
          </h2>
          <p className="text-xs sm:text-sm text-[#f6ede7]/80 leading-relaxed font-light max-w-xl mx-auto">
            Experience our DHA Karachi clinic firsthand. Book a private consultation with our specialists in a comfortable, pressure-free environment.
          </p>
          <div className="pt-2">
            <button
              onClick={handleOpenBooking}
              className="bg-gradient-to-r from-[#ab7f51] to-[#e8ceb1] text-[#2d221f] text-xs font-semibold py-3.5 px-8 rounded-full shadow-lg hover:brightness-110 active:scale-[0.99] transition-all duration-300 inline-flex items-center space-x-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Consultation</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
