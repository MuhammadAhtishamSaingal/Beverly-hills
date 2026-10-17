"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Check, Clock, Sparkles, ArrowRight } from "lucide-react";
import { trackContact, trackInitiateBooking } from "@/lib/metaPixel";
import { CLINIC_WHATSAPP, CONSULTATION_FEE } from "@/data/locations";

type Mode = "dental" | "aesthetic";

interface Fact {
  label: string;
  value: string;
}

interface Option {
  name: string;
  badge: string;
  points: string[];
}

interface Treatment {
  id: string;
  title: string;
  simple: string;
  image: string;
  href: string;
  bookingService: string;
  badge?: string;
  facts: Fact[];
  goodFor: string[];
  stepsTitle: string;
  steps: { title: string; text: string }[];
  options?: Option[];
  note?: string;
}

const content: Record<Mode, { tab: string; emoji: string; heading: string; intro: string; items: Treatment[] }> = {
  dental: {
    tab: "Dental",
    emoji: "🦷",
    heading: "Our top 3 dental treatments",
    intro: "Want whiter, straighter or complete teeth? Start here.",
    items: [
      {
        id: "smile-makeover",
        title: "Smile Makeover",
        badge: "Most popular",
        simple:
          "We design a brand new smile that suits your face. Thin covers called veneers are fixed on the front of your teeth, so they look white, even and beautiful.",
        image: "/images/hollywood-smile-makeover-1.jpg",
        href: "/services/hollywood-smile-makeover",
        bookingService: "Hollywood Smile Makeover",
        facts: [
          { label: "Visits", value: "3" },
          { label: "Time", value: "About 10 days" },
          { label: "Pain", value: "Comfortable" },
        ],
        goodFor: ["Yellow or stained teeth", "Gaps, chips or uneven teeth", "Weddings, events and photos"],
        stepsTitle: "Your 3 visits",
        steps: [
          { title: "Visit 1 · Plan", text: "We check your teeth and plan the shape and shade of your new smile with you." },
          { title: "Visit 2 · Prepare", text: "Teeth are gently prepared and you go home with a temporary smile." },
          { title: "Visit 3 · New smile", text: "Your final veneers are fixed and polished. Done in about 10 days." },
        ],
      },
      {
        id: "veneers",
        title: "Veneers",
        simple:
          "A veneer is a very thin shell that sits on the front of a tooth, like a perfect new face for it. We offer two kinds, so you can choose what suits you.",
        image: "/images/dental-veneers-crowns-bridges-1.jpg",
        href: "/services/dental-veneers-crowns-bridges",
        bookingService: "Dental Veneers, Crowns, Bridges",
        facts: [
          { label: "Types", value: "E-max · Zirconia" },
          { label: "Look", value: "Natural" },
          { label: "Lasts", value: "Many years" },
        ],
        goodFor: ["Fixing the colour of teeth", "Making teeth the same size", "Covering chips and small gaps"],
        stepsTitle: "Which one is right for me?",
        steps: [],
        options: [
          {
            name: "E-max",
            badge: "Most natural",
            points: ["Very thin and see-through like a real tooth", "Shines in light like a real tooth", "Best for front teeth"],
          },
          {
            name: "Zirconia",
            badge: "Strongest",
            points: ["Very strong and long lasting", "Hides dark or very stained teeth", "Great for strong bites"],
          },
        ],
        note: "Not sure? Your dentist will help you choose at your consultation.",
      },
      {
        id: "implants",
        title: "Dental Implants",
        simple:
          "Missing a tooth? An implant is a small, strong post placed in the jaw, like a new root. A natural-looking tooth is then fixed on top, so you can smile and eat normally again.",
        image: "/images/dental-implants-1.jpg",
        href: "/services/dental-implants",
        bookingService: "Dental Implants",
        facts: [
          { label: "Feels", value: "Like your tooth" },
          { label: "Fixed", value: "Not removable" },
          { label: "Lasts", value: "Long term" },
        ],
        goodFor: ["One or more missing teeth", "Loose or uncomfortable dentures", "Eating and smiling with confidence"],
        stepsTitle: "How it works",
        steps: [
          { title: "Step 1 · Check", text: "We examine your mouth and take scans to plan the right spot." },
          { title: "Step 2 · Implant", text: "The small post is placed gently and left to settle and heal." },
          { title: "Step 3 · New tooth", text: "Once healed, your new tooth is fixed on top. It looks and works like a real one." },
        ],
        note: "Healing time is different for every patient. Your dentist will give you a clear plan.",
      },
    ],
  },
  aesthetic: {
    tab: "Aesthetic",
    emoji: "✨",
    heading: "Our top 3 aesthetic treatments",
    intro: "Want glowing skin or softer, fuller lips? Start here.",
    items: [
      {
        id: "exosomes",
        title: "Exosomes Therapy",
        badge: "Signature",
        simple:
          "Exosomes are tiny helpers that tell your skin to repair and refresh itself. Your skin looks brighter, smoother and healthier.",
        image: "/images/exosome-therapy-1.jpg",
        href: "/services/exosomes-therapy",
        bookingService: "Exosomes Therapy",
        facts: [
          { label: "Session", value: "About 1 hour" },
          { label: "Downtime", value: "Very little" },
          { label: "Result", value: "Fresh glow" },
        ],
        goodFor: ["Dull or tired skin", "Fine lines and rough texture", "Acne marks and open pores"],
        stepsTitle: "How it works",
        steps: [
          { title: "Step 1 · Check", text: "We look at your skin and choose the right plan for you." },
          { title: "Step 2 · Treat", text: "Exosomes are gently applied to your clean skin." },
          { title: "Step 3 · Glow", text: "Skin keeps improving over the next few weeks." },
        ],
      },
      {
        id: "lip-fillers",
        title: "Lip Fillers",
        simple:
          "A soft gel is placed in the lips to give them a little more shape and fullness. We keep it natural, so your lips look like yours, only better.",
        image: "/images/fillers-1.jpg",
        href: "/services/dermal-fillers",
        bookingService: "Fillers: Face, Lips, Hair, Body",
        facts: [
          { label: "Session", value: "About 30 min" },
          { label: "Look", value: "Natural" },
          { label: "Back to work", value: "Same day" },
        ],
        goodFor: ["Thin lips", "Uneven lips", "Better lip shape and lines"],
        stepsTitle: "How it works",
        steps: [
          { title: "Step 1 · Plan", text: "We talk about the look you want and design it for your face." },
          { title: "Step 2 · Comfort", text: "A numbing cream is applied, so it feels comfortable." },
          { title: "Step 3 · Shape", text: "Filler is placed in small amounts. You see the change right away." },
        ],
      },
      {
        id: "red-carpet-facial",
        title: "Red Carpet Facial",
        simple:
          "Our special facial that deep-cleans, refreshes and wakes up your skin, so you glow like a star. Perfect before a wedding, party or photoshoot.",
        image: "/images/red-carpet-treatment-1.jpg",
        href: "/services/red-carpet-facial",
        bookingService: "Red Carpet Facial",
        facts: [
          { label: "Session", value: "About 1 hour" },
          { label: "Downtime", value: "None" },
          { label: "Result", value: "Instant glow" },
        ],
        goodFor: ["Weddings and events", "Dull, tired skin", "A relaxing glow day"],
        stepsTitle: "How it works",
        steps: [
          { title: "Step 1 · Cleanse", text: "Skin is deep-cleaned and gently exfoliated." },
          { title: "Step 2 · Nourish", text: "Rich masks and serums feed and hydrate your skin." },
          { title: "Step 3 · Glow", text: "You walk out glowing and ready for any event." },
        ],
      },
    ],
  },
};

