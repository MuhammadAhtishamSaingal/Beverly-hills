"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Sparkles, ShieldCheck, Calendar, Phone, ArrowRight } from "lucide-react";
import { trackPixelEvent, trackCustomPixelEvent } from "@/utils/pixel";

interface Procedure {
  name: string;
  desc: string;
  duration: string;
  suitability: string;
}

interface ServiceCategory {
  id: string;
  title: string;
  icon: any;
  tagline: string;
  description: string;
  procedures: Procedure[];
}

export default function ServicesPage() {
  const categories: ServiceCategory[] = [
    {
      id: "dentistry",
      title: "Comprehensive Dental Services",
      icon: ShieldCheck,
      tagline: "Comprehensive dental care delivered with precision and comfort.",
      description:
        "Our dentistry services focus on preserving your natural teeth, ensuring optimal hygiene, and restoring function using state-of-the-art procedures and gentle care techniques.",
      procedures: [
        {
          name: "General Dentistry",
          desc: "Complete comprehensive oral examinations, diagnostic scans, and customized preventive treatment plans.",
          duration: "45 mins",
          suitability: "Recommended for all patients at least once a year",
        },
        {
          name: "Cosmetic Treatments",
          desc: "Enhance your appearance with our advanced cosmetic dental treatments, including teeth whitening, veneers, and smile makeovers.",
          duration: "Varies",
          suitability: "Patients with one or more missing teeth and good bone support",
        },
        {
          name: "Specialty Care",
          desc: "Our specialists provide comprehensive care for issues like TMJ, sleep apnea, and orthodontic needs, tailored to your unique requirements.",
          duration: "12 - 24 months",
          suitability: "Teens and adults seeking bite correction or straight teeth",
        },
        {
          name: "Teeth Cleaning",
          desc: "Gentle Guided Biofilm Therapy using warmed, pressurized water to remove plaque, stains, and tartar comfortably.",
          duration: "60 mins",
          suitability: "Recommended every 6 months for optimal gum health",
        },
        {
          name: "Teeth Whitening",
          desc: "Professional in-office whitening treatments using advanced light-activated gel to brighten your smile rapidly.",
          duration: "90 mins",
          suitability: "Patients looking for fast, dramatic shade improvement",
        },
        {
          name: "Root Canal",
          desc: "Minimally invasive therapy to save infected teeth by cleaning, sanitizing, and sealing the root canals comfortably.",
          duration: "60 - 90 mins",
          suitability: "Patients experiencing deep decay or severe tooth pain",
        },

      ],
    },
    {
      id: "aesthetics",
      title: "Advanced Aesthetics",
      icon: Sparkles,
      tagline: "Restore, refine, and rejuvenate your skin and features.",
      description:
        "Our advanced aesthetic treatments combine medical technology and artistry to enhance your natural beauty, refresh your skin texture, and restore youthful contours.",
      procedures: [
        {
          name: "Injectables",
          desc: "Our expert injectors provide safe and effective treatments with Botox and dermal fillers to smooth wrinkles and enhance facial features.",
          duration: "30 mins",
          suitability: "Patients looking to soften fine lines or restore volume",
        },
        {
          name: "Laser Therapies",
          desc: "State-of-the-art laser technology allows us to offer advanced skin rejuvenation, hair removal, and scar treatment services.",
          duration: "45 mins",
          suitability: "Patients with sun damage, acne scars, or texture concerns",
        },
        {
          name: "Facial Treatments",
          desc: "Indulge in our luxurious facials, Chemical peels, and other advanced skin care treatments for a radiant, youthful Complexion.Indulge in our luxurious facials, chemical peels, and other advanced skin Care treatments for a radiant, youthful Complexion.",
          duration: "60 mins",
          suitability: "Anyone seeking a deep skin cleanse and instant glow",
        },
        {
          name: "Body Contouring",
          desc: "Achieve your desired silhouette with our non-invasive body sculpting procedures that target stubborn fat and tighten the skin.",
          duration: "60 mins per area",
          suitability: "Individuals seeking localized fat reduction and skin tightening",
        },
      ],
    },
  ];

  const [activeCategory, setActiveCategory] = useState<string>("dentistry");

  const toggleCategory = (id: string) => {
    const isExpanding = activeCategory !== id;
    setActiveCategory(activeCategory === id ? "" : id);
    trackCustomPixelEvent(isExpanding ? "AccordionExpand" : "AccordionCollapse", {
      category: "Services Page Procedures",
      section: id,
    });
  };

  const triggerBooking = () => {
    window.dispatchEvent(new Event("open-booking"));
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const targetId = decodeURIComponent(hash.replace("#", ""));

        // Find which category has this procedure name matching the targetId
        const foundCategory = categories.find((cat) =>
          cat.procedures.some((proc) => proc.name.toLowerCase().replace(/\s+/g, "-") === targetId)
        );

        if (foundCategory) {
          setActiveCategory(foundCategory.id);

          // Small delay for Next.js rendering then scroll to target
          setTimeout(() => {
            const el = document.getElementById(targetId);
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          }, 150);
        }
      }
    };

    // Run on initial mount
    handleHashChange();

    // Listen to hash changes (in case of in-page navigations)
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div className="flex flex-col w-full bg-brand-primary">
      {/* 1. Hero Banner */}
      <section className="bg-brand-secondary/20 border-b border-brand-secondary/40 pt-36 pb-20 sm:pt-48 sm:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">
            Our Services & Treatments
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-heading text-brand-text">
            Thoughtful care, tailormade for you.
          </h1>
          <div className="w-12 h-1 bg-brand-accent/40 mx-auto rounded-full" />
          <p className="text-sm sm:text-base text-brand-text/75 max-w-xl mx-auto leading-relaxed">
            We provide a complete range of dental services and advanced aesthetics with a focus on preventative wellness, visual education, and absolute comfort.
          </p>
        </div>
      </section>

      {/* 2. Services Accordion Section */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 w-full flex-grow">
        <div className="space-y-6">
          {categories.map((category) => {
            const IconComp = category.icon;
            const isOpen = category.id === activeCategory;
            return (
              <div
                key={category.id}
                className="bg-white border border-brand-secondary/40 rounded-2xl overflow-hidden shadow-xs transition-all duration-300"
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full flex items-center justify-between p-6 sm:p-8 text-left focus:outline-none hover:bg-brand-secondary/10 transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center">
                      <IconComp className="w-5 h-5 text-brand-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold font-heading text-brand-text">
                        {category.title}
                      </h3>
                      <span className="text-xs text-brand-text/60 font-medium">
                        {category.procedures.length} Procedures Available
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-brand-accent transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {/* Accordion Content */}
                {isOpen && (
                  <div className="border-t border-brand-secondary/20 p-6 sm:p-8 bg-brand-primary/10 space-y-6 animate-in slide-in-from-top-4 duration-350">
                    {/* Category Header */}
                    <div className="space-y-2 border-b border-brand-secondary/20 pb-4">
                      <p className="text-sm font-semibold text-brand-accent uppercase tracking-wide">
                        {category.tagline}
                      </p>
                      <p className="text-sm text-brand-text/80 leading-relaxed">
                        {category.description}
                      </p>
                    </div>

                    {/* Procedures List */}
                    <div className="space-y-6">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-brand-text/50">
                        Detailed Treatments:
                      </h4>
                      <div className="space-y-4">
                        {category.procedures.map((proc, idx) => {
                          const anchorId = proc.name.toLowerCase().replace(/\s+/g, "-");
                          return (
                            <div
                              key={idx}
                              id={anchorId}
                              className="bg-white border border-brand-secondary/20 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-xs transition-shadow scroll-mt-24"
                            >
                              <div className="space-y-1.5 max-w-xl">
                                <h5 className="text-sm sm:text-base font-bold font-heading text-brand-text">
                                  {proc.name}
                                </h5>
                                <p className="text-xs sm:text-sm text-brand-text/70 leading-relaxed">
                                  {proc.desc}
                                </p>
                                <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1 text-[11px] text-brand-text/55">
                                  <span>
                                    <strong>Duration:</strong> {proc.duration}
                                  </span>
                                  <span className="hidden sm:inline">&middot;</span>
                                  <span>
                                    <strong>Ideal For:</strong> {proc.suitability}
                                  </span>
                                </div>
                              </div>
                              <button
                                onClick={triggerBooking}
                                className="btn-secondary py-2 px-4 text-xs font-semibold self-start sm:self-center flex items-center space-x-1"
                              >
                                <span>Book Care</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Bottom CTA Section */}
      <section className="py-20 bg-brand-secondary/30 border-t border-brand-secondary/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-brand-text">
            Ready to experience thoughtful care?
          </h2>
          <p className="text-sm text-brand-text/70 max-w-md mx-auto">
            Schedule an appointment at either our Sharfabad or DHA Karachi clinic today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={triggerBooking}
              className="btn-primary w-full sm:w-auto py-3 px-6 text-sm"
            >
              <Calendar className="w-4.5 h-4.5 mr-2" />
              <span>Book a Visit</span>
            </button>
            <a
              href="tel:03070984307"
              onClick={() => trackPixelEvent("Contact", { content_name: "Services Page Call Clinic" })}
              className="btn-secondary w-full sm:w-auto py-3 px-6 text-sm bg-white/50"
            >
              <Phone className="w-4.5 h-4.5 mr-2" />
              <span>Call Clinic</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
