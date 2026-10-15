import { Star } from "lucide-react";

const reviewsUrl = "https://www.google.com/maps/search/?api=1&query=Beverly+Hills+Clinic+Dentistry+Aesthetics+Karachi";

export default function GoogleRating() {
  return (
    <section className="py-14 bg-brand-primary border-t border-brand-secondary/40">
      <div className="max-w-3xl mx-auto px-4 text-center space-y-4">
        <div className="flex justify-center gap-1 text-[#f5b301]" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-6 h-6 fill-current" />
          ))}
        </div>
        <h2 className="text-3xl sm:text-4xl font-heading text-brand-text">Rated 4.8 on Google</h2>
        <p className="text-sm sm:text-base text-brand-text/75">
          Read what our patients say about their smile makeovers, implants and aesthetic treatments.
        </p>
        <a
          href={reviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-[#3d2e2a] text-brand-text hover:bg-[#3d2e2a]/10 text-xs font-semibold uppercase tracking-wider py-3 px-6 rounded-full"
        >
          Read our Google reviews ↗
        </a>
      </div>
    </section>
  );
}
