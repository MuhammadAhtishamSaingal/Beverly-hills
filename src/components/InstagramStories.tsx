"use client";

import { trackContact } from "@/lib/metaPixel";

const INSTAGRAM_PROFILE = "https://www.instagram.com/beverlyhillskhi";

const posts = [
  { type: "reel", id: "DclXSfktqBw" },
  { type: "reel", id: "DclQ_FINbpX" },
  { type: "reel", id: "DcTRrAgNxDn" },
  { type: "p", id: "DdMKQoMv07z" },
];

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function InstagramStories() {
  return (
    <section id="real-stories" className="py-16 sm:py-24 bg-[#1c1412] text-[#f6ede7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c39f75]">
            <InstagramIcon className="w-4 h-4" />
            Real Stories
          </span>
          <h2 className="font-heading text-[2.1rem] sm:text-5xl leading-[1.1]">
            Loved by our <span className="italic text-[#e8ceb1]">patients</span>
          </h2>
          <p className="text-sm text-[#f6ede7]/70 leading-relaxed">
            Real smile makeovers and treatments, shared by our patients and guests on Instagram.
          </p>
        </div>

        <div className="mt-10 flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 pb-4 [scrollbar-width:none] lg:justify-center">
          {posts.map((post, i) => (
            <div
              key={post.id}
              className="snap-center shrink-0 w-[82%] max-w-[340px] sm:w-[320px] bg-white rounded-3xl overflow-hidden border border-[#c39f75]/30 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]"
            >
              <iframe
                src={`https://www.instagram.com/${post.type}/${post.id}/embed/`}
                title={`Beverly Hills Clinic Instagram story ${i + 1}`}
                loading="lazy"
                allow="encrypted-media; picture-in-picture"
                allowFullScreen
                className="w-full h-[560px] border-0 bg-white"
              />
            </div>
          ))}
        </div>
        <p className="lg:hidden text-center text-[10px] uppercase tracking-[0.25em] text-[#f6ede7]/45 mt-2">Swipe to see more →</p>

        <div className="mt-10 flex justify-center">
          <a
            href={INSTAGRAM_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackContact("Instagram Profile Click")}
            className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#c39f75] to-[#e8ceb1] text-[#1c1412] text-xs font-bold uppercase tracking-[0.18em] py-4 px-8 rounded-full"
          >
            <InstagramIcon className="w-4 h-4" />
            Follow @beverlyhillskhi
          </a>
        </div>
      </div>
    </section>
  );
}
