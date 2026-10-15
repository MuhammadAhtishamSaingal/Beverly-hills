import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import People from "@/components/People";
import Technology from "@/components/Technology";
import Studios from "@/components/Studios";
import Amenities from "@/components/Amenities";
import SignatureTreatments from "@/components/SignatureTreatments";
import SmileMakeoverSpotlight from "@/components/SmileMakeoverSpotlight";
import GoogleRating from "@/components/GoogleRating";
import TwoStudiosOneStandard from "@/components/TwoStudiosOneStandard";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Banner */}
      <Hero />

      {/* 2. Signature dental & aesthetic treatments */}
      <SignatureTreatments />

      {/* 3. Smile makeover: 3 visits, about 10 days */}
      <SmileMakeoverSpotlight />

      {/* 4. The People */}
      <People />

      {/* 5. Our Philosophy */}
      <Philosophy />

      {/* 4. Technology Section */}
      <Technology />

      {/* 5. The Studios */}
      <Studios />

      {/* 6. Every Detail, Considered */}
      <Amenities />

      {/* 7. Google rating */}
      <GoogleRating />

      {/* 8. Two Studios, One Standard */}
      <TwoStudiosOneStandard />

      {/* 9. CTA Section */}
      <CTASection />
    </div>
  );
}
