import Image from "next/image";
import { Smile, Shield, Sparkles } from "lucide-react";

export default function People() {
  const highlights = [
    {
      icon: Smile,
      text: "Friendly, experienced dentists who prioritize your emotional comfort.",
    },
    {
      icon: Shield,
      text: "A non-judgmental environment focused entirely on your goals.",
    },
    {
      icon: Sparkles,
      text: "Hygienists specializing in warm, gentle dental experiences.",
    },
  ];

  return (
    <section className="py-20 bg-brand-primary/50 border-t border-brand-secondary/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Image with organic borders/shadows */}
          <div className="lg:col-span-6 relative">
            {/* Ambient background accent block */}
            <div className="absolute -inset-4 bg-brand-secondary/40 rounded-3xl -rotate-2 scale-98" />
            
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-xl border border-brand-secondary/50">
              <Image
                src="/images/people-team.png"
                alt="Zen Dental Studio Staff - Dr. Sarah Jenkins & Team"
                fill
                sizes="(max-w-728px) 100vw, 50vw"
                className="object-cover hover:scale-102 transition-transform duration-700"
              />
            </div>
            
            {/* Small decorative float */}
            <div className="absolute -bottom-6 -right-6 hidden sm:flex items-center space-x-3 bg-white border border-brand-secondary/50 px-5 py-3 rounded-2xl shadow-lg animate-in slide-in-from-bottom duration-300">
              <span className="flex h-3 w-3 rounded-full bg-green-500" />
              <span className="text-xs font-semibold text-brand-text">Accepting New Patients</span>
            </div>
          </div>

          {/* Right Column: Copy & Highlights */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">
                Our Team & Culture
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold font-heading text-brand-text leading-tight">
                Care that begins <br />
                <span className="text-brand-accent">with kindness.</span>
              </h2>
            </div>

            <p className="text-sm sm:text-base text-brand-text/85 leading-relaxed">
              At Zen Dental Studio, we believe that the best clinical care is rooted in warmth, active listening, and unconditional comfort. Our dental clinicians, hygienists, and coordinators are dedicated to helping you feel safe, relaxed, and heard.
            </p>

            <p className="text-sm text-brand-text/75 leading-relaxed">
              We understand that many patients experience anxiety when visiting the dentist. That is why we have designed our care protocols to be slow, collaborative, and entirely gentle. We explain every diagnostic scan, work with you to establish comfortable pacing, and respect your limits.
            </p>

            {/* Bullet Highlights */}
            <div className="space-y-3.5 pt-4">
              {highlights.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-secondary/50 flex items-center justify-center">
                      <IconComp className="w-4 h-4 text-brand-accent" />
                    </div>
                    <span className="text-sm font-medium text-brand-text/90">
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
