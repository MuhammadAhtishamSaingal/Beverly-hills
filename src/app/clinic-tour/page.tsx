import { Metadata } from "next";
import ClinicTourClient from "./ClinicTourClient";

export const metadata: Metadata = {
  title: "Clinic Tour | Beverly Hills Clinic DHA Karachi",
  description:
    "Explore Beverly Hills Clinic DHA Karachi through our clinic tour. Discover our modern dental facility, advanced technology, comfortable treatment rooms, and expert care.",
  keywords: [
    "Clinic tour Beverly Hills Clinic",
    "Dental clinic DHA Karachi tour",
    "Beverly Hills Clinic Karachi facility",
    "Modern dental clinic Karachi",
    "Aesthetic clinic interior Karachi",
  ],
  alternates: {
    canonical: "https://www.beverlyhills.clinic/clinic-tour",
  },
  openGraph: {
    title: "Clinic Tour | Beverly Hills Clinic DHA Karachi",
    description:
      "Explore Beverly Hills Clinic DHA Karachi through our clinic tour. Discover our modern dental facility, advanced technology, comfortable treatment rooms, and expert care.",
    url: "https://www.beverlyhills.clinic/clinic-tour",
    siteName: "Beverly Hills Clinic",
    images: [
      {
        url: "https://www.beverlyhills.clinic/images/hero-studio.webp",
        width: 1200,
        height: 630,
        alt: "Beverly Hills Clinic DHA Karachi Interior",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
};

export default function ClinicTourPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Beverly Hills Clinic Karachi",
    "image": "https://www.beverlyhills.clinic/images/hero-studio.webp",
    "@id": "https://www.beverlyhills.clinic/#clinic",
    "url": "https://www.beverlyhills.clinic/clinic-tour",
    "telephone": "0307-0984307",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2nd floor, Main Saba Avenue, Phase 5, DHA Karachi, Above Ocean Pharmacy",
      "addressLocality": "Karachi",
      "addressRegion": "Sindh",
      "postalCode": "75500",
      "addressCountry": "PK",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 24.8007,
      "longitude": 67.0601,
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "18:00",
    },
    "medicalSpecialty": [
      "Dentistry",
      "CosmeticDentistry",
      "Dermatology",
      "PlasticSurgery",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClinicTourClient />
    </>
  );
}
