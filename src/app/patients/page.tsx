"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Calendar, Wallet, Sparkles, UserPlus, HelpCircle, Check, ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import { trackCustomPixelEvent } from "@/utils/pixel";
import { trackInitiateBooking } from "@/lib/metaPixel";
import { locations, CONSULTATION_FEE, CLINIC_PHONE, CLINIC_PHONE_RAW, CLINIC_EMAIL, CLINIC_WHATSAPP } from "@/data/locations";

const SECTIONS = ["fees", "smile-makeover", "first-visit", "faq"] as const;
type SectionId = (typeof SECTIONS)[number];

const LEGACY_HASHES: Record<string, SectionId> = {
  insurance: "fees",
  membership: "fees",
  "new-patients": "first-visit",
};

function AccordionHeader({
  id,
  active,
  onToggle,
  icon: Icon,
  title,
  subtitle,
}: {
  id: SectionId;
  active: string;
  onToggle: (id: SectionId) => void;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
}) {
  return (
    <button
      onClick={() => onToggle(id)}
      aria-expanded={active === id}
      className="w-full flex items-center justify-between p-6 sm:p-8 text-left focus:outline-none hover:bg-brand-secondary/10 transition-colors"
    >
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-brand-accent" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold font-heading text-brand-text">{title}</h3>
          <span className="text-xs text-brand-text/60 font-medium">{subtitle}</span>
        </div>
      </div>
      <ChevronDown
        className={`w-5 h-5 text-brand-accent transition-transform duration-300 shrink-0 ${active === id ? "rotate-180" : ""}`}
      />
    </button>
  );
}

