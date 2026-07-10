"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Scan, HardDrive, Printer, Brain, Shield, Zap, Printer as PrintIcon, ArrowRight } from "lucide-react";

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
      name: "CBCT Imaging",
      subname: "Three-dimensional clarity",
      category: "01 / ADVANCED DIAGNOSTICS",
      heading: "3D Cone Beam CT Scanning",
      description: "Our 3D Cone Beam Computed Tomography captures highly detailed three-dimensional scans of your dental structure, bone, and nerve pathways in seconds. This provides complete anatomical views for ultra-precise implant placement, root canals, and structural diagnosis.",
      bullets: [
        "Provides unmatched anatomical accuracy for dental implants",
        "Uses significantly less radiation than traditional medical CT scans",
        "Supports precise, guided surgical planning to ensure safety"
      ],
      icon: Scan,
      bottomText: "FOR FASTER, MORE PRECISE DIAGNOSTICS",
    },
    {
      number: "02",
      name: "3D Scanners",
      subname: "Comfortable digital impressions",
      category: "02 / DIGITAL IMPRESSIONS",
      heading: "Intraoral 3D Digital Scanner",
      description: "Say goodbye to sticky impression putty and cold metal trays. Our intraoral scanner sweeps over your teeth, capturing thousands of high-definition color images per second to map your mouth in real-time on a screen.",
      bullets: [
        "Comfortable, fast, and completely gag-free oral mapping",
        "Creates highly accurate crowns, veneers, and Invisalign aligners",
        "Speeds up laboratory preparation and cuts down appointment times"
      ],
      icon: HardDrive,
      bottomText: "FOR COMFORTABLE DIGITAL MAPPING",
    },
    {
      number: "03",
      name: "3D Printing",
      subname: "Made here, in-house",
      category: "03 / IN-HOUSE FABRICATION",
      heading: "In-House 3D Printing",
      description: "We print models, surgical guides, and select dental appliances right here in the studio. Keeping it in-house means we control the fit and the timing — so more of your care happens under one roof, on a schedule that works for you.",
      bullets: [
        "Precise guides for surgical implant and restorative placements",
        "Can significantly shorten the wait time between treatment steps",
        "Fully managed in-house where we inspect every clinical detail"
      ],
      icon: Printer,
      bottomText: "FOR FASTER, MORE PRECISE CARE",
    },
    {
      number: "04",
      name: "AI-Assisted Diagnostics",
      subname: "A second set of eyes",
      category: "04 / SOFTWARE & INTELLIGENCE",
      heading: "AI-Assisted Diagnostics",
      description: "We integrate cutting-edge machine learning diagnostic models that analyze your digital radiographs alongside our clinical team. This provides an objective second opinion on bone density, early-stage decay, and periodontal health.",
      bullets: [
        "Helps detect early-stage cavities before they spread",
        "Objective, data-driven analysis of jawbone levels and density",
        "Improves patient trust and clarifies clinical decision mapping"
      ],
      icon: Brain,
      bottomText: "FOR SCIENTIFIC SECOND OPINIONS",
    },
    {
      number: "05",
      name: "Digital X-Rays",
      subname: "Detailed, and right away",
      category: "05 / RADIATION-SAFE RADIOGRAPHY",
      heading: "Low-Radiation Digital X-Rays",
      description: "Our digital radiography systems produce immediate, high-contrast imagery on monitors directly above your chair, allowing us to zoom, contrast, and discuss your oral health immediately with complete transparency.",
      bullets: [
        "Reduces diagnostic radiation exposure by up to 80%",
        "Instant visual results with zero chemical processing wait times",
        "High-definition scans allow for early pathology detection"
      ],
      icon: Shield,
      bottomText: "FOR ABSOLUTE DIAGNOSTIC SAFETY",
    },
    {
      number: "06",
      name: "Laser Dentistry",
      subname: "A gentler touch",
      category: "06 / SOFT TISSUE TREATMENTS",
      heading: "Soft Tissue Laser Dentistry",
      description: "Our soft-tissue laser provides gentle gum reshaping, advanced pocket sterilization, and minor surgical treatments. The laser energy sanitizes and seals tissue instantly, resulting in minimal bleeding and quick recovery.",
      bullets: [
        "Often eliminates the need for local anesthesia injections or sutures",
        "Minimizes bleeding and reduces post-operative swelling",
        "Significantly gentler than traditional mechanical dental tools"
      ],
      icon: Zap,
      bottomText: "FOR GENTLE, SCALPEL-FREE GUM TREATMENT",
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
    // Trigger transition delay
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
                TECHNOLOGY
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-semibold font-heading text-brand-text leading-tight">
              Technology in service of better care
            </h2>
            
            <p className="text-sm text-brand-text/75 leading-relaxed">
              We invest in advanced tools not for their own sake, but because they lead to more accurate diagnoses, gentler treatments, and better outcomes.
            </p>

            <div className="flex items-center space-x-2 pt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D6A840]" />
              <span className="text-xs font-bold uppercase tracking-wider text-brand-text/60">
                SIX IN-HOUSE TECHNOLOGIES
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
            {/* Soft dark-gradient overlay */}
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
                    {/* Circle badge */}
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
            {/* White card with animative state */}
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
                
                {/* Custom round icon */}
                <div className="w-10 h-10 rounded-full bg-[#f6ede7] flex items-center justify-center border border-brand-secondary/30">
                  <ActiveIcon className="w-4.5 h-4.5 text-brand-accent" />
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-brand-text/80 leading-relaxed font-light">
                {activeTech.description}
              </p>

              {/* Bullets List with Gold bullet accents */}
              <div className="space-y-3 pt-2">
                {activeTech.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start text-xs sm:text-sm text-brand-text/80 font-light">
                    {/* Circle dot marker */}
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
