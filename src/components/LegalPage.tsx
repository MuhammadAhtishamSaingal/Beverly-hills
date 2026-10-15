import Link from "next/link";
import type { ReactNode } from "react";

export interface LegalSection {
  id: string;
  title: string;
  body: ReactNode;
}

interface LegalPageProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
  intro: ReactNode;
  sections: LegalSection[];
  lastUpdated: string;
}

const relatedPolicies = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
  { href: "/appointment-policy", label: "Appointment & Cancellation Policy" },
  { href: "/medical-disclaimer", label: "Medical Disclaimer" },
];

export default function LegalPage({ eyebrow = "Legal Info", title, subtitle, intro, sections, lastUpdated }: LegalPageProps) {
  return (
    <div className="flex flex-col w-full bg-brand-primary min-h-screen">
      <section className="bg-brand-secondary/20 border-b border-brand-secondary/40 pt-36 pb-16 sm:pt-48 sm:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#ab7f51] block">{eyebrow}</span>
          <h1 className="text-4xl sm:text-5xl font-semibold font-heading text-brand-text leading-tight">{title}</h1>
          <div className="w-12 h-1 bg-[#ab7f51]/40 mx-auto rounded-full" />
          <p className="text-sm sm:text-base text-brand-text/80 max-w-xl mx-auto font-medium">{subtitle}</p>
        </div>
      </section>

      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <aside className="lg:col-span-4 sticky top-32 hidden lg:block bg-white border border-[#e8ceb1]/40 p-8 rounded-3xl shadow-xs">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#ab7f51] mb-6">Table of Contents</h2>
            <nav className="flex flex-col space-y-3.5 text-sm text-brand-text/70">
              {sections.map((sect) => (
                <a
                  key={sect.id}
                  href={`#${sect.id}`}
                  className="hover:text-[#ab7f51] transition-colors border-l-2 border-transparent hover:border-[#ab7f51]/40 pl-3 font-medium duration-200"
                >
                  {sect.title}
                </a>
              ))}
            </nav>
            <div className="border-t border-[#e8ceb1]/30 mt-8 pt-6 space-y-3">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#ab7f51]">Our Policies</h3>
              <ul className="space-y-2 text-xs">
                {relatedPolicies.map((p) => (
                  <li key={p.href}>
                    <Link href={p.href} className="text-brand-text/70 hover:text-[#ab7f51]">
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="text-[11px] text-brand-text/50 pt-2">Last updated: {lastUpdated}</p>
            </div>
          </aside>

          <article className="lg:col-span-8 space-y-8 bg-white border border-[#e8ceb1]/40 p-6 sm:p-10 md:p-12 rounded-3xl shadow-xs">
            <div className="max-w-none text-brand-text/85">
              <div className="text-sm sm:text-base leading-relaxed mb-8">{intro}</div>
              <hr className="border-t border-[#e8ceb1]/30 my-8" />
              <div className="space-y-12">
                {sections.map((sect) => (
                  <section key={sect.id} id={sect.id} className="scroll-mt-32 space-y-3">
                    <div className="flex items-center space-x-3">
                      <span className="w-1.5 h-6 bg-[#ab7f51] rounded-full inline-block" />
                      <h2 className="text-xl sm:text-2xl font-bold font-heading text-brand-text">{sect.title}</h2>
                    </div>
                    <div className="text-sm sm:text-base leading-relaxed text-brand-text/80 pl-4 space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_a]:text-[#ab7f51] [&_a]:font-semibold hover:[&_a]:underline">
                      {sect.body}
                    </div>
                  </section>
                ))}
              </div>
            </div>

            <div className="lg:hidden border-t border-[#e8ceb1]/30 mt-12 pt-6 text-center space-y-3">
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs">
                {relatedPolicies.map((p) => (
                  <Link key={p.href} href={p.href} className="text-[#ab7f51] hover:underline">
                    {p.label}
                  </Link>
                ))}
              </div>
              <p className="text-[11px] text-brand-text/50">Last updated: {lastUpdated}</p>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
