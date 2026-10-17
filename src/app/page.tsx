import Hero from "@/components/Hero";
import TreatmentExplorer from "@/components/TreatmentExplorer";
import TreatmentFinder from "@/components/TreatmentFinder";
import EasyBooking from "@/components/EasyBooking";
import People from "@/components/People";
import GoogleRating from "@/components/GoogleRating";
import Studios from "@/components/Studios";
import TwoStudiosOneStandard from "@/components/TwoStudiosOneStandard";
import CTASection from "@/components/CTASection";
import InstagramStories from "@/components/InstagramStories";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero */}
      <Hero />

      {/* 2-3. Dental / Aesthetic switcher with top 3 treatments each */}
      <TreatmentExplorer />

      {/* Find your treatment by problem */}
      <TreatmentFinder />

      {/* 4. Our doctors */}
      <People />

      {/* 5. Google rating */}
      <GoogleRating />

      {/* 6. The clinic spaces */}
      <Studios />

      {/* 7. Our two clinics */}
      <TwoStudiosOneStandard />

      {/* 8. Real stories from Instagram */}
      <InstagramStories />

      {/* How to get started + FAQ */}
      <EasyBooking />

      {/* 9. Final call to action */}
      <CTASection />
    </div>
  );
}
