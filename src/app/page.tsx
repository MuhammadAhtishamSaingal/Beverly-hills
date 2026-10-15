import Hero from "@/components/Hero";
import SignatureTreatments from "@/components/SignatureTreatments";
import SmileMakeoverSpotlight from "@/components/SmileMakeoverSpotlight";
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

      {/* 2. Signature dental & aesthetic treatments */}
      <SignatureTreatments />

      {/* 3. Smile makeover: 3 visits, about 10 days */}
      <SmileMakeoverSpotlight />

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

      {/* 9. Final call to action */}
      <CTASection />
    </div>
  );
}
