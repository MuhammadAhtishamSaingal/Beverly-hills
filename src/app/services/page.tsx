"use client";

import { useState } from "react";
import { ChevronDown, Sparkles, Activity, ShieldCheck, Calendar, Phone, ArrowRight } from "lucide-react";

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
      id: "general",
      title: "General & Preventive Dentistry",
      icon: ShieldCheck,
      tagline: "Preserving your natural smile with gentle, proactive care.",
      description:
        "General dentistry is the foundation of long-term health. We focus on preventive hygiene, early diagnostic detection using digital scanners, and minimally invasive treatments designed to preserve tooth structure.",
      procedures: [
        {
          name: "Comprehensive Exams & Warmed Cleaning",
          desc: "Thorough visual exam, digital diagnostics, and our gentle Guided Biofilm clean using warm pressurized water.",
          duration: "60 mins",
          suitability: "Recommended every 6 months for all patients",
        },
        {
          name: "Tooth-Colored Composite Fillings",
          desc: "Drill-free laser preparation followed by color-matched composite resin to repair decay invisibly.",
          duration: "45 mins",
          suitability: "Patients with mild to moderate cavities",
        },
        {
          name: "Ceramic Crowns & Inlays",
          desc: "Full-coverage porcelain caps to restore strength and function to fractured or heavily treated teeth.",
          duration: "90 mins (1 visit)",
          suitability: "Cracked, broken, or severely decayed teeth",
        },
        {
          name: "Periodontal (Gum) Health Cleaning",
          desc: "Ultrasonic and soft-tissue laser treatments to remove deep bacteria pockets and treat early gum disease.",
          duration: "60 - 90 mins",
          suitability: "Patients showing signs of bleeding or gum recession",
        },
        {
          name: "Emergency Dental Care",
          desc: "Same-day triage, pain management, and rapid diagnostics for sudden toothaches, swelling, or trauma.",
          duration: "Varies",
          suitability: "Anyone experiencing acute dental pain or injury",
        },
      ],
    },
    {
      id: "cosmetic",
      title: "Cosmetic & Aesthetic Dentistry",
      icon: Sparkles,
      tagline: "Enhance your confidence with customized smile design.",
      description:
        "Your smile is uniquely yours. We combine clinical art and science to design natural-looking enhancements, using digital mockups so you can preview your results before we start.",
      procedures: [
        {
          name: "Porcelain Veneers & Lumineers",
          desc: "Ultra-thin, custom-fabricated ceramic shells bonded to the front of teeth to correct spacing, chips, or alignment.",
          duration: "2 visits",
          suitability: "For dramatic improvements in shape, color, and spacing",
        },
        {
          name: "Invisalign® Clear Aligners",
          desc: "Nearly invisible, removable clear plastic trays that gently slide teeth into alignment over several months.",
          duration: "10 - 18 months",
          suitability: "Adults and teens wanting straight teeth without metal braces",
        },
        {
          name: "In-Office Zoom Whitening",
          desc: "Fast, light-activated oxygen gel treatment that brightens teeth up to 8 shades in a single comfortable visit.",
          duration: "90 mins",
          suitability: "Deep stains, yellowing, or discoloration",
        },
        {
          name: "Aesthetic Composite Bonding",
          desc: "Quick, single-visit tooth reshaping using light-cured composite resin to repair small gaps or minor chips.",
          duration: "30 - 60 mins",
          suitability: "Minor aesthetic defects, chipped edges, or small gaps",
        },
      ],
    },
    {
      id: "specialty",
      title: "Specialty Care & Restorations",
      icon: Activity,
      tagline: "Advanced treatments for complex dental needs.",
      description:
        "When standard care isn't enough, we offer state-of-the-art restorative and endodontic procedures in-house, utilizing 3D CBCT imaging to maximize success rates.",
      procedures: [
        {
          name: "3D-Guided Dental Implants",
          desc: "Computer-guided titanium post insertion to replace missing roots, topped with a lifelike custom ceramic crown.",
          duration: "3 - 6 months total",
          suitability: "Single or multiple missing teeth with healthy bone support",
        },
        {
          name: "Gentle Root Canal Therapy",
          desc: "Removal of inflamed nerve tissue from inside the root canal, sanitized with lasers, and sealed to save the natural tooth.",
          duration: "60 - 90 mins",
          suitability: "Deep cavities or trauma causing severe, throbbing toothaches",
        },
        {
          name: "Wisdom Teeth Extraction",
          desc: "Safe, comfortable extraction of impacted or poorly positioned third molars under local anesthesia.",
          duration: "45 - 90 mins",
          suitability: "Teenagers or adults experiencing wisdom tooth pain or crowding",
        },
        {
          name: "TMJ Treatment & Nightguards",
          desc: "Custom-molded acrylic dental guards to prevent night grinding (bruxism), relieve headaches, and protect joints.",
          duration: "1 visit (plus lab)",
          suitability: "Chronic jaw clenching, morning headaches, or enamel wear",
        },
      ],
    },
  ];

  const [activeCategory, setActiveCategory] = useState<string>("general");

  const toggleCategory = (id: string) => {
    // If it's already active, we toggle it off (or we keep it open, but user specified "only one open at a time"
    // so let's allow toggling off, meaning 0 or 1 is open. Or we can just set it.)
    setActiveCategory(activeCategory === id ? "" : id);
  };

  const triggerBooking = () => {
    window.dispatchEvent(new Event("open-booking"));
  };

  return (
    <div className="flex flex-col w-full bg-brand-primary">
      {/* 1. Hero Banner */}
      <section className="bg-brand-secondary/20 border-b border-brand-secondary/40 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">
            Our Services & Treatments
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-heading text-brand-text">
            Thoughtful care, tailormade for you.
          </h1>
          <div className="w-12 h-1 bg-brand-accent/40 mx-auto rounded-full" />
          <p className="text-sm sm:text-base text-brand-text/75 max-w-xl mx-auto leading-relaxed">
            We provide a complete range of dental services with a focus on preventative wellness, visual education, and absolute comfort.
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
                  className="w-full flex items-center justify-between p-6 sm:p-8 text-left focus:outline-none hover:bg-brand-secondary/10 transition-colors"
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
                    className={`w-5 h-5 text-brand-accent transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
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
                        {category.procedures.map((proc, idx) => (
                          <div
                            key={idx}
                            className="bg-white border border-brand-secondary/20 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-xs transition-shadow"
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
                        ))}
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
            Schedule an appointment at either our Sharfabad or Badar Commercial studio today.
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
              className="btn-secondary w-full sm:w-auto py-3 px-6 text-sm bg-white/50"
            >
              <Phone className="w-4.5 h-4.5 mr-2" />
              <span>Call Studio</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
