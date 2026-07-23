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
          name: "Hollywood Smile Makeover",
          desc: "Custom veneer and aesthetic design to create a balanced, bright, movie-star smile.",
          duration: "2 - 3 visits",
          suitability: "Patients seeking complete smile transformation",
        },
        {
          name: "Laser Teeth Whitening",
          desc: "Advanced laser-activated whitening technology for immediate shade enhancement.",
          duration: "60 mins",
          suitability: "Safe for patients wanting fast, noticeable brightness",
        },
        {
          name: "Clear Aligner Treatments",
          desc: "Invisible, custom-molded aligners to straighten teeth discreetly and comfortably.",
          duration: "6 - 18 months",
          suitability: "Teens and adults seeking orthodontic correction without metal braces",
        },
        {
          name: "Braces Treatment",
          desc: "Traditional metal or ceramic braces to correct complex bite issues and teeth alignment.",
          duration: "12 - 24 months",
          suitability: "Patients needing comprehensive structural alignment",
        },
        {
          name: "Dental Implants",
          desc: "Permanent titanium posts topped with lifelike crowns to restore missing teeth.",
          duration: "2 - 4 months (stages)",
          suitability: "Patients with missing teeth and healthy jawbone structure",
        },
        {
          name: "Dental Fillings",
          desc: "High-quality composite resin fillings to repair cavities and restore tooth integrity.",
          duration: "30 mins",
          suitability: "Treatment for tooth decay and minor structural damage",
        },
        {
          name: "Dental Veneers, Crowns, Bridges",
          desc: "Custom-crafted porcelain restorations to protect, strengthen, or visually enhance teeth.",
          duration: "2 visits",
          suitability: "Ideal for cracked, broken, or heavily stained teeth",
        },
        {
          name: "Root Canal Treatment",
          desc: "Therapy to clear infection from the tooth's root canals and prevent extraction.",
          duration: "60 - 90 mins",
          suitability: "Deep decay causing severe pain or sensitivity",
        },
        {
          name: "Complete Denture",
          desc: "Custom-fitting full dentures to restore complete arches of missing teeth.",
          duration: "3 - 4 visits",
          suitability: "Fully edentulous patients seeking functional restoration",
        },
        {
          name: "Night Guards",
          desc: "Custom-made protective guards to prevent teeth grinding (bruxism) and TMJ strain.",
          duration: "1 visit (custom fitting)",
          suitability: "Patients experiencing nocturnal grinding or jaw pain",
        },
        {
          name: "Dental Retainers",
          desc: "Tailor-made retainers to lock alignment in place post-braces or aligner treatment.",
          duration: "1 visit",
          suitability: "Post-orthodontic patients preserving alignment",
        },
        {
          name: "Pediatric Dentistry",
          desc: "Gentle, educational dental check-ups, cleanings, and sealants for children.",
          duration: "30 - 45 mins",
          suitability: "Toddlers, children, and young teens",
        },
        {
          name: "Tooth Extraction",
          desc: "Safe, comfortable removal of severely damaged, decayed, or crowded teeth.",
          duration: "45 mins",
          suitability: "Damaged teeth that cannot be restored via root canal",
        },
        {
          name: "Wisdom Tooth Extraction",
          desc: "Specialized surgical extraction of impacted or problematic third molars.",
          duration: "60 mins",
          suitability: "Patients with pain or crowding from emerging wisdom teeth",
        },
        {
          name: "Fixed Dentures",
          desc: "Implant-supported, non-removable dentures for ultimate stability and chewing function.",
          duration: "Multi-stage (2-4 visits)",
          suitability: "Patients seeking a secure alternative to loose dentures",
        },
        {
          name: "Gummy Smile Treatment",
          desc: "Precise gum contouring to achieve a balanced ratio between teeth and gums.",
          duration: "45 mins",
          suitability: "Patients with excessive gum display when smiling",
        },
        {
          name: "Depigmentation of the Gums",
          desc: "Laser treatments to lighten dark or patchy gums for a uniform, pink appearance.",
          duration: "45 mins",
          suitability: "Patients looking to modify hyperpigmented gum tissue",
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
          name: "CO2 Fractional Laser (Fotona)",
          desc: "High-precision laser resurfacing to treat deep wrinkles, scars, and uneven skin texture.",
          duration: "45 - 60 mins",
          suitability: "Advanced skin texture correction and anti-aging",
        },
        {
          name: "HIFU (Ultraformer III)",
          desc: "High-Intensity Focused Ultrasound for non-surgical face lifting and skin tightening.",
          duration: "60 mins",
          suitability: "Patients with mild to moderate skin laxity seeking lift",
        },
        {
          name: "Laser Hair Removal (Alma)",
          desc: "Painless, advanced laser technology for permanent hair reduction across all skin types.",
          duration: "15 - 60 mins",
          suitability: "Long-term smooth skin and hair reduction",
        },
        {
          name: "Plasma Fibroblast",
          desc: "Innovative skin rejuvenation therapy that tightens, smooths, and restores elasticity using plasma energy.",
          duration: "60 - 90 mins",
          suitability: "Tightening delicate skin areas without surgery",
        },
        {
          name: "Polynucleotide Face and Eyes",
          desc: "Regenerative treatment using polynucleotides to improve skin texture, hydration, and reduce fine lines around the eyes and face.",
          duration: "45 mins",
          suitability: "Recommended for patients looking to restore elasticity and natural glow",
        },
        {
          name: "Fillers: Face, Lips, Hair, Body",
          desc: "Hyaluronic acid injectables to restore volume, contour cheeks, plump lips, or rejuvenate skin.",
          duration: "30 - 45 mins",
          suitability: "Volume replenishment and sculpting",
        },
        {
          name: "Full Face Botox Rejuvenation",
          desc: "Comprehensive anti-aging solution targeting facial wrinkles and lines to restore a youthful appearance.",
          duration: "15 - 30 mins",
          suitability: "Prevention and reduction of dynamic wrinkles",
        },
        {
          name: "PRP & Exosomes / Stem Cells",
          desc: "Advanced regenerative therapy using platelets, exosomes, and stem cells to repair, rejuvenate, and revitalize skin for a youthful glow.",
          duration: "60 mins",
          suitability: "Hair thinning, skin aging, or TMJ discomfort",
        },
        {
          name: "Acne & Acne Scars Treatments",
          desc: "Customized treatment combination of lasers, peels, and therapies to clear breakouts and fade scarring.",
          duration: "45 - 60 mins",
          suitability: "Active acne or residual acne scarring",
        },
        {
          name: "PDO Threads",
          desc: "Minimally invasive thread lifting technique for face and neck, stimulating collagen production for natural tightening and lift.",
          duration: "60 - 90 mins",
          suitability: "Immediate sagging skin lift and contouring",
        },
        {
          name: "Chemical Peel: Face, Neck, Body",
          desc: "Specially formulated chemical exfoliation to renew surface skin cells and reduce pigment.",
          duration: "30 mins",
          suitability: "Patients with sun spots, dullness, or uneven tone",
        },
        {
          name: "Skin Brightening Therapy",
          desc: "Advanced topical and IV therapies designed to boost glow and even out overall skin tone.",
          duration: "45 mins",
          suitability: "Patients wanting a radiant, brightened complexion",
        },
        {
          name: "Weight Loss Treatment",
          desc: "Comprehensive medical and therapeutic approach to managing safe, sustainable weight loss.",
          duration: "Custom consultations",
          suitability: "Patients targeting healthy body mass management",
        },
        {
          name: "Body Fat Lipo",
          desc: "Specialized localized non-surgical lipolysis to reduce fat deposits and refine contours.",
          duration: "60 mins per session",
          suitability: "Stubborn fat pockets resistant to diet and exercise",
        },
        {
          name: "Red Carpet Facial",
          desc: "Hollywood-style deep exfoliation, hydration, and oxygen infusion for immediate radiance.",
          duration: "60 mins",
          suitability: "Perfect before major events and special occasions",
        },
        {
          name: "BH Exfoliating Facial",
          desc: "Signature Beverly Hills facial to deep-cleanse pores, extract impurities, and refresh skin health.",
          duration: "60 mins",
          suitability: "Regular skin maintenance and deep pore clearing",
        },
        {
          name: "Micro-Needling with Stem Cells",
          desc: "Collagen induction therapy paired with clinical stem cell serums for maximum healing.",
          duration: "60 mins",
          suitability: "Dull skin, fine lines, or superficial scarring",
        },
        {
          name: "Exosomes Therapy",
          desc: "Cutting-edge regenerative therapy utilizing clinical exosomes to dramatically speed skin healing.",
          duration: "45 mins",
          suitability: "Intensive tissue repair, collagen boosting, and anti-aging",
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
