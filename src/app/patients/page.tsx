"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Calendar, CreditCard, Shield, UserPlus, HelpCircle, Check, ArrowRight } from "lucide-react";
import Image from "next/image";
import { trackCustomPixelEvent } from "@/utils/pixel";

export default function PatientsPage() {
  const [activeSection, setActiveSection] = useState<string>("new-patients");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const sectionId = hash.replace("#", "");
        const validSections = ["insurance", "membership", "new-patients", "faq"];
        if (validSections.includes(sectionId)) {
          setActiveSection(sectionId);
          const element = document.getElementById(sectionId);
          if (element) {
            // Slight delay to ensure the DOM is fully rendered/expanded
            setTimeout(() => {
              element.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 150);
          }
        }
      }
    };

    // Run on initial mount
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    // Also listen to popstate for next.js navigation triggers
    window.addEventListener("popstate", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handleHashChange);
    };
  }, []);

  const toggleSection = (id: string) => {
    const isExpanding = activeSection !== id;
    setActiveSection(activeSection === id ? "" : id);
    trackCustomPixelEvent(isExpanding ? "AccordionExpand" : "AccordionCollapse", {
      category: "Patients Page Resources",
      section: id,
    });
  };

  const triggerBooking = () => {
    window.dispatchEvent(new Event("open-booking"));
  };

  const onboardingSteps = [
    {
      step: "01",
      title: "Book Your Appointment",
      desc: "Use our 2-minute online booking tool to choose your clinic, treatment, and slot. No account creation needed.",
    },
    {
      step: "02",
      title: "Fill Intake Digitally",
      desc: "We email you secure, paperless forms to complete on your phone before arrival. No clinic clipboards or waiting rooms.",
    },
    {
      step: "03",
      title: "Calming Welcome Visit",
      desc: "Step in and enjoy organic tea. We gather your comfort details, capture low-radiation scans, and execute a slow, gentle exam.",
    },
    {
      step: "04",
      title: "Collaborative Planning",
      desc: "Review high-definition digital photographs of your teeth alongside the dentist, deciding the pacing of any needed care.",
    },
  ];

  const faqs = [
    {
      q: "How often should I get my teeth cleaned and checked?",
      a: "For most patients, we recommend professional cleanings and examinations every six months. This prevents tartar buildup, protects gums, and catches small concerns before they become expensive problems.",
    },
    {
      q: "Do you accept dental emergencies?",
      a: "Yes! We block out same-day emergency slots at our DHA Karachi office for cracked teeth, acute toothaches, or abscesses. Call us immediately for triage support.",
    },
    {
      q: "What is your appointment cancellation policy?",
      a: "We ask for a minimum of 48 hours notice for rescheduling or cancellations. Because we only book one patient at a time to ensure dedicated attention, this allows us to offer the slot to someone else.",
    },
    {
      q: "How do you manage patients with extreme dental fear?",
      a: "Anxiety management is our specialty. We provide noise-canceling headphones, ceiling TVs with Netflix, cozy weighted blankets, and aromatherapy. Clinically, we practice slow-dentistry—explaining every step and taking breaks whenever you raise your hand.",
    },
    {
      q: "What parking options are available at the clinic?",
      a: "At our DHA Karachi clinic, street parking is available along Main Saba Avenue and in nearby designated commercial parking lanes.",
    },
  ];

  return (
    <div className="flex flex-col w-full bg-brand-primary">
      {/* 1. Page Header Hero Banner */}
      <section className="relative w-full h-screen md:h-auto md:min-h-[500px] pt-[120px] pb-10 md:pt-52 md:pb-28 flex items-center justify-center overflow-hidden border-b border-brand-secondary/40 bg-brand-primary">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/patient_ banner.webp"
            alt="Beverly Hills Clinic Reception Background"
            fill
            priority
            sizes="100vw"
            className="hidden md:block object-cover object-center"
          />
          <Image
            src="/images/space4.webp"
            alt="Beverly Hills Clinic Reception Background Mobile"
            fill
            priority
            sizes="100vw"
            className="block md:hidden object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#f6ede7]/45 md:bg-[#f6ede7]/40 mix-blend-normal z-10" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4 mt-[60px] md:mt-[150px]">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-accent block">
            Patient Dashboard
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-heading text-brand-text leading-tight">
            Everything you need, in one place.
          </h1>
          <div className="w-12 h-1 bg-brand-accent/40 mx-auto rounded-full" />
          <p className="text-sm sm:text-base text-brand-text/85 max-w-xl mx-auto leading-relaxed font-medium text-[#3d2e2a]">
            From new patient forms to membership pricing and insurance details, select a resource below to learn more.
          </p>
        </div>
      </section>

      {/* 2. Accordions Grid */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 w-full flex-grow space-y-6">
        
        {/* Insurance Accordion */}
        <div
          id="insurance"
          className="bg-white border border-brand-secondary/40 rounded-2xl overflow-hidden shadow-xs scroll-mt-24 transition-all duration-300"
        >
          <button
            onClick={() => toggleSection("insurance")}
            className="w-full flex items-center justify-between p-6 sm:p-8 text-left focus:outline-none hover:bg-brand-secondary/10 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center">
                <Shield className="w-5 h-5 text-brand-accent" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold font-heading text-brand-text">
                  Insurance & Financing
                </h3>
                <span className="text-xs text-brand-text/60 font-medium">
                  Accepted Providers & Claim Processing
                </span>
              </div>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-brand-accent transition-transform duration-300 ${
                activeSection === "insurance" ? "rotate-180" : ""
              }`}
            />
          </button>

          {activeSection === "insurance" && (
            <div className="border-t border-brand-secondary/20 p-6 sm:p-8 bg-brand-primary/10 space-y-6 animate-in slide-in-from-top-4 duration-300">
              <div className="space-y-4 text-sm text-brand-text/80 leading-relaxed">
                <p>
                  We believe in transparent, stress-free dental care. Beverly Hills Clinic is an in-network provider with most major dental PPO insurance plans. We file all insurance claims directly on your behalf, so you do not have to worry about complicated paperwork.
                </p>
                
                <div className="bg-white border border-brand-secondary/20 rounded-xl p-5 space-y-3">
                  <h4 className="font-bold text-brand-text text-xs uppercase tracking-wider">
                    Common PPO Insurances We Accept:
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-semibold text-brand-text/75">
                    <div className="flex items-center space-x-1.5"><Check className="w-3.5 h-3.5 text-brand-accent" /> <span>Delta Dental PPO</span></div>
                    <div className="flex items-center space-x-1.5"><Check className="w-3.5 h-3.5 text-brand-accent" /> <span>Cigna PPO</span></div>
                    <div className="flex items-center space-x-1.5"><Check className="w-3.5 h-3.5 text-brand-accent" /> <span>Guardian PPO</span></div>
                    <div className="flex items-center space-x-1.5"><Check className="w-3.5 h-3.5 text-brand-accent" /> <span>MetLife PPO</span></div>
                    <div className="flex items-center space-x-1.5"><Check className="w-3.5 h-3.5 text-brand-accent" /> <span>Aetna PPO</span></div>
                    <div className="flex items-center space-x-1.5"><Check className="w-3.5 h-3.5 text-brand-accent" /> <span>Blue Cross Blue Shield</span></div>
                  </div>
                </div>

                <p className="text-xs text-brand-text/50">
                  Note: We do not accept HMO, DMO, or Medi-Cal plans at this time. If you have questions about your specific policy limits, call our care team and we will run a complimentary benefits check for you.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Membership Accordion */}
        <div
          id="membership"
          className="bg-white border border-brand-secondary/40 rounded-2xl overflow-hidden shadow-xs scroll-mt-24 transition-all duration-300"
        >
          <button
            onClick={() => toggleSection("membership")}
            className="w-full flex items-center justify-between p-6 sm:p-8 text-left focus:outline-none hover:bg-brand-secondary/10 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-brand-accent" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold font-heading text-brand-text">
                  Beverly Hills Membership Plan
                </h3>
                <span className="text-xs text-brand-text/60 font-medium">
                  Transparent Dental Care, No Insurance Required
                </span>
              </div>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-brand-accent transition-transform duration-300 ${
                activeSection === "membership" ? "rotate-180" : ""
              }`}
            />
          </button>

          {activeSection === "membership" && (
            <div className="border-t border-brand-secondary/20 p-6 sm:p-8 bg-brand-primary/10 space-y-6 animate-in slide-in-from-top-4 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                
                {/* Details Column */}
                <div className="md:col-span-7 space-y-4 text-sm text-brand-text/80 leading-relaxed">
                  <p>
                    No insurance? No problem. We have designed a transparent, comprehensive in-house membership plan to ensure you can receive excellent preventive care without deductibles, waiting periods, or yearly maximum caps.
                  </p>
                  <ul className="space-y-2.5">
                    {[
                      "2 Preventative Cleanings & Exams per year",
                      "All necessary digital diagnostic X-rays & 3D scans",
                      "1 Emergency diagnostic visit with scan",
                      "15% off all other treatments (fillings, crowns, whitening, veneers)",
                    ].map((benefit, idx) => (
                      <li key={idx} className="flex items-start text-xs">
                        <Check className="w-4 h-4 text-brand-accent mr-2 mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing / CTA Card */}
                <div className="md:col-span-5 bg-white border border-brand-secondary/40 rounded-xl p-6 flex flex-col justify-between text-center space-y-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-text/40">Membership Pricing</span>
                    <div className="text-3xl font-bold font-heading text-brand-text mt-1">
                      Rs. 3,500<span className="text-sm font-normal text-brand-text/50">/mo</span>
                    </div>
                    <span className="text-xs text-brand-text/50 block mt-0.5">Or billed annually at Rs. 35,000</span>
                  </div>
                  <button
                    onClick={triggerBooking}
                    className="btn-primary w-full py-2.5 text-xs font-semibold"
                  >
                    Enroll in Membership
                  </button>
                  <span className="text-[10px] text-brand-text/40">No sign-up fees. Cancel anytime.</span>
                </div>

              </div>
            </div>
          )}
        </div>

        {/* New Patients Accordion */}
        <div
          id="new-patients"
          className="bg-white border border-brand-secondary/40 rounded-2xl overflow-hidden shadow-xs scroll-mt-24 transition-all duration-300"
        >
          <button
            onClick={() => toggleSection("new-patients")}
            className="w-full flex items-center justify-between p-6 sm:p-8 text-left focus:outline-none hover:bg-brand-secondary/10 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-brand-accent" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold font-heading text-brand-text">
                  New Patients Onboarding
                </h3>
                <span className="text-xs text-brand-text/60 font-medium">
                  What to expect at your first visit
                </span>
              </div>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-brand-accent transition-transform duration-300 ${
                activeSection === "new-patients" ? "rotate-180" : ""
              }`}
            />
          </button>

          {activeSection === "new-patients" && (
            <div className="border-t border-brand-secondary/20 p-6 sm:p-8 bg-brand-primary/10 space-y-8 animate-in slide-in-from-top-4 duration-300">
              
              {/* Numbered Steps */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {onboardingSteps.map((step, idx) => (
                  <div key={idx} className="bg-white border border-brand-secondary/35 p-5 rounded-xl flex items-start space-x-4">
                    <div className="text-2xl font-bold text-brand-accent/40 font-heading">
                      {step.step}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-brand-text">
                        {step.title}
                      </h4>
                      <p className="text-xs text-brand-text/70 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Booking CTA Button */}
              <div className="text-center pt-2 border-t border-brand-secondary/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-brand-text/60 max-w-md text-left leading-relaxed">
                  First visits usually take 60 minutes. We recommend selecting a slot that gives you plenty of time.
                </span>
                <button
                  onClick={triggerBooking}
                  className="btn-primary py-2.5 px-6 text-xs flex items-center space-x-1.5 self-stretch sm:self-auto"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Your First Visit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          )}
        </div>

        {/* FAQ Accordion */}
        <div
          id="faq"
          className="bg-white border border-brand-secondary/40 rounded-2xl overflow-hidden shadow-xs scroll-mt-24 transition-all duration-300"
        >
          <button
            onClick={() => toggleSection("faq")}
            className="w-full flex items-center justify-between p-6 sm:p-8 text-left focus:outline-none hover:bg-brand-secondary/10 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-brand-accent" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold font-heading text-brand-text">
                  Frequently Asked Questions
                </h3>
                <span className="text-xs text-brand-text/60 font-medium">
                  Got Questions? We Have Answers.
                </span>
              </div>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-brand-accent transition-transform duration-300 ${
                activeSection === "faq" ? "rotate-180" : ""
              }`}
            />
          </button>

          {activeSection === "faq" && (
            <div className="border-t border-brand-secondary/20 p-6 sm:p-8 bg-brand-primary/10 space-y-6 animate-in slide-in-from-top-4 duration-300">
              <div className="space-y-5">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="space-y-1.5 border-b border-brand-secondary/20 pb-4 last:border-b-0 last:pb-0">
                    <h4 className="text-sm font-bold text-brand-text">
                      Q: {faq.q}
                    </h4>
                    <p className="text-xs sm:text-sm text-brand-text/75 leading-relaxed">
                      A: {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </section>

      {/* 3. Bottom Callout */}
      <section className="py-16 bg-brand-secondary/20 border-t border-brand-secondary/40 text-center">
        <div className="max-w-md mx-auto px-4 space-y-4">
          <h3 className="text-xl font-bold font-heading text-brand-text">
            Still have questions?
          </h3>
          <p className="text-xs sm:text-sm text-brand-text/70 leading-relaxed">
            Our friendly care coordinators are happy to assist. Give us a call at 0307-0984307 or email clinicbeverlyhills@gmail.com.
          </p>
          <button
            onClick={triggerBooking}
            className="btn-primary text-xs py-2.5 px-5 mt-2"
          >
            Schedule a Visit
          </button>
        </div>
      </section>
    </div>
  );
}
