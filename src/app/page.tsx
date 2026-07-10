import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import People from "@/components/People";
import Technology from "@/components/Technology";
import Studios from "@/components/Studios";
import Amenities from "@/components/Amenities";
import PatientStories from "@/components/PatientStories";
import TwoStudiosOneStandard from "@/components/TwoStudiosOneStandard";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Banner */}
      <Hero />

      {/* 2. Our Philosophy */}
      <Philosophy />

      {/* 3. The People */}
      <People />

      {/* 4. Technology Section */}
      <Technology />

      {/* 5. The Studios */}
      <Studios />

      {/* 6. Every Detail, Considered */}
      <Amenities />

      {/* 7. Patient Stories Slider */}
      <PatientStories />

      {/* 8. Two Studios, One Standard */}
      <TwoStudiosOneStandard />

      {/* 9. CTA Section */}
      <CTASection />
    </div>
  );
}
