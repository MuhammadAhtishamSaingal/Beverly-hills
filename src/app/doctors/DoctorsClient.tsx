"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Award,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Stethoscope,
} from "lucide-react";
import { trackPageView, trackViewContent, trackInitiateBooking } from "@/utils/pixel";

export default function DoctorsClient() {
  useEffect(() => {
    trackPageView("doctors");
    trackViewContent({ title: "Doctors", category: "Clinic Information" });
  }, []);

  const handleOpenBooking = (doctorName?: string) => {
    trackInitiateBooking(doctorName ? `Doctor Consultation - ${doctorName}` : "Doctors Page CTA");
    window.dispatchEvent(new CustomEvent("open-booking"));
  };

  const doctorsList = [
    {
      id: "dr-implantologist",
      name: "Senior Consultant Dentist & Implantologist",
      title: "Consultant Dental Surgeon",
      specialization: "Cosmetic Dentistry & Dental Implants",
      experience: "12+ Years Clinical Experience",
      image: "/images/people-team.webp",
      bio: "Specializing in 3D CBCT guided dental implants, full-mouth oral rehabilitation, and custom porcelain veneers. Committed to gentle, painless restorative procedures that reconstruct natural tooth architecture.",
      expertise: [
        "3D Guided Dental Implants",
        "Hollywood Smile Porcelain Veneers",
        "Full Mouth Rehabilitation",
        "Atraumatic Tooth Extraction",
      ],
      education: "US & UK Clinical Training Certification",
    },
    {
      id: "dr-aesthetician",
      name: "Consultant Facial Aesthetic Physician",
      title: "Aesthetic Medicine Specialist",
      specialization: "Non-Surgical Aesthetics & Laser Dermatology",
      experience: "10+ Years Clinical Experience",
      image: "/images/hero-studio.webp",
      bio: "Expert in physician-led non-surgical facial rejuvenation, medical lasers, and advanced bio-regeneration. Focuses on subtle, harmonious enhancements tailored to South Asian skin types.",
      expertise: [
        "CO2 Fractional Laser Resurfacing",
        "HIFU Ultraformer III Face Lifting",
        "Full Face Botox & Dermal Fillers",
        "Polynucleotides & Exosomes Therapy",
      ],
      education: "Certified Fellow in Aesthetic Medicine",
    },
    {
      id: "dr-orthodontist",
      name: "Consultant Orthodontist & Aligner Specialist",
      title: "Specialist Orthodontist",
      specialization: "Clear Aligners & Precision Orthodontics",
      experience: "11+ Years Clinical Experience",
      image: "/images/space2.webp",
      bio: "Dedicated to correcting complex malocclusions, crowded teeth, and bite disharmonies using invisible clear aligners and modern ceramic braces for patients of all ages.",
      expertise: [
        "Custom Clear Aligner Systems",
        "Aesthetic Ceramic & Metal Braces",
        "Interceptive Orthodontics",
        "Retainer & Bite Stabilization",
      ],
      education: "Postgraduate Degree in Orthodontics",
    },
    {
      id: "dr-endodontist",
      name: "Consultant Endodontist & Restorative Specialist",
      title: "Specialist Endodontist",
      specialization: "Microscopic Root Canal & Tooth Preservation",
      experience: "9+ Years Clinical Experience",
      image: "/images/space3.webp",
      bio: "Focuses on saving natural teeth through painless, micro-endodontic root canal treatments under magnification. Ensures maximum tooth retention and comfortable healing.",
      expertise: [
        "Microscopic Root Canal Therapy",
        "Single-Visit Endodontic Treatment",
        "Aesthetic Composite Restorations",
        "Gum Depigmentation & Laser Care",
      ],
      education: "Micro-Endodontic Clinical Specialist",
    },
  ];

  const trustPillars = [
    {
      icon: Stethoscope,
      title: "Experienced Medical Specialists",
      desc: "Our doctors are certified dental surgeons and aesthetic physicians with extensive international training and clinical precision.",
    },
    {
      icon: ShieldCheck,
      title: "Uncompromising Patient Safety",
      desc: "We enforce hospital-grade infection control protocols, medical Class-B autoclaves, and sterile procedure setups for every appointment.",
    },
    {
      icon: Sparkles,
      title: "Advanced 3D Technology",
      desc: "Equipped with 3D CBCT digital imaging, intraoral scanners, and medical lasers to deliver micro-precise, predictable treatment outcomes.",
    },
    {
      icon: Award,
      title: "Personalized Treatment Plans",
      desc: "We reject generic approaches. Every procedure is customized according to your facial anatomical proportions and personal goals.",
    },
  ];

  return (
    <div className="flex flex-col w-full bg-[#2d221f] text-[#f6ede7]">
      {/* 1. Hero Banner */}
      <section className="relative w-full min-h-[520px] md:min-h-[600px] pt-32 pb-20 md:pt-48 md:pb-28 flex items-center justify-center overflow-hidden border-b border-[#3e322e]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/patient_ banner.webp"
            alt="Beverly Hills Clinic Doctors and Specialists Background"
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
            <span className="text-[#ab7f51] font-semibold">Doctors</span>
          </nav>

          <span className="text-xs font-bold uppercase tracking-widest text-[#ab7f51] block">
            MEDICAL SPECIALISTS & CONSULTANTS
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#f6ede7] leading-tight max-w-4xl mx-auto">
            Meet Our Dental & Aesthetic Specialists
          </h1>

          <div className="w-16 h-[2px] bg-[#ab7f51]/60 mx-auto rounded-full" />

          <p className="text-sm sm:text-base text-[#f6ede7]/85 max-w-2xl mx-auto leading-relaxed font-light">
            Our experienced specialists provide advanced dental and aesthetic treatments using modern techniques and patient-focused care in DHA Karachi.
          </p>

          <div className="pt-4 flex items-center justify-center">
            <button
              onClick={() => handleOpenBooking()}
              className="bg-gradient-to-r from-[#ab7f51] to-[#e8ceb1] text-[#2d221f] text-xs font-semibold py-3.5 px-8 rounded-full shadow-lg hover:brightness-110 active:scale-[0.99] transition-all duration-300 flex items-center space-x-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment With A Specialist</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Doctors Grid Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#ab7f51]">
            OUR CLINICAL TEAM
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#f6ede7]">
            Dedicated Clinical Experts
          </h2>
          <p className="text-xs sm:text-sm text-[#f6ede7]/75 font-light">
            Each member of our clinical team brings specialized expertise, international standards, and a gentle patient-first approach.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {doctorsList.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-[#241a18] border border-[#3e322e] hover:border-[#ab7f51]/60 rounded-3xl overflow-hidden shadow-lg flex flex-col md:flex-row transition-all duration-300 group"
            >
              {/* Doctor Photo */}
              <div className="relative w-full md:w-2/5 h-64 md:h-auto shrink-0 overflow-hidden bg-[#2d221f]">
                <Image
                  src={doctor.image}
                  alt={`Beverly Hills Clinic ${doctor.name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  loading="lazy"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#241a18] via-transparent to-transparent md:hidden" />
              </div>

              {/* Doctor Information */}
              <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#ab7f51] block mb-1">
                      {doctor.specialization}
                    </span>
                    <h3 className="text-xl font-serif font-semibold text-[#e8ceb1]">
                      {doctor.name}
                    </h3>
                    <p className="text-xs text-[#f6ede7]/60 font-medium">
                      {doctor.title} &bull; {doctor.experience}
                    </p>
                  </div>

                  <p className="text-xs text-[#f6ede7]/80 leading-relaxed font-light">
                    {doctor.bio}
                  </p>

                  {/* Expertise Areas */}
                  <div className="space-y-1.5 pt-2 border-t border-[#3e322e]/70">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#e8ceb1]/90 block">
                      Core Clinical Expertise:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {doctor.expertise.map((item, idx) => (
                        <div key={idx} className="flex items-center space-x-1.5 text-[11px] text-[#f6ede7]/75">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#ab7f51] shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-2 border-t border-[#3e322e]/70 flex items-center justify-between">
                  <span className="text-[10px] text-[#e8ceb1]/60 italic">
                    {doctor.education}
                  </span>
                  <button
                    onClick={() => handleOpenBooking(doctor.name)}
                    className="bg-gradient-to-r from-[#ab7f51] to-[#e8ceb1] text-[#2d221f] text-[11px] font-semibold py-2 px-4 rounded-full shadow-md hover:brightness-110 active:scale-[0.99] transition-all duration-300 flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Consultation</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Trust Section */}
      <section className="py-20 bg-[#241a18] border-y border-[#3e322e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ab7f51]">
              WHY PATIENTS TRUST US
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#f6ede7]">
              Expert Care From Experienced Specialists
            </h2>
            <p className="text-xs sm:text-sm text-[#f6ede7]/75 font-light">
              Our clinic combines medical expertise with transparent patient communication to deliver exceptional dental and aesthetic outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustPillars.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#2d221f] border border-[#3e322e] hover:border-[#ab7f51]/50 p-6 rounded-2xl space-y-3 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#ab7f51]/15 border border-[#ab7f51]/30 flex items-center justify-center">
                    <IconComp className="w-6 h-6 text-[#e8ceb1]" />
                  </div>
                  <h3 className="text-base font-semibold text-[#e8ceb1] font-serif">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#f6ede7]/75 leading-relaxed font-light">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Booking CTA Section */}
      <section className="py-16 bg-[#2d221f] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#ab7f51]">
            PERSONALIZED MEDICAL CONSULTATION
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#f6ede7]">
            Schedule Your Visit With Our Specialists
          </h2>
          <p className="text-xs sm:text-sm text-[#f6ede7]/80 leading-relaxed font-light max-w-xl mx-auto">
            Book an exploratory consultation at Beverly Hills Clinic DHA Karachi. Our specialists will perform a comprehensive diagnostic examination and curate a customized treatment plan.
          </p>
          <div className="pt-2">
            <button
              onClick={() => handleOpenBooking()}
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