const MODES: Mode[] = ["dental", "aesthetic"];

function whatsappLink(service: string) {
  return `https://wa.me/${CLINIC_WHATSAPP}?text=${encodeURIComponent(
    `Hello Beverly Hills Clinic, I am interested in ${service}.`
  )}`;
}

function book(service: string) {
  trackInitiateBooking(`Treatment Explorer - ${service}`);
  window.dispatchEvent(new CustomEvent("open-booking", { detail: { service } }));
}

function TreatmentBlock({ t, index }: { t: Treatment; index: number }) {
  return (
    <article id={t.id} className="scroll-mt-44 md:scroll-mt-48 bg-white rounded-[28px] overflow-hidden border border-[#e8ceb1] shadow-[0_20px_50px_-30px_rgba(28,20,18,0.45)] md:grid md:grid-cols-2">
      <div className={`relative aspect-[4/3] md:aspect-auto md:min-h-[520px] ${index % 2 === 1 ? "md:order-2" : ""}`}>
        <Image src={t.image} alt={`${t.title} at Beverly Hills Clinic Karachi`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1412]/70 via-transparent to-transparent md:hidden" />
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="w-9 h-9 rounded-full bg-[#1c1412] text-[#e8ceb1] font-heading text-base flex items-center justify-center">
            {index + 1}
          </span>
          {t.badge && (
            <span className="bg-[#c39f75] text-[#1c1412] text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full">
              {t.badge}
            </span>
          )}
        </div>
        <h3 className="md:hidden absolute bottom-4 left-5 right-5 font-heading text-[2rem] leading-none text-white">{t.title}</h3>
      </div>

      <div className="p-5 sm:p-8 space-y-6">
        <div className="space-y-3">
          <h3 className="hidden md:block font-heading text-4xl text-[#1c1412]">{t.title}</h3>
          <p className="text-[15px] sm:text-base text-[#1c1412]/80 leading-relaxed">
            <span className="font-semibold text-[#ab7f51]">In simple words: </span>
            {t.simple}
          </p>
        </div>

        <dl className="grid grid-cols-3 gap-2">
          {t.facts.map((f) => (
            <div key={f.label} className="bg-[#f6ede7] rounded-2xl px-2.5 py-3 text-center">
              <dt className="text-[10px] uppercase tracking-[0.15em] text-[#ab7f51]">{f.label}</dt>
              <dd className="text-[13px] font-semibold text-[#1c1412] leading-tight mt-1">{f.value}</dd>
            </div>
          ))}
        </dl>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-[#1c1412]/60 mb-2.5">Great for</h4>
          <ul className="space-y-2">
            {t.goodFor.map((g) => (
              <li key={g} className="flex items-start gap-2.5 text-sm text-[#1c1412]/85">
                <Check className="w-4 h-4 text-[#ab7f51] mt-0.5 shrink-0" />
                {g}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-[#1c1412]/60 mb-3">{t.stepsTitle}</h4>
          {t.options ? (
            <div className="grid grid-cols-2 gap-2.5">
              {t.options.map((o) => (
                <div key={o.name} className="rounded-2xl border border-[#e8ceb1] p-3.5">
                  <span className="inline-block text-[9px] font-bold uppercase tracking-wider bg-[#ab7f51] text-white px-2 py-0.5 rounded-full">
                    {o.badge}
                  </span>
                  <p className="font-heading text-xl text-[#1c1412] mt-2">{o.name}</p>
                  <ul className="mt-2 space-y-1.5">
                    {o.points.map((p) => (
                      <li key={p} className="text-[12px] text-[#1c1412]/75 leading-snug">• {p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <ol className="relative space-y-4 pl-6 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-px before:bg-[#e8ceb1]">
              {t.steps.map((s) => (
                <li key={s.title} className="relative">
                  <span className="absolute -left-6 top-1 w-[15px] h-[15px] rounded-full bg-[#c39f75] ring-4 ring-white" />
                  <p className="text-sm font-semibold text-[#1c1412]">{s.title}</p>
                  <p className="text-[13px] text-[#1c1412]/70 leading-relaxed">{s.text}</p>
                </li>
              ))}
            </ol>
          )}
          {t.note && <p className="text-[12px] text-[#1c1412]/55 mt-3">{t.note}</p>}
        </div>

        <div className="space-y-3 pt-1">
          <button
            type="button"
            onClick={() => book(t.bookingService)}
            className="w-full bg-[#1c1412] active:bg-[#2d221f] hover:bg-[#2d221f] text-[#f6ede7] font-semibold text-sm uppercase tracking-[0.15em] py-4 rounded-full flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#c39f75]" />
            Book {t.title}
          </button>
          <div className="grid grid-cols-2 gap-2.5">
            <a
              href={whatsappLink(t.title)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContact(`Treatment Explorer WhatsApp - ${t.title}`)}
              className="border border-[#25D366] text-[#128C7E] font-semibold text-xs uppercase tracking-wider py-3 rounded-full flex items-center justify-center"
            >
              Ask on WhatsApp
            </a>
            <Link
              href={t.href}
              className="border border-[#1c1412]/20 text-[#1c1412] font-semibold text-xs uppercase tracking-wider py-3 rounded-full flex items-center justify-center gap-1.5"
            >
              Full details <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function TreatmentExplorer() {
  const [mode, setMode] = useState<Mode>("dental");
  const sectionRef = useRef<HTMLElement>(null);

  // Ads and the hero can open a tab directly: /#dental or /#aesthetic
  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "dental" || hash === "aesthetic") {
        setMode(hash);
        requestAnimationFrame(() => sectionRef.current?.scrollIntoView({ behavior: "smooth" }));
      }
    };
    // Same-page links (#dental / #aesthetic) work even when the hash is already set
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest?.('a[href="#dental"], a[href="#aesthetic"]');
      if (!link) return;
      e.preventDefault();
      history.replaceState(null, "", link.getAttribute("href"));
      applyHash();
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", applyHash);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const choose = (m: Mode) => {
    if (m === mode) return;
    setMode(m);
    const gtag = (window as any).gtag;
    if (typeof gtag === "function") gtag("event", "treatment_tab", { tab: m });
    const top = sectionRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const active = content[mode];

  return (
    <section ref={sectionRef} id="signature-treatments" className="bg-[#f6ede7] scroll-mt-24 md:scroll-mt-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 text-center space-y-3">
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#ab7f51]">Our Treatments</span>
        <h2 className="font-heading text-[2.1rem] sm:text-5xl leading-[1.1] text-[#1c1412]">
          What would you like to <span className="italic text-[#ab7f51]">improve?</span>
        </h2>
        <p className="text-sm text-[#1c1412]/65">Tap one to see our treatments.</p>
      </div>

      {/* Sticky choice switch */}
      <div className="sticky top-[104px] md:top-[120px] z-30 mt-6 px-4">
        <div className="max-w-md mx-auto grid grid-cols-2 gap-1 bg-white/90 backdrop-blur border border-[#e8ceb1] rounded-full p-1 shadow-[0_10px_30px_-15px_rgba(28,20,18,0.45)]" role="tablist">
          {MODES.map((m) => (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={mode === m}
              onClick={() => choose(m)}
              className={`py-3 rounded-full text-[13px] font-semibold uppercase tracking-[0.12em] transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                mode === m ? "bg-[#1c1412] text-[#f6ede7]" : "text-[#1c1412]/70"
              }`}
            >
              <span aria-hidden="true">{content[m].emoji}</span>
              {content[m].tab}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 sm:pb-24">
        <div className="text-center space-y-4 mb-8">
          <h3 className="font-heading text-2xl sm:text-3xl text-[#1c1412]">{active.heading}</h3>
          <p className="text-sm text-[#1c1412]/70">{active.intro}</p>
          <nav className="flex flex-wrap justify-center gap-2" aria-label={`${active.tab} treatments`}>
            {active.items.map((t, i) => (
              <a
                key={t.id}
                href={`#${t.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(t.id)?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-white border border-[#e8ceb1] text-[#1c1412] text-xs font-semibold px-4 py-2 rounded-full"
              >
                {i + 1}. {t.title}
              </a>
            ))}
          </nav>
        </div>

        <div key={mode} className="space-y-6 md:space-y-8 animate-in fade-in duration-300">
          {active.items.map((t, i) => (
            <TreatmentBlock key={t.id} t={t} index={i} />
          ))}
        </div>

        <div className="mt-10 bg-[#1c1412] text-[#f6ede7] rounded-[28px] p-6 sm:p-10 text-center space-y-4">
          <Sparkles className="w-6 h-6 text-[#c39f75] mx-auto" />
          <h3 className="font-heading text-2xl sm:text-3xl">Not sure which one you need?</h3>
          <p className="text-sm text-[#f6ede7]/70 max-w-md mx-auto">
            Meet our specialist. We check, explain your options and give you a clear plan and price.
          </p>
          <p className="inline-flex items-center gap-2 text-xs text-[#e8ceb1]">
            <Clock className="w-3.5 h-3.5" /> Consultation {CONSULTATION_FEE} · DHA &amp; Bahadurabad
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-1">
            <button
              type="button"
              onClick={() => book("")}
              className="bg-[#c39f75] hover:bg-[#b08b62] text-[#1c1412] font-semibold text-sm uppercase tracking-wider py-4 px-8 rounded-full flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" /> Book Consultation
            </button>
            <a
              href={whatsappLink(`${active.tab.toLowerCase()} treatments`)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContact(`Treatment Explorer WhatsApp - ${active.tab}`)}
              className="border border-[#25D366] text-[#25D366] font-semibold text-sm uppercase tracking-wider py-4 px-8 rounded-full flex items-center justify-center"
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
