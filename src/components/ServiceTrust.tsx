"use client";

import { Award, Cpu, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";

interface ServiceTrustProps {
  candidateInfo?: string;
  whyChooseClinic?: string;
}

export default function ServiceTrust({ candidateInfo, whyChooseClinic }: ServiceTrustProps) {
  const trustPillars = [
    {
      icon: Award,
      title: "Experienced Specialists",
      desc: "Our UK and US trained dental surgeons and aesthetic physicians deliver clinical precision with artful perfection."
    },
    {
      icon: Cpu,
      title: "Advanced 3D Technology",
      desc: "Equipped with 3D CBCT digital scanners, Fotona laser systems, and Ultraformer III HIFU for pain-free treatment."
    },
    {
      icon: ShieldCheck,
      title: "Sterile & Safe Environment",
      desc: "Adhering strictly to hospital-grade autoclaving protocols for absolute patient health and infection control."
    },
    {
      icon: HeartHandshake,
      title: "Patient-Focused Comfort",
      desc: "Relax in our luxurious DHA Karachi studio with gentle anesthesia protocols and dedicated one-on-one care."
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-brand-primary border-t border-b border-brand-secondary/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Who Is A Good Candidate Section if candidateInfo provided */}
        {candidateInfo && (
          <div className="max-w-4xl mx-auto bg-white/80 border border-brand-secondary/40 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-3">
            <h3 className="text-xl sm:text-2xl font-serif text-brand-text font-normal">
              Who Is A Good Candidate?
            </h3>
            <p className="text-sm sm:text-base text-brand-text/80 leading-relaxed font-light">
              {candidateInfo}
            </p>
          </div>
        )}

        {/* Why Choose Beverly Hills Clinic Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-accent flex items-center justify-center space-x-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Excellence in Dental & Aesthetic Care</span>
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-normal text-brand-text">
            Why Choose Beverly Hills Clinic?
          </h2>
          <div className="w-12 h-1 bg-brand-accent/40 mx-auto rounded-full" />
          <p className="text-sm sm:text-base text-brand-text/75 leading-relaxed font-light">
            {whyChooseClinic ||
              "We blend Beverly Hills aesthetic standards with personalized, patient-first clinical excellence right here in DHA Karachi."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustPillars.map((pillar, idx) => {
            const IconComp = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-brand-secondary/30 rounded-2xl p-6 text-center space-y-4 shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-secondary/30 flex items-center justify-center mx-auto text-brand-accent">
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-heading text-brand-text">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-brand-text/70 leading-relaxed font-light">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