export default function PatientsPage() {
  const [activeSection, setActiveSection] = useState<string>("first-visit");

  useEffect(() => {
    const handleHashChange = () => {
      const raw = window.location.hash.replace("#", "");
      if (!raw) return;
      const sectionId = (LEGACY_HASHES[raw] || raw) as SectionId;
      if (SECTIONS.includes(sectionId)) {
        setActiveSection(sectionId);
        setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 150);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("popstate", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handleHashChange);
    };
  }, []);

  const toggleSection = (id: SectionId) => {
    const isExpanding = activeSection !== id;
    setActiveSection(activeSection === id ? "" : id);
    trackCustomPixelEvent(isExpanding ? "AccordionExpand" : "AccordionCollapse", {
      category: "Patients Page Resources",
      section: id,
    });
  };

  const triggerBooking = (service?: string) => {
    trackInitiateBooking("Patients Page Book Visit");
    window.dispatchEvent(new CustomEvent("open-booking", service ? { detail: { service } } : undefined));
  };

  const firstVisitSteps = [
    {
      step: "01",
      title: "Book your consultation",
      desc: "Book online, call or WhatsApp us. Choose DHA Phase 5, Bahadurabad, or an online consultation.",
    },
    {
      step: "02",
      title: "We confirm your time",
      desc: "Our team calls or WhatsApps you to confirm your appointment and answer any questions before you come in.",
    },
    {
      step: "03",
      title: "Meet your doctor",
      desc: "Your dentist or aesthetic doctor listens to your goals, examines you and takes photos or X-rays where needed.",
    },
    {
      step: "04",
      title: "Your personal plan",
      desc: "You receive a clear treatment plan, timeline and cost before anything starts. The decision is always yours.",
    },
  ];

  const smileSteps = [
    { day: "Visit 1", title: "Consultation & smile design", text: "We study your face, teeth and bite, and plan the shape, shade and length of your new smile with you." },
    { day: "Visit 2", title: "Preparation & trial smile", text: "Your teeth are prepared and you leave with a temporary smile while your veneers are crafted." },
    { day: "Visit 3", title: "Your new smile", text: "Your final veneers are fitted, polished and checked, all within about 10 days." },
  ];

  const faqs = [
    {
      q: "How much is a consultation?",
      a: `The consultation fee is ${CONSULTATION_FEE}. It includes your assessment with the doctor and a personalised treatment plan with costs.`,
    },
    {
      q: "How long does a smile makeover take?",
      a: "Most smile makeovers are completed in 3 visits over about 10 days. Your dentist will confirm your exact timeline at your consultation, as it depends on your teeth and the treatment you choose.",
    },
    {
      q: "What is the difference between E-max and Zirconia veneers?",
      a: "E-max veneers are ultra-thin porcelain with natural translucency, so they look the most like natural teeth. Zirconia is the strongest option and is ideal for covering dark or heavily stained teeth and for strong bites. Your dentist will recommend what suits you best.",
    },
    {
      q: "Do you offer aesthetic treatments too?",
      a: "Yes. Alongside dentistry we offer aesthetic treatments such as exosomes therapy, lip and dermal fillers, HIFU, laser treatments and signature facials like the Red Carpet Facial.",
    },
    {
      q: "Can I start with an online consultation?",
      a: "Yes. Choose \"Online Consultation\" when booking. It is a good way to discuss your goals before visiting one of our clinics.",
    },
    {
      q: "I feel nervous about dental treatment. Can you help?",
      a: "Absolutely. Tell us when you book. Your dentist will explain every step before it happens, and you can ask to pause at any time.",
    },
    {
      q: "What if I need to reschedule?",
      a: "Please let us know at least 24 hours before your appointment so we can offer the time to another patient.",
      link: { href: "/appointment-policy", label: "Read our Appointment Policy" },
    },
  ];

  const whatsappUrl = `https://wa.me/${CLINIC_WHATSAPP}?text=${encodeURIComponent("Hello Beverly Hills Clinic, I have a question.")}`;

  return (
    <div className="flex flex-col w-full bg-brand-primary">
      {/* 1. Page Header Hero Banner */}
      <section className="relative w-full min-h-[70svh] md:h-auto md:min-h-[500px] pt-[120px] pb-12 md:pt-52 md:pb-28 flex items-center justify-center overflow-hidden border-b border-brand-secondary/40 bg-brand-primary">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/patient_ banner.webp"
            alt="Beverly Hills Clinic reception"
            fill
            priority
            sizes="100vw"
            className="hidden md:block object-cover object-center"
          />
          <Image
            src="/images/space4.webp"
            alt="Beverly Hills Clinic reception"
            fill
            priority
            sizes="100vw"
            className="block md:hidden object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#f6ede7]/70 md:bg-[#f6ede7]/50 z-10" />
        </div>

        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4 mt-[40px] md:mt-[150px]">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-accent block">Patient Guide</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-heading text-brand-text leading-tight">
            Everything you need before your visit
          </h1>
          <div className="w-12 h-1 bg-brand-accent/40 mx-auto rounded-full" />
          <p className="text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-medium text-[#3d2e2a]">
            Consultation fees, your smile makeover journey, what happens at your first visit, and answers to common questions.
          </p>
        </div>
      </section>

      {/* 2. Accordions */}
      <section className="py-16 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 w-full flex-grow space-y-6">
        {/* Consultation & Payments */}
        <div id="fees" className="bg-white border border-brand-secondary/40 rounded-2xl overflow-hidden shadow-xs scroll-mt-24">
          <AccordionHeader
            id="fees"
            active={activeSection}
            onToggle={toggleSection}
            icon={Wallet}
            title="Consultation & Payments"
            subtitle={`Consultation ${CONSULTATION_FEE} · clear costs before treatment`}
          />
          {activeSection === "fees" && (
            <div className="border-t border-brand-secondary/20 p-6 sm:p-8 bg-brand-primary/10 space-y-5 text-sm text-brand-text/80 leading-relaxed">
              <div className="bg-white border border-brand-secondary/30 rounded-xl p-5 flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-text/50">Consultation fee</span>
                  <div className="text-2xl sm:text-3xl font-heading text-brand-text mt-1 whitespace-nowrap">{CONSULTATION_FEE}</div>
                </div>
                <button onClick={() => triggerBooking()} className="btn-primary py-2.5 px-5 text-xs font-semibold">
                  Book Consultation
                </button>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Your consultation includes an assessment with the doctor and a personal treatment plan.",
                  "The cost of your treatment is explained and agreed with you before anything starts.",
                  "Custom-made treatments such as veneers, crowns and implants may need part payment before laboratory work is ordered; we explain this in advance.",
                  "Payments are made at the clinic reception.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-brand-accent mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-brand-text/55">
                See our <Link href="/terms-and-conditions" className="text-brand-accent underline">Terms &amp; Conditions</Link> and{" "}
                <Link href="/appointment-policy" className="text-brand-accent underline">Appointment Policy</Link>.
              </p>
            </div>
          )}
        </div>

        {/* Smile Makeover Journey */}
        <div id="smile-makeover" className="bg-white border border-brand-secondary/40 rounded-2xl overflow-hidden shadow-xs scroll-mt-24">
          <AccordionHeader
            id="smile-makeover"
            active={activeSection}
            onToggle={toggleSection}
            icon={Sparkles}
            title="Your Smile Makeover Journey"
            subtitle="3 visits · about 10 days · E-max or Zirconia"
          />
          {activeSection === "smile-makeover" && (
            <div className="border-t border-brand-secondary/20 p-6 sm:p-8 bg-brand-primary/10 space-y-6">
              <ol className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {smileSteps.map((s) => (
                  <li key={s.day} className="bg-white border border-brand-secondary/35 rounded-xl p-5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-accent">{s.day}</span>
                    <h4 className="text-sm font-bold text-brand-text mt-1">{s.title}</h4>
                    <p className="text-xs text-brand-text/70 leading-relaxed mt-1">{s.text}</p>
                  </li>
                ))}
              </ol>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="bg-white border border-brand-secondary/35 rounded-xl p-5">
                  <h4 className="font-heading text-lg text-brand-text">E-max Veneers <span className="text-xs text-brand-accent font-sans font-semibold">· Most natural</span></h4>
                  <p className="text-xs text-brand-text/70 mt-1 leading-relaxed">Ultra-thin porcelain with natural translucency that reflects light like a real tooth.</p>
                </div>
                <div className="bg-white border border-brand-secondary/35 rounded-xl p-5">
                  <h4 className="font-heading text-lg text-brand-text">Zirconia <span className="text-xs text-brand-accent font-sans font-semibold">· Strongest</span></h4>
                  <p className="text-xs text-brand-text/70 mt-1 leading-relaxed">Exceptionally strong and long lasting; covers dark or heavily stained teeth.</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-brand-secondary/20">
                <span className="text-xs text-brand-text/60">Timelines and results vary from patient to patient.</span>
                <button
                  onClick={() => triggerBooking("Hollywood Smile Makeover")}
                  className="btn-primary py-2.5 px-6 text-xs flex items-center gap-1.5 self-stretch sm:self-auto justify-center"
                >
                  <Calendar className="w-4 h-4" />
                  Book Smile Consultation
                </button>
              </div>
            </div>
          )}
        </div>

        {/* First Visit */}
        <div id="first-visit" className="bg-white border border-brand-secondary/40 rounded-2xl overflow-hidden shadow-xs scroll-mt-24">
          <AccordionHeader
            id="first-visit"
            active={activeSection}
            onToggle={toggleSection}
            icon={UserPlus}
            title="Your First Visit"
            subtitle="What to expect, step by step"
          />
          {activeSection === "first-visit" && (
            <div className="border-t border-brand-secondary/20 p-6 sm:p-8 bg-brand-primary/10 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {firstVisitSteps.map((step) => (
                  <div key={step.step} className="bg-white border border-brand-secondary/35 p-5 rounded-xl flex items-start space-x-4">
                    <div className="text-2xl font-bold text-brand-accent/40 font-heading">{step.step}</div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-brand-text">{step.title}</h4>
                      <p className="text-xs text-brand-text/70 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {locations.map((loc) => (
                  <a
                    key={loc.slug}
                    href={loc.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white border border-brand-secondary/35 rounded-xl p-4 flex items-start gap-3 hover:border-brand-accent/50"
                  >
                    <MapPin className="w-4 h-4 text-brand-accent mt-0.5 shrink-0" />
                    <span className="text-xs text-brand-text/75 leading-relaxed">
                      <strong className="text-brand-text block">{loc.name}</strong>
                      {loc.address}
                    </span>
                  </a>
                ))}
              </div>

              <div className="text-center pt-2 border-t border-brand-secondary/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-brand-text/60 max-w-md sm:text-left leading-relaxed">
                  Please arrive 10 minutes early and bring any previous X-rays or reports you have.
                </span>
                <button
                  onClick={() => triggerBooking()}
                  className="btn-primary py-2.5 px-6 text-xs flex items-center space-x-1.5 self-stretch sm:self-auto justify-center"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Your First Visit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* FAQ */}
        <div id="faq" className="bg-white border border-brand-secondary/40 rounded-2xl overflow-hidden shadow-xs scroll-mt-24">
          <AccordionHeader
            id="faq"
            active={activeSection}
            onToggle={toggleSection}
            icon={HelpCircle}
            title="Frequently Asked Questions"
            subtitle="Quick answers to common questions"
          />
          {activeSection === "faq" && (
            <div className="border-t border-brand-secondary/20 p-6 sm:p-8 bg-brand-primary/10">
              <div className="space-y-5">
                {faqs.map((faq) => (
                  <div key={faq.q} className="space-y-1.5 border-b border-brand-secondary/20 pb-4 last:border-b-0 last:pb-0">
                    <h4 className="text-sm font-bold text-brand-text">{faq.q}</h4>
                    <p className="text-xs sm:text-sm text-brand-text/75 leading-relaxed">
                      {faq.a}
                      {faq.link && (
                        <>
                          {" "}
                          <Link href={faq.link.href} className="text-brand-accent underline">
                            {faq.link.label}
                          </Link>
                        </>
                      )}
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
          <h3 className="text-xl font-bold font-heading text-brand-text">Still have questions?</h3>
          <p className="text-xs sm:text-sm text-brand-text/70 leading-relaxed">
            Call us at <a href={`tel:${CLINIC_PHONE_RAW}`} className="text-brand-accent font-semibold">{CLINIC_PHONE}</a>, message us on
            WhatsApp, or email <a href={`mailto:${CLINIC_EMAIL}`} className="text-brand-accent font-semibold">{CLINIC_EMAIL}</a>.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button onClick={() => triggerBooking()} className="btn-primary text-xs py-3 px-6">
              Book Consultation
            </button>
            <a
              id="patients-whatsapp"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold py-3 px-6 rounded-full border border-[#25D366] text-[#1f9e4f]"
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
