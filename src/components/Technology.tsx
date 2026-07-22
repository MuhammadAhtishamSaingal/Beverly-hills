"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Sparkles, Scan, Brain, Zap, Shield, ArrowRight } from "lucide-react";

interface TechStep {
  number: string;
  name: string;
  subname: string;
  category: string;
  heading: string;
  description: string;
  bullets: string[];
  icon: any;
  bottomText: string;
}

export default function Technology() {
  const steps: TechStep[] = [
    {
      number: "01",
      name: "Plasma Fibroblast",
      subname: "Skin Rejuvenation & Lift",
      category: "01 / PLASMA ENERGY THERAPY",
      heading: "Plasma Fibroblast Treatment",
      description: "Innovative skin rejuvenation therapy that tightens, smooths, and restores elasticity using plasma energy. This technique triggers instant tissue shrinkage and long-term collagen synthesis, offering a highly effective non-surgical lifting solution.",
      bullets: [
        "Physically tightens and smooths delicate skin around the eyes, lips, and neck",
        "Triggers natural collagen and elastin fiber production for lasting firmness",
        "A highly effective, minimally invasive alternative to traditional cosmetic surgery"
      ],
      icon: Sparkles,
      bottomText: "FOR NON-SURGICAL SKIN TIGHTENING",
    },
    {
      number: "02",
      name: "Polynucleotide Face & Eyes",
      subname: "Cellular Regeneration",
      category: "02 / REGENERATIVE MEDICINE",
      heading: "Polynucleotide Face and Eyes",
      description: "Regenerative treatment using polynucleotides to improve skin texture, hydration, and reduce fine lines around the eyes and face. These clinical-grade biopolymers work at a cellular level to repair damaged tissue and restore youthfulness.",
      bullets: [
        "Promotes rapid cell renewal, tissue healing, and deep cellular hydration",
        "Significantly reduces fine lines, crepiness, and dark circles under the eyes",
        "Restores natural skin elasticity, thickness, and overall complexion glow"
      ],
      icon: Scan,
      bottomText: "FOR ADVANCED CELLULAR REPAIR",
    },
    {
      number: "03",
      name: "Full Face Botox Rejuvenation",
      subname: "Comprehensive Anti-Aging",
      category: "03 / WRINKLE PREVENTATIVE CARE",
      heading: "Full Face Botox Rejuvenation",
      description: "Comprehensive anti-aging solution targeting facial wrinkles and lines to restore a youthful appearance. By precisely relaxing targeted muscle groups, this treatment smooths existing lines while preventing new ones from forming.",
      bullets: [
        "Effectively targets forehead lines, frown creases, and dynamic crow's feet",
        "Softens neck bands and defines jawlines for a balanced, lifted look",
        "Tailored dosing ensures natural expressions with a refreshed appearance"
      ],
      icon: Brain,
      bottomText: "FOR SMOOTH, REFRESHED CONTOURS",
    },
    {
      number: "04",
      name: "PDO Threads",
      subname: "Minimally Invasive Lifting",
      category: "04 / COLLAGEN INDUCTION LIFT",
      heading: "PDO Threads Lift",
      description: "Minimally invasive thread lifting technique for the face and neck, stimulating collagen production for natural tightening and lift. Absorbable polydioxanone (PDO) threads provide instant structural support while rebuilding your skin's collagen matrix.",
      bullets: [
        "Provides immediate physical lift to sagging cheeks, jawlines, and eyebrows",
        "Sustains collagen synthesis for months as threads naturally absorb",
        "Clinically proven, fully absorbable sutures ensure high patient safety"
      ],
      icon: Zap,
      bottomText: "FOR IMMEDIATE STRUCTURAL TENSION",
    },
    {
      number: "05",
      name: "PRP & Exosomes / Stem Cells",
      subname: "Biological Rejuvenation",
      category: "05 / REGENERATIVE BIOLOGICS",
      heading: "PRP & Exosomes / Stem Cells",
      description: "Advanced regenerative therapy using platelets, exosomes, and stem cells to repair, rejuvenate, and revitalize skin for a youthful glow. This clinical combination supercharges tissue repair and cellular communication for ultimate skin renewal.",
      bullets: [
        "Harnesses highly concentrated growth factors and exosomes to repair damaged tissue",
        "Accelerates skin healing, reduces redness, and fades superficial scarring",
        "Dramatically improves overall facial skin texture, tone, and hair density"
      ],
      icon: Shield,
      bottomText: "FOR INTENSIVE CELLULAR REVITALIZATION",
    },
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleStepClick = (index: number) => {
    if (index === activeStep) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveStep(index);
      setIsTransitioning(false);
    }, 200);
  };

  const activeTech = steps[activeStep];
  const ActiveIcon = activeTech.icon;

  return (
    <section ref={sectionRef} className="py-24 bg-brand-primary border-t border-brand-secondary/40 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header & Image Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Header Copy */}
          <div className={`lg:col-span-5 space-y-4 text-left transform transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0 filter-none" : "opacity-0 -translate-y-8 blur-[1px]"
          }`}>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-[1px] bg-brand-accent" />
              <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">
                TREATMENTS
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-semibold font-heading text-brand-text leading-tight">
              Advanced treatments for exceptional results
            </h2>
            
            <p className="text-sm text-brand-text/75 leading-relaxed">
              We invest in state-of-the-art aesthetic and regenerative medicine to deliver noticeable, natural-looking results while ensuring maximum clinical safety and comfort.
            </p>

            <div className="flex items-center space-x-2 pt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D6A840]" />
              <span className="text-xs font-bold uppercase tracking-wider text-brand-text/60">
                FIVE TOP-SELLING SERVICES
              </span>
            </div>
          </div>

          {/* Header Visual Image */}
          <div className={`lg:col-span-7 relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden shadow-md border border-brand-secondary/40 transform transition-all duration-1000 delay-[200ms] ease-out ${
            isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-[0.98]"
          }`}>
            <Image
              src="/images/studio-sf.webp"
              alt="Beverly Hills Clinic Technology Screens"
              fill
              sizes="(max-w-728px) 100vw, 58vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-text/20 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Lower Steps & Content Area Grid */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch transform transition-all duration-1000 delay-[350ms] ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}>
          
          {/* Left Column: Numbered Clickable Steps (5/12 width) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-3">
            {steps.map((step, idx) => {
              const isActive = idx === activeStep;
              return (
                <button
                  key={step.number}
                  onClick={() => handleStepClick(idx)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-300 focus:outline-none ${
                    isActive
                      ? "bg-[#faf6f3] border-[#e9ded5]/70 shadow-sm"
                      : "bg-transparent border-transparent hover:bg-[#faf6f3]/40"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                        isActive
                          ? "bg-[#D6A840] text-white shadow-xs shadow-[#D6A840]/20"
                          : "bg-transparent border border-brand-text/20 text-brand-text/50"
                      }`}
                    >
                      {step.number}
                    </div>
                    <div>
                      <h3
                        className={`text-sm font-semibold tracking-wide transition-colors ${
                          isActive ? "text-brand-text" : "text-brand-text/70"
                        }`}
                      >
                        {step.name}
                      </h3>
                      <p className="text-[11px] text-brand-text/50">
                        {step.subname}
                      </p>
                    </div>
                  </div>

                  {isActive && (
                    <ArrowRight className="w-4 h-4 text-brand-accent animate-in slide-in-from-left duration-200" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column: White Content Card (7/12 width) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div
              className={`bg-[#faf6f3] border border-[#e9ded5]/70 rounded-2xl p-8 sm:p-10 shadow-xs flex flex-col justify-between space-y-6 relative overflow-hidden transition-all duration-300 ${
                isTransitioning
                  ? "opacity-0 translate-y-2 scale-[0.99]"
                  : "opacity-100 translate-y-0 scale-100"
              }`}
            >
              {/* Header inside the card */}
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold tracking-widest text-brand-text/60 block uppercase">
                    {activeTech.category}
                  </span>
                  <h3 className="text-2xl font-normal font-heading text-brand-text">
                    {activeTech.heading}
                  </h3>
                </div>
                
                <div className="w-10 h-10 rounded-full bg-[#f6ede7] flex items-center justify-center border border-brand-secondary/30">
                  <ActiveIcon className="w-4.5 h-4.5 text-brand-accent" />
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-brand-text/80 leading-relaxed font-light">
                {activeTech.description}
              </p>

              {/* Bullets List */}
              <div className="space-y-3 pt-2">
                {activeTech.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start text-xs sm:text-sm text-brand-text/80 font-light">
                    <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#D6A840] mt-1.5 mr-3" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

              {/* Bottom text */}
              <div className="border-t border-[#f0e6dd] pt-6 flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-widest text-brand-text/50 uppercase">
                  {activeTech.bottomText}
                </span>
                
                <button
                  onClick={() => window.dispatchEvent(new Event("open-booking"))}
                  className="text-xs font-bold text-[#ab7f51] hover:text-[#936b42] hover:underline flex items-center space-x-1"
                >
                  <span>Experience this care</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
